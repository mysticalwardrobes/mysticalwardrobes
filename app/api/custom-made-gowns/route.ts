import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { CustomMadeGown, CustomMadeGownsResponse } from './model';
import { 
  CUSTOM_MADE_GOWNS_CACHE_DURATION, 
  CACHE_CONTROL_HEADER,
  ContentfulEntriesResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';
import { getJSON, setJSON } from '@/lib/redis';

// Cache configuration
export const revalidate = 3600;

// Redis cache key for all custom made gowns
const REDIS_CACHE_KEY = 'custom-made-gowns:all';

// Helper functions for Contentful data extraction
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const ensureString = (value: unknown): string | null => {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
};

const ensureNumber = (value: unknown): number | null => {
  return typeof value === 'number' && !isNaN(value) ? value : null;
};

const extractAssetUrl = (value: unknown): string | null => {
  if (!isRecord(value) || !('fields' in value)) {
    return null;
  }

  const fields = (value as { fields?: unknown }).fields;
  if (!isRecord(fields) || !('file' in fields)) {
    return null;
  }

  const file = (fields as { file?: unknown }).file;
  if (!isRecord(file) || !('url' in file)) {
    return null;
  }

  return ensureString((file as { url?: unknown }).url);
};

const normalizeAssetUrls = (value: unknown): string[] => {
  const collect = Array.isArray(value) ? value : value != null ? [value] : [];

  const urls = collect
    .map((item) => extractAssetUrl(item))
    .filter((url): url is string => typeof url === 'string');

  return urls;
};

export async function GET(request: NextRequest) {
  try {
    const requestStart = Date.now();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW CUSTOM MADE GOWNS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Check Redis cache first
    const now = Date.now();
    let response: ContentfulEntriesResponse;
    let dataSource: 'cache' | 'contentful' = 'cache';
    
    // Try to get from Redis cache
    const cachedData = await getJSON<CacheEntry<ContentfulEntriesResponse>>(REDIS_CACHE_KEY);
    
    if (cachedData) {
      // Use cached data from Redis (no expiration - invalidated via webhook)
      response = cachedData.data;
      console.log('✅ REDIS CACHE HIT: Using cached custom made gowns data from Redis');
      console.log(`   Cache age: ${getCacheAge(cachedData.timestamp)}s`);
      console.log(`   Total items in cache: ${response.items.length}`);
    } else {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntries({
        content_type: 'customMadeGowns',
        include: 10, // Include linked assets (images)
      });
      const fetchDuration = Date.now() - fetchStart;
      
      dataSource = 'contentful';
      
      // Store in Redis cache (no expiration - invalidated via webhook)
      const cacheEntry: CacheEntry<ContentfulEntriesResponse> = {
        data: response,
        timestamp: now
      };
      await setJSON(REDIS_CACHE_KEY, cacheEntry);
      
      if (cachedData) {
        console.log('🔄 REDIS CACHE MISS: Fetched fresh custom made gowns data from Contentful');
      } else {
        console.log('🆕 INITIAL FETCH: Fetched custom made gowns data from Contentful');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${response.items.length}`);
      console.log(`   Cache stored in Redis (no expiration - invalidated via webhook)`);
      console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
    }

    // Transform Contentful entries to our CustomMadeGown interface
    const customGowns: CustomMadeGown[] = response.items.map((item) => {
      const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

      const title = ensureString(fields.title) ?? 'Untitled Custom Gown';
      const gownFor = ensureString(fields.gownFor) ?? '';
      const location = ensureString(fields.location) ?? '';
      const description = ensureString(fields.description) ?? '';
      const clientName = ensureString(fields.clientName) ?? undefined;
      const preOrderPrice = ensureNumber(fields.preOrderPrice) ?? 0;
      const pixiePreOrderPrice = ensureNumber(fields.pixiePreOrderPrice) ?? undefined;
      const hoodPreOrderPrice = ensureNumber(fields.hoodPreOrderPrice) ?? undefined;
      const flowyPreOrderPrice = ensureNumber(fields.flowyPreOrderPrice) ?? undefined;

      // Extract image URLs from different image arrays
      const longGownPicture = normalizeAssetUrls(fields.longGownPicture);
      const pixiePicture = normalizeAssetUrls(fields.pixiePicture);
      const hoodPicture = normalizeAssetUrls(fields.hoodPicture);
      const flowyPictures = normalizeAssetUrls(fields.flowyPictures);

      return {
        id: String(item.sys.id),
        title,
        gownFor,
        location,
        clientName,
        description,
        preOrderPrice,
        pixiePreOrderPrice,
        hoodPreOrderPrice,
        flowyPreOrderPrice,
        longGownPicture,
        pixiePicture,
        hoodPicture,
        flowyPictures,
      };
    });

    // Apply limit if specified
    const limitedGowns = limit > 0 ? customGowns.slice(0, limit) : customGowns;

    const responseData: CustomMadeGownsResponse = {
      items: limitedGowns,
      total: customGowns.length
    };

    const nextResponse = NextResponse.json(responseData);

    // Add cache headers for browser caching
    nextResponse.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log final response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Items in response: ${limitedGowns.length}`);
    console.log(`   Total items available: ${customGowns.length}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return nextResponse;
  } catch (error) {
    console.error('Error fetching custom made gowns from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom made gowns' },
      { status: 500 }
    );
  }
}
