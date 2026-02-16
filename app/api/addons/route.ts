import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, ADDONS_LIST_QUERY } from '@/lib/sanity';
import { AddOn } from './model';
import {
  CACHE_CONTROL_HEADER,
  getCacheAge,
} from '@/app/api/cache-config';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';

// Cache configuration
// Note: Must be a literal value for Next.js static analysis (3600 = 1 hour)
export const revalidate = 3600;

// Redis cache key for all addons
const REDIS_CACHE_KEY = 'addons:all:sanity';

// Serialized cache entry structure for Redis
interface SerializedCacheEntry {
  data: AddOn[];
  timestamp: number;
}

export async function GET(request: NextRequest) {
  try {
    const requestStart = Date.now();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'name';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW ADDONS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    let addOnsData: AddOn[] | undefined;
    let dataSource: 'cache' | 'sanity' = 'sanity';

    // Optionally check Redis cache first
    if (USE_REDIS_CACHE) {
      const cachedData = await getJSON<SerializedCacheEntry>(REDIS_CACHE_KEY);

      if (cachedData) {
        // Use cached data from Redis (no expiration - invalidated via webhook)
        addOnsData = cachedData.data;
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached addons data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedData.timestamp)}s`);
        console.log(`   Total items in cache: ${addOnsData.length}`);
      }
    }

    // If no valid cache (or Redis disabled), fetch from Sanity
    if (!addOnsData) {
      // Fetch fresh data from Sanity
      const fetchStart = Date.now();
      const sanityResponse = await sanityClient.fetch<AddOn[]>(ADDONS_LIST_QUERY);
      const fetchDuration = Date.now() - fetchStart;

      // Map Sanity response to ensure proper defaults
      addOnsData = sanityResponse.map((item) => ({
        id: item.id,
        name: item.name ?? 'Untitled Add-On',
        type: item.type ?? 'accessory',
        metroManilaRate: item.metroManilaRate ?? 0,
        luzonRate: item.luzonRate ?? 0,
        outsideLuzonRate: item.outsideLuzonRate ?? 0,
        forSaleRate: item.forSaleRate ?? null,
        pictures: item.pictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
      }));

      dataSource = 'sanity';

      // Store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const cacheEntry: SerializedCacheEntry = {
          data: addOnsData,
          timestamp: now
        };
        await setJSON(REDIS_CACHE_KEY, cacheEntry);

        console.log(
          '🆕 INITIAL OR REFRESHED FETCH: Fetched addons data from Sanity and stored in Redis'
        );
      } else {
        console.log('ℹ️ Redis cache disabled: fetched addons data directly from Sanity');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${addOnsData.length}`);
      console.log(`   Cache stored in Redis (no expiration - invalidated via webhook)`);
      console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
    }

    // At this point, addOnsData is guaranteed to be defined
    let addOns: AddOn[] = [...addOnsData];

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

    // Filter by search query (name only - description is now Portable Text)
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      addOns = addOns.filter(addon =>
        addon.name.toLowerCase().includes(searchLower)
      );
      console.log(`   Search query: "${search}"`);
      console.log(`   Found ${addOns.length} addons matching search`);
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
    console.error('Error fetching add-ons from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch add-ons' },
      { status: 500 }
    );
  }
}
