import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, GOWN_DETAIL_QUERY } from '@/lib/sanity';
import { Gown } from '../model';
import {
  CACHE_CONTROL_HEADER,
  getCacheAge,
} from '@/app/api/cache-config';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';

// Cache configuration
// Note: Must be a literal value for Next.js static analysis (3600 = 1 hour)
export const revalidate = 3600;

// Serialized cache entry structure for Redis
interface SerializedCacheEntry {
  data: Gown;
  timestamp: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const requestStart = Date.now();
    const { id } = await params;

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 GOWN DETAIL REQUEST');
    console.log(`   ID: ${id}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    const redisCacheKey = `gown:${id}:sanity`;
    let gownData: Gown | undefined;
    let dataSource: 'cache' | 'sanity' = 'sanity';

    // Optionally check Redis cache first for this specific gown
    if (USE_REDIS_CACHE) {
      const cachedEntry = await getJSON<SerializedCacheEntry>(redisCacheKey);

      if (cachedEntry) {
        // Use cached data from Redis (no expiration - invalidated via webhook)
        gownData = cachedEntry.data;
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached gown data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedEntry.timestamp)}s`);
      }
    }

    if (!gownData) {
      // Fetch fresh data from Sanity
      const fetchStart = Date.now();
      const sanityResponse = await sanityClient.fetch<Gown | null>(GOWN_DETAIL_QUERY, { id });
      const fetchDuration = Date.now() - fetchStart;

      if (!sanityResponse) {
        console.log('❌ Gown not found in Sanity');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        return NextResponse.json(
          { error: 'Gown not found' },
          { status: 404 }
        );
      }

      // Map Sanity response to ensure proper defaults
      gownData = {
        id: sanityResponse.id,
        name: sanityResponse.name ?? 'Untitled Gown',
        collection: sanityResponse.collection ?? [],
        bestFor: sanityResponse.bestFor ?? [],
        tags: sanityResponse.tags ?? [],
        color: sanityResponse.color ?? [],
        skirtStyle: sanityResponse.skirtStyle ?? [],
        metroManilaRate: sanityResponse.metroManilaRate ?? 0,
        luzonRate: sanityResponse.luzonRate ?? 0,
        outsideLuzonRate: sanityResponse.outsideLuzonRate ?? 0,
        pixieMetroManilaRate: sanityResponse.pixieMetroManilaRate ?? 0,
        pixieLuzonRate: sanityResponse.pixieLuzonRate ?? 0,
        pixieOutsideLuzonRate: sanityResponse.pixieOutsideLuzonRate ?? 0,
        forSaleRateLong: sanityResponse.forSaleRateLong ?? 0,
        forSaleRatePixie: sanityResponse.forSaleRatePixie ?? 0,
        bust: sanityResponse.bust ?? '',
        bustAlt: sanityResponse.bustAlt ?? '',
        waist: sanityResponse.waist ?? '',
        waistAlt: sanityResponse.waistAlt ?? '',
        lenght: sanityResponse.lenght ?? '',
        sleeves: sanityResponse.sleeves ?? '',
        longGownPictures: sanityResponse.longGownPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        longGownPicturesAlt: sanityResponse.longGownPicturesAlt?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        filipinianaPictures: sanityResponse.filipinianaPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        pixiePictures: sanityResponse.pixiePictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        trainPictures: sanityResponse.trainPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        addOns: sanityResponse.addOns?.filter((id): id is string => typeof id === 'string') ?? [],
        relatedGowns: sanityResponse.relatedGowns?.filter((id): id is string => typeof id === 'string') ?? [],
      };

      dataSource = 'sanity';

      // Store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const cacheEntry: SerializedCacheEntry = {
          data: gownData,
          timestamp: now
        };
        await setJSON(redisCacheKey, cacheEntry);

        console.log('🔄 REDIS CACHE MISS: Fetched fresh gown from Sanity and stored in Redis');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
        console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
      } else {
        console.log('ℹ️ Redis cache disabled: fetched gown directly from Sanity');
        console.log(`   Fetch duration: ${fetchDuration}ms`);
      }
    }

    const responseData = NextResponse.json(gownData);

    // Add cache headers for browser caching
    responseData.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Gown: ${gownData.name}`);
    console.log(`   Collection: ${gownData.collection.join(', ')}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return responseData;
  } catch (error) {
    console.error('❌ Error fetching gown from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gown' },
      { status: 500 }
    );
  }
}
