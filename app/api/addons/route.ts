import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { AddOn } from './model';
import { 
  CACHE_DURATION, 
  CACHE_CONTROL_HEADER,
  ContentfulEntriesResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';
import { getJSON, setJSON } from '@/lib/redis';
import { 
  serializeAddonsResponse, 
  deserializeAddonsResponse,
  SerializedAddonEntry 
} from '@/lib/contentful-serializer';

// Cache configuration
// Note: Must be a literal value for Next.js static analysis (3600 = 1 hour)
export const revalidate = 3600;

// Redis cache key for all addons
const REDIS_CACHE_KEY = 'addons:all';

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
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'name';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW ADDONS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Check Redis cache first
    const now = Date.now();
    let response: ContentfulEntriesResponse;
    let dataSource: 'cache' | 'contentful' = 'cache';
    
    // Try to get from Redis cache (stored as serialized data)
    interface SerializedCacheEntry {
      serialized: SerializedAddonEntry[];
      timestamp: number;
    }
    const cachedData = await getJSON<SerializedCacheEntry>(REDIS_CACHE_KEY);
    
    if (cachedData) {
      // Deserialize cached data from Redis (no expiration - invalidated via webhook)
      response = deserializeAddonsResponse(cachedData.serialized);
      console.log('✅ REDIS CACHE HIT: Using cached addons data from Redis');
      console.log(`   Cache age: ${getCacheAge(cachedData.timestamp)}s`);
      console.log(`   Total items in cache: ${response.items.length}`);
    } else {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntries({
        content_type: 'addOns', // Make sure this matches your Contentful content type
        limit: 1000, // Maximum allowed by Contentful API to fetch all items
      });
      const fetchDuration = Date.now() - fetchStart;
      
      dataSource = 'contentful';
      
      // Serialize and store in Redis cache (no expiration - invalidated via webhook)
      const serialized = serializeAddonsResponse(response);
      const cacheEntry: SerializedCacheEntry = {
        serialized,
        timestamp: now
      };
      await setJSON(REDIS_CACHE_KEY, cacheEntry);
      
      if (cachedData) {
        console.log('🔄 REDIS CACHE MISS: Fetched fresh addons data from Contentful');
      } else {
        console.log('🆕 INITIAL FETCH: Fetched addons data from Contentful');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${response.items.length}`);
      console.log(`   Cache stored in Redis (no expiration - invalidated via webhook)`);
      console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
    }

    // Transform Contentful entries to our AddOn interface
    let addOns: AddOn[] = response.items.map((item) => {
      const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

      const name = ensureString(fields.name) ?? 'Untitled Add-On';
      const description = ensureString(fields.description) ?? '';
      const type = ensureString(fields.type) ?? 'accessory';
      const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
      const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
      const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
      const forSaleRate = ensureNumber(fields.forSaleRate);
      
      const pictures = normalizeAssetUrls(fields.pictures);

      return {
        id: String(item.sys.id),
        name,
        description,
        type,
        metroManilaRate,
        luzonRate,
        outsideLuzonRate,
        forSaleRate,
        pictures,
      };
    });

    // Log available types for debugging
    const availableTypes = [...new Set(addOns.map(a => a.type))];
    console.log(`   Available types in data: ${availableTypes.join(', ')}`);

    // Filter by type
    if (type && type !== 'all') {
      const normalizedType = type.toLowerCase().trim();
      addOns = addOns.filter(addon => addon.type.toLowerCase().trim() === normalizedType);
      console.log(`   Filtering by type: "${type}" (normalized: "${normalizedType}")`);
      console.log(`   Found ${addOns.length} addons matching type "${type}"`);
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      
      addOns = addOns.filter(addon => {
        const price = addon.metroManilaRate;
        return price >= min && price <= max;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low-high':
        addOns.sort((a, b) => a.metroManilaRate - b.metroManilaRate);
        break;
      case 'price-high-low':
        addOns.sort((a, b) => b.metroManilaRate - a.metroManilaRate);
        break;
      case 'name':
      default:
        addOns.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Calculate pagination
    const totalItems = addOns.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAddOns = addOns.slice(startIndex, endIndex);

    const responseData = NextResponse.json({
      items: paginatedAddOns,
      total: totalItems,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

    // Add cache headers for browser caching
    responseData.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log final response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Type filter: ${type || 'all'}`);
    console.log(`   Sort by: ${sortBy}`);
    console.log(`   Page: ${page}/${totalPages}`);
    console.log(`   Items in response: ${paginatedAddOns.length}`);
    console.log(`   Total matching items: ${totalItems}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return responseData;
  } catch (error) {
    console.error('Error fetching add-ons from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch add-ons' },
      { status: 500 }
    );
  }
}
