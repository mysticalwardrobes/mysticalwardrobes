import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { CustomMadeGown } from '../model';
import {
  CUSTOM_MADE_GOWNS_CACHE_DURATION,
  CACHE_CONTROL_HEADER,
  ContentfulEntriesResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';

// Cache configuration
export const revalidate = 3600;

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const requestStart = Date.now();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 CUSTOM MADE GOWN API REQUEST');
    console.log(`   Gown ID: ${id}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    const redisCacheKey = `custom-made-gown:${id}`;
    let response: ContentfulEntriesResponse | undefined;
    let dataSource: 'cache' | 'contentful' = 'contentful';

    // Optionally check Redis cache first for this specific custom gown
    if (USE_REDIS_CACHE) {
      const cachedData = await getJSON<CacheEntry<ContentfulEntriesResponse>>(redisCacheKey);

      if (cachedData) {
        // Use cached data from Redis (no expiration - invalidated via webhook)
        response = cachedData.data;
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached custom gown data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedData.timestamp)}s`);
      }
    }

    if (!response) {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntries({
        content_type: 'customMadeGowns',
        'sys.id': id,
        include: 10, // Include linked assets (images)
      });
      const fetchDuration = Date.now() - fetchStart;

      dataSource = 'contentful';

      // Store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const cacheEntry: CacheEntry<ContentfulEntriesResponse> = {
          data: response,
          timestamp: now
        };
        await setJSON(redisCacheKey, cacheEntry);

        console.log(
          '🔄 REDIS CACHE MISS: Fetched fresh custom gown data from Contentful and stored in Redis'
        );
        console.log(`   Fetch duration: ${fetchDuration}ms`);
        console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
      } else {
        console.log('ℹ️ Redis cache disabled: fetched custom gown directly from Contentful');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
      }
    }

    // Check if gown was found
    if (!response.items || response.items.length === 0) {
      console.log('❌ GOWN NOT FOUND');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return NextResponse.json(
        { error: 'Custom gown not found' },
        { status: 404 }
      );
    }

    // Transform Contentful entry to our CustomMadeGown interface
    const item = response.items[0];
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

    const customGown: CustomMadeGown = {
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

    const nextResponse = NextResponse.json(customGown);

    // Add cache headers for browser caching
    nextResponse.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log final response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Gown title: ${title}`);
    console.log(`   Total images: ${longGownPicture.length + pixiePicture.length + hoodPicture.length + flowyPictures.length}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return nextResponse;
  } catch (error) {
    console.error('Error fetching custom gown from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom gown' },
      { status: 500 }
    );
  }
}
