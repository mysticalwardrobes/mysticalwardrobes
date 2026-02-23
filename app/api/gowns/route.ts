import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, GOWNS_LIST_QUERY } from '@/lib/sanity';
import { GownListItem } from './model';
import {
  CACHE_CONTROL_HEADER,
  getCacheAge,
} from '@/app/api/cache-config';
import { supabaseAdmin } from '@/lib/supabase';
import { USE_REDIS_CACHE, getJSON, setJSON } from '@/lib/redis';

// Cache configuration
// Note: Must be a literal value for Next.js static analysis (3600 = 1 hour)
export const revalidate = 3600;

// Redis cache key for all gowns
const REDIS_CACHE_KEY = 'gowns:list:sanity';

// In-memory cache for popularity data (gown click counts)
interface PopularityData {
  clickCounts: Map<string, number>;
  timestamp: number;
}
let popularityCache: PopularityData | null = null;
const POPULARITY_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Helper to check if popularity cache is valid
function isPopularityCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < POPULARITY_CACHE_DURATION;
}

// Serialized cache entry structure for Redis
interface SerializedCacheEntry {
  data: GownListItem[];
  timestamp: number;
}

export async function GET(request: NextRequest) {
  try {
    const requestStart = Date.now();
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const tags = searchParams.getAll('tags');
    const colors = searchParams.getAll('colors');
    const bestFor = searchParams.getAll('bestFor');
    const skirtStyles = searchParams.getAll('skirtStyles');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') || 'name';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const search = searchParams.get('search');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW GOWNS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Prepare variables for data source
    const now = Date.now();
    let gownsData: GownListItem[] | undefined;
    let dataSource: 'cache' | 'sanity' = 'sanity';

    // Optionally check Redis cache first
    if (USE_REDIS_CACHE) {
      const cachedData = await getJSON<SerializedCacheEntry>(REDIS_CACHE_KEY);

      if (cachedData) {
        // Use cached data from Redis (no expiration - invalidated via webhook)
        gownsData = cachedData.data;
        dataSource = 'cache';
        console.log('✅ REDIS CACHE HIT: Using cached gowns data from Redis');
        console.log(`   Cache age: ${getCacheAge(cachedData.timestamp)}s`);
        console.log(`   Total items in cache: ${gownsData.length}`);
      }
    }

    if (!gownsData) {
      // Fetch fresh data from Sanity
      const fetchStart = Date.now();
      const sanityResponse = await sanityClient.fetch<GownListItem[] | null>(GOWNS_LIST_QUERY);
      const fetchDuration = Date.now() - fetchStart;

      // Handle null response (no documents found)
      if (!sanityResponse || !Array.isArray(sanityResponse)) {
        console.log('⚠️ No gowns found in Sanity or invalid response');
        gownsData = [];
      } else {
        // Map Sanity response to ensure proper defaults (only list view fields)
        gownsData = sanityResponse.map((item) => ({
          id: item.id,
          name: item.name ?? 'Untitled Gown',
          collection: item.collection ?? [],
          bestFor: item.bestFor ?? [],
          tags: item.tags ?? [],
          color: item.color ?? [],
          skirtStyle: item.skirtStyle ?? [],
          metroManilaRate: item.metroManilaRate ?? 0,
          pixieMetroManilaRate: item.pixieMetroManilaRate ?? 0,
          longGownPictures: item.longGownPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
          filipinianaPictures: item.filipinianaPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
          pixiePictures: item.pixiePictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
          trainPictures: item.trainPictures?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? [],
        }));
      }

      dataSource = 'sanity';

      // Store in Redis cache (no expiration - invalidated via webhook)
      if (USE_REDIS_CACHE) {
        const cacheEntry: SerializedCacheEntry = {
          data: gownsData,
          timestamp: now
        };
        await setJSON(REDIS_CACHE_KEY, cacheEntry);

        console.log(
          '🆕 INITIAL OR REFRESHED FETCH: Fetched gowns data from Sanity and stored in Redis'
        );
      } else {
        console.log('ℹ️ Redis cache disabled: fetched gowns data directly from Sanity');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${gownsData.length}`);
    }

    // At this point, gownsData is guaranteed to be defined
    let gowns: GownListItem[] = [...gownsData];
    const searchPriorityByGownId = new Map<string, number>();

    // Filter by collection
    if (collection && collection !== 'all') {
      console.log(`Filtering by collection: "${collection}"`);
      const allCollections = gowns.flatMap(g => g.collection);
      console.log(`Available collections:`, [...new Set(allCollections)]);

      gowns = gowns.filter(gown =>
        gown.collection.some(c => c.toLowerCase().trim() === collection.toLowerCase().trim())
      );

      console.log(`Found ${gowns.length} gowns in collection "${collection}"`);
    }

    // Filter by tags
    if (tags.length > 0) {
      gowns = gowns.filter(gown =>
        tags.some(tag =>
          gown.tags.some(gownTag => gownTag.toLowerCase().includes(tag.toLowerCase()))
        )
      );
    }

    // Filter by colors
    if (colors.length > 0) {
      gowns = gowns.filter(gown =>
        colors.some(color =>
          gown.color.some(gownColor => gownColor.toLowerCase().includes(color.toLowerCase()))
        )
      );
    }

    // Filter by bestFor
    if (bestFor.length > 0) {
      gowns = gowns.filter(gown =>
        bestFor.some(bf =>
          gown.bestFor.some(gownBestFor => gownBestFor.toLowerCase().includes(bf.toLowerCase()))
        )
      );
    }

    // Filter by skirt styles
    if (skirtStyles.length > 0) {
      gowns = gowns.filter(gown =>
        skirtStyles.some(style =>
          gown.skirtStyle.some(gownStyle => gownStyle.toLowerCase().includes(style.toLowerCase()))
        )
      );
    }

    // Filter by price range (using Metro Manila rate as default, fallback to pixie rate)
    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;

      gowns = gowns.filter(gown => {
        const price = gown.metroManilaRate > 0 ? gown.metroManilaRate : gown.pixieMetroManilaRate;
        return price >= min && price <= max;
      });
    }

    // Search by name, collection, bestFor, color, or tags
    if (search) {
      const searchLower = search.toLowerCase().trim();
      gowns = gowns.filter(gown => {
        const nameLower = gown.name.toLowerCase();
        const nameStartsWithMatch = nameLower.startsWith(searchLower);
        const nameContainsMatch = nameLower.includes(searchLower);
        const otherFieldsMatch =
          gown.collection.some(c => c.toLowerCase().includes(searchLower)) ||
          gown.bestFor.some(b => b.toLowerCase().includes(searchLower)) ||
          gown.color.some(c => c.toLowerCase().includes(searchLower)) ||
          gown.skirtStyle.some(s => s.toLowerCase().includes(searchLower)) ||
          gown.tags.some(tag => tag.toLowerCase().includes(searchLower));

        if (nameStartsWithMatch) {
          searchPriorityByGownId.set(gown.id, 0);
          return true;
        }

        if (nameContainsMatch) {
          searchPriorityByGownId.set(gown.id, 1);
          return true;
        }

        if (otherFieldsMatch) {
          searchPriorityByGownId.set(gown.id, 2);
          return true;
        }

        return false;
      });
    }

    const compareBySearchPriority = (a: GownListItem, b: GownListItem) => {
      if (!search || searchPriorityByGownId.size === 0) return 0;

      const priorityA = searchPriorityByGownId.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const priorityB = searchPriorityByGownId.get(b.id) ?? Number.MAX_SAFE_INTEGER;
      return priorityA - priorityB;
    };

    // Sort
    switch (sortBy) {
      case 'most-popular':
        // Fetch click counts from Supabase for last 30 days (with caching)
        try {
          let clickCounts: Map<string, number>;

          // Check if we have valid cached popularity data
          if (popularityCache && isPopularityCacheValid(popularityCache.timestamp)) {
            clickCounts = popularityCache.clickCounts;
            const cacheAgeSeconds = Math.floor((Date.now() - popularityCache.timestamp) / 1000);
            const cacheExpirySeconds = Math.floor((POPULARITY_CACHE_DURATION - (Date.now() - popularityCache.timestamp)) / 1000);
            console.log('✅ POPULARITY CACHE HIT: Using cached click data');
            console.log(`   Cache age: ${cacheAgeSeconds}s (expires in ${cacheExpirySeconds}s)`);
            console.log(`   Cached gowns with clicks: ${clickCounts.size}`);
          } else {
            // Fetch fresh popularity data from Supabase
            const popularityFetchStart = Date.now();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: clickData } = await supabaseAdmin
              .from('analytics_gown_clicks')
              .select('gown_id')
              .gte('created_at', thirtyDaysAgo.toISOString());

            const popularityFetchDuration = Date.now() - popularityFetchStart;

            // Count clicks per gown
            clickCounts = new Map<string, number>();
            clickData?.forEach(click => {
              clickCounts.set(click.gown_id, (clickCounts.get(click.gown_id) || 0) + 1);
            });

            // Update cache
            popularityCache = {
              clickCounts,
              timestamp: Date.now()
            };

            if (popularityCache) {
              console.log('🔄 POPULARITY CACHE MISS: Fetched fresh click data from Supabase');
            } else {
              console.log('🆕 INITIAL POPULARITY FETCH: Fetched click data from Supabase');
            }
            console.log(`   Fetch duration: ${popularityFetchDuration}ms`);
            console.log(`   Total clicks in last 30 days: ${clickData?.length || 0}`);
            console.log(`   Unique gowns with clicks: ${clickCounts.size}`);
            console.log(`   Cache will expire in: ${POPULARITY_CACHE_DURATION / 1000}s (15 minutes)`);
          }

          // Sort by click count (descending), then by name
          gowns.sort((a, b) => {
            const searchPriorityDiff = compareBySearchPriority(a, b);
            if (searchPriorityDiff !== 0) {
              return searchPriorityDiff;
            }

            const clicksA = clickCounts.get(a.id) || 0;
            const clicksB = clickCounts.get(b.id) || 0;
            if (clicksB !== clicksA) {
              return clicksB - clicksA;
            }
            return a.name.localeCompare(b.name);
          });
        } catch (error) {
          console.error('Error fetching click data for sorting:', error);
          // Fallback to name sorting if click data fetch fails
          gowns.sort((a, b) => a.name.localeCompare(b.name));
        }
        break;
      case 'price-low-high':
        gowns.sort((a, b) => {
          const searchPriorityDiff = compareBySearchPriority(a, b);
          if (searchPriorityDiff !== 0) {
            return searchPriorityDiff;
          }

          const priceA = a.metroManilaRate > 0 ? a.metroManilaRate : a.pixieMetroManilaRate;
          const priceB = b.metroManilaRate > 0 ? b.metroManilaRate : b.pixieMetroManilaRate;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        gowns.sort((a, b) => {
          const searchPriorityDiff = compareBySearchPriority(a, b);
          if (searchPriorityDiff !== 0) {
            return searchPriorityDiff;
          }

          const priceA = a.metroManilaRate > 0 ? a.metroManilaRate : a.pixieMetroManilaRate;
          const priceB = b.metroManilaRate > 0 ? b.metroManilaRate : b.pixieMetroManilaRate;
          return priceB - priceA;
        });
        break;
      case 'name-desc':
        gowns.sort((a, b) => {
          const searchPriorityDiff = compareBySearchPriority(a, b);
          if (searchPriorityDiff !== 0) {
            return searchPriorityDiff;
          }

          return b.name.localeCompare(a.name);
        });
        break;
      case 'name':
      default:
        gowns.sort((a, b) => {
          const searchPriorityDiff = compareBySearchPriority(a, b);
          if (searchPriorityDiff !== 0) {
            return searchPriorityDiff;
          }

          return a.name.localeCompare(b.name);
        });
        break;
    }

    // Calculate pagination
    const totalItems = gowns.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGowns = gowns.slice(startIndex, endIndex);

    // If requesting collections list, return available collections
    if (searchParams.get('listCollections') === 'true') {
      const allCollections = gowns.flatMap(g => g.collection);
      const availableCollections = [...new Set(allCollections)].sort();
      const collectionsResponse = NextResponse.json({
        collections: availableCollections,
        total: availableCollections.length
      });

      // Add cache headers
      collectionsResponse.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

      // Log collections list request
      const collectionsRequestTime = Date.now() - requestStart;
      console.log('📋 COLLECTIONS LIST REQUEST:');
      console.log(`   Data source: ${dataSource.toUpperCase()}`);
      console.log(`   Collections found: ${availableCollections.length}`);
      console.log(`   Collections: ${availableCollections.join(', ')}`);
      console.log(`   Total request time: ${collectionsRequestTime}ms`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return collectionsResponse;
    }

    const responseData = NextResponse.json({
      items: paginatedGowns,
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
    console.log(`   Collection filter: ${collection || 'none'}`);
    console.log(`   Sort by: ${sortBy}`);
    console.log(`   Page: ${page}/${totalPages}`);
    console.log(`   Items in response: ${paginatedGowns.length}`);
    console.log(`   Total matching items: ${totalItems}`);
    console.log(`   Active filters: tags(${tags.length}), colors(${colors.length}), bestFor(${bestFor.length}), skirtStyles(${skirtStyles.length})`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return responseData;
  } catch (error) {
    console.error('Error fetching gowns from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gowns' },
      { status: 500 }
    );
  }
}
