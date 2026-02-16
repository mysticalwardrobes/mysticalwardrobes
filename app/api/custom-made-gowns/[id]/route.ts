import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, CUSTOM_MADE_GOWN_DETAIL_QUERY } from '@/lib/sanity';
import { CustomMadeGown } from '../model';
import {
  CACHE_CONTROL_HEADER,
  getCacheAge,
} from '@/app/api/cache-config';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';

// Cache configuration
export const revalidate = 3600;

// Serialized cache entry structure for Redis
interface SerializedCacheEntry {
  data: CustomMadeGown;
  timestamp: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const requestStart = Date.now();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 CUSTOM MADE GOWN DETAIL API REQUEST');
    console.log(`   Gown ID: ${id}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    const redisCacheKey = `custom-made-gown:${id}:sanity`;
    let customGownData: CustomMadeGown | undefined;
    let dataSource: 'cache' | 'sanity' = 'sanity';

    // Optionally check Redis cache first for this specific custom gown
    if (USE_REDIS_CACHE) {
      const cachedEntry = await getJSON<SerializedCacheEntry>(redisCacheKey);

      if (cachedEntry) {
        // Use cached data from Redis (no expiration - invalidated via webhook)
        customGownData = cachedEntry.data;
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached custom gown data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedEntry.timestamp)}s`);
      }
    }

    if (!customGownData) {
      // Fetch fresh data from Sanity
      const fetchStart = Date.now();
      const sanityResponse = await sanityClient.fetch<CustomMadeGown | null>(
        CUSTOM_MADE_GOWN_DETAIL_QUERY,
        { id }
      );
      const fetchDuration = Date.now() - fetchStart;

      if (!sanityResponse) {
        console.log('❌ Custom gown not found in Sanity');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        return NextResponse.json(
          { error: 'Custom gown not found' },
          { status: 404 }
        );
      }

      // Map Sanity response to ensure proper defaults
      customGownData = {
        id: sanityResponse.id,
        title: sanityResponse.title ?? 'Untitled Custom Gown',
        gownFor: sanityResponse.gownFor ?? '',
        location: sanityResponse.location ?? '',
        clientName: sanityResponse.clientName ?? undefined,
        description: sanityResponse.description ?? null, // Portable Text array from Sanity
        preOrderPrice: sanityResponse.preOrderPrice ?? 0,
        pixiePreOrderPrice: sanityResponse.pixiePreOrderPrice ?? undefined,
        hoodPreOrderPrice: sanityResponse.hoodPreOrderPrice ?? undefined,
        flowyPreOrderPrice: sanityResponse.flowyPreOrderPrice ?? undefined,
        longGownPicture: sanityResponse.longGownPicture?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        pixiePicture: sanityResponse.pixiePicture?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        hoodPicture: sanityResponse.hoodPicture?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        flowyPictures: sanityResponse.flowyPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
      };

      dataSource = 'sanity';

      // Store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const cacheEntry: SerializedCacheEntry = {
          data: customGownData,
          timestamp: now
        };
        await setJSON(redisCacheKey, cacheEntry);

        console.log('🔄 REDIS CACHE MISS: Fetched fresh custom gown from Sanity and stored in Redis');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
        console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
      } else {
        console.log('ℹ️ Redis cache disabled: fetched custom gown directly from Sanity');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
      }
    }

    const nextResponse = NextResponse.json(customGownData);

    // Add cache headers for browser caching
    nextResponse.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log final response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Gown title: ${customGownData.title}`);
    console.log(`   Total images: ${customGownData.longGownPicture.length + customGownData.pixiePicture.length + customGownData.hoodPicture.length + customGownData.flowyPictures.length}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return nextResponse;
  } catch (error) {
    console.error('❌ Error fetching custom gown from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom gown' },
      { status: 500 }
    );
  }
}
