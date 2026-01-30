import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { AddOn } from '../model';
import { 
  CACHE_DURATION,
  CACHE_CONTROL_HEADER,
  ContentfulEntryResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';
import { 
  serializeAddonEntry, 
  deserializeAddonEntry,
  SerializedAddonEntrySingle 
} from '@/lib/contentful-serializer';

// Cache configuration
// Note: Must be a literal value for Next.js static analysis (3600 = 1 hour)
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
    const requestStart = Date.now();
    const { id } = await params;

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 ADDON DETAIL REQUEST');
    console.log(`   ID: ${id}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    const redisCacheKey = `addon:${id}`;
    let response: ContentfulEntryResponse | undefined;
    let dataSource: 'cache' | 'contentful' = 'contentful';
    
    // Optionally check Redis cache first for this specific addon
    if (USE_REDIS_CACHE) {
      interface SerializedCacheEntry {
        serialized: SerializedAddonEntrySingle;
        timestamp: number;
      }
      const cachedEntry = await getJSON<SerializedCacheEntry>(redisCacheKey);
      
      if (cachedEntry) {
        // Deserialize cached data from Redis (no expiration - invalidated via webhook)
        response = deserializeAddonEntry(cachedEntry.serialized);
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached addon data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedEntry.timestamp)}s`);
      }
    }

    if (!response) {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntry(id);
      const fetchDuration = Date.now() - fetchStart;
      
      dataSource = 'contentful';
      
      // Serialize and store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const serialized = serializeAddonEntry(response);
        interface SerializedCacheEntry {
          serialized: SerializedAddonEntrySingle;
          timestamp: number;
        }
        const cacheEntry: SerializedCacheEntry = {
          serialized,
          timestamp: now
        };
        await setJSON(redisCacheKey, cacheEntry);
        
        console.log('🔄 REDIS CACHE MISS: Fetched fresh addon from Contentful and stored in Redis');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
        console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
      } else {
        console.log('ℹ️ Redis cache disabled: fetched addon directly from Contentful');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
      }
    }

    // Transform Contentful entry to our AddOn interface
    const fields = isRecord(response.fields) ? (response.fields as Record<string, unknown>) : {};

    const name = ensureString(fields.name) ?? 'Untitled Add-On';
    const description = ensureString(fields.description) ?? '';
    const type = ensureString(fields.type) ?? 'accessory';
    const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
    const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
    const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
    const forSaleRate = ensureNumber(fields.forSaleRate);
    const pictures = normalizeAssetUrls(fields.pictures);

    const addOn: AddOn = {
      id: String(response.sys.id),
      name,
      description,
      type,
      metroManilaRate,
      luzonRate,
      outsideLuzonRate,
      forSaleRate,
      pictures,
    };

    const responseData = NextResponse.json(addOn);

    // Add cache headers for browser caching
    responseData.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Addon: ${addOn.name}`);
    console.log(`   Type: ${addOn.type}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return responseData;
  } catch (error) {
    console.error('❌ Error fetching add-on from Contentful:', error);
    
    // Check if it's a 404 error (entry not found)
    if (error instanceof Error && error.message.includes('404')) {
      return NextResponse.json(
        { error: 'Add-on not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch add-on' },
      { status: 500 }
    );
  }
}
