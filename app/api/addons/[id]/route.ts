import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { AddOn } from '../model';
import { 
  REVALIDATE_TIME, 
  CACHE_DURATION, 
  CACHE_CONTROL_HEADER,
  ContentfulEntryResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';

// Cache configuration
export const revalidate = REVALIDATE_TIME;

// In-memory cache for individual addon entries
const addonCache = new Map<string, CacheEntry<ContentfulEntryResponse>>();

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

    // Check if we have valid cached data for this specific addon
    const now = Date.now();
    let response;
    let dataSource: 'cache' | 'contentful' = 'cache';
    
    const cachedEntry = addonCache.get(id);
    if (cachedEntry && isCacheValid(cachedEntry.timestamp)) {
      // Use cached data
      response = cachedEntry.data;
      console.log('✅ CACHE HIT: Using cached addon data');
      console.log(`   Cache age: ${getCacheAge(cachedEntry.timestamp)}s (expires in ${getCacheExpiry(cachedEntry.timestamp)}s)`);
    } else {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntry(id);
      const fetchDuration = Date.now() - fetchStart;
      
      dataSource = 'contentful';
      
      // Update cache
      addonCache.set(id, {
        data: response,
        timestamp: now
      });
      
      console.log('🔄 CACHE MISS: Fetched fresh addon from Contentful');
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
    }

    // Transform Contentful entry to our AddOn interface
    const fields = isRecord(response.fields) ? (response.fields as Record<string, unknown>) : {};

    const name = ensureString(fields.name) ?? 'Untitled Add-On';
    const description = ensureString(fields.description) ?? '';
    const type = ensureString(fields.type) ?? 'accessory';
    const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
    const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
    const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
    const forSale = ensureNumber(fields.forSale);
    const pictures = normalizeAssetUrls(fields.pictures);

    const addOn: AddOn = {
      id: String(response.sys.id),
      name,
      description,
      type,
      metroManilaRate,
      luzonRate,
      outsideLuzonRate,
      forSale,
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
