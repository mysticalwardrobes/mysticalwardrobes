import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, CUSTOM_MADE_GOWNS_LIST_QUERY } from '@/lib/sanity';
import { CustomMadeGown, CustomMadeGownsResponse } from './model';
import {
  CACHE_CONTROL_HEADER,
  getCacheAge,
} from '@/app/api/cache-config';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';

// Cache configuration
export const revalidate = 3600;

// Redis cache key for all custom made gowns
const REDIS_CACHE_KEY = 'custom-made-gowns:all:sanity';

// Serialized cache entry structure for Redis
interface SerializedCacheEntry {
  data: CustomMadeGown[];
  timestamp: number;
}

export async function GET(request: NextRequest) {
  try {
    const requestStart = Date.now();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW CUSTOM MADE GOWNS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    let customGownsData: CustomMadeGown[] | undefined;
    let dataSource: 'cache' | 'sanity' = 'sanity';

    // Optionally check Redis cache first
    if (USE_REDIS_CACHE) {
      const cachedData = await getJSON<SerializedCacheEntry>(REDIS_CACHE_KEY);

      if (cachedData) {
        // Use cached data from Redis (no expiration - invalidated via webhook)
        customGownsData = cachedData.data;
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached custom made gowns data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedData.timestamp)}s`);
        console.log(`   Total items in cache: ${customGownsData.length}`);
      }
    }

    if (!customGownsData) {
      // Fetch fresh data from Sanity
      const fetchStart = Date.now();
      const sanityResponse = await sanityClient.fetch<CustomMadeGown[] | null>(CUSTOM_MADE_GOWNS_LIST_QUERY);
      const fetchDuration = Date.now() - fetchStart;

      // Handle null response
      if (!sanityResponse || !Array.isArray(sanityResponse)) {
        console.log('⚠️ No custom made gowns found in Sanity or invalid response');
        customGownsData = [];
      } else {
        // Map Sanity response to ensure proper defaults
        customGownsData = sanityResponse.map((item) => ({
          id: item.id,
          title: item.title ?? 'Untitled Custom Gown',
          gownFor: item.gownFor ?? '',
          location: item.location ?? '',
          clientName: item.clientName ?? undefined,
          description: item.description ?? null, // Portable Text array from Sanity
          preOrderPrice: item.preOrderPrice ?? 0,
          pixiePreOrderPrice: item.pixiePreOrderPrice ?? undefined,
          hoodPreOrderPrice: item.hoodPreOrderPrice ?? undefined,
          flowyPreOrderPrice: item.flowyPreOrderPrice ?? undefined,
          longGownPicture: item.longGownPicture?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
          pixiePicture: item.pixiePicture?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
          hoodPicture: item.hoodPicture?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
          flowyPictures: item.flowyPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        }));
      }

      dataSource = 'sanity';

      // Store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const cacheEntry: SerializedCacheEntry = {
          data: customGownsData,
          timestamp: now
        };
        await setJSON(REDIS_CACHE_KEY, cacheEntry);

        console.log(
          '🆕 INITIAL OR REFRESHED FETCH: Fetched custom made gowns data from Sanity and stored in Redis'
        );
      } else {
        console.log('ℹ️ Redis cache disabled: fetched custom made gowns data directly from Sanity');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${customGownsData.length}`);
    }

    // Apply limit if specified
    const limitedGowns = limit > 0 ? customGownsData.slice(0, limit) : customGownsData;

    const responseData: CustomMadeGownsResponse = {
      items: limitedGowns,
      total: customGownsData.length
    };

    const nextResponse = NextResponse.json(responseData);

    // Add cache headers for browser caching
    nextResponse.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log final response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Items in response: ${limitedGowns.length}`);
    console.log(`   Total items available: ${customGownsData.length}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return nextResponse;
  } catch (error) {
    console.error('❌ Error fetching custom made gowns from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom made gowns' },
      { status: 500 }
    );
  }
}
