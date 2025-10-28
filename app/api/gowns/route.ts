import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { Gown } from './model';
import { 
  CACHE_DURATION, 
  CACHE_CONTROL_HEADER,
  ContentfulEntriesResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';

// Cache configuration
// Note: Must be a literal value for Next.js static analysis (3600 = 1 hour)
export const revalidate = 3600;

// In-memory cache for gowns data
let gownsCache: CacheEntry<ContentfulEntriesResponse> | null = null;

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

const ensureStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map(item => ensureString(item))
      .filter((item): item is string => item !== null);
  }
  return [];
};

// Accepts either an array of strings (ids) or an array of linked entries
// and returns an array of entry IDs
const extractIdArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const ids: string[] = [];
  for (const item of value) {
    const asString = ensureString(item);
    if (asString) {
      ids.push(asString);
      continue;
    }

    if (isRecord(item) && 'sys' in item) {
      const sys = (item as { sys?: unknown }).sys;
      if (isRecord(sys) && 'id' in sys) {
        const id = ensureString((sys as Record<string, unknown>).id);
        if (id) ids.push(id);
        continue;
      }
    }
  }
  return ids;
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

    // Check if we have valid cached data
    const now = Date.now();
    let response;
    let dataSource: 'cache' | 'contentful' = 'cache';
    
    if (gownsCache && isCacheValid(gownsCache.timestamp)) {
      // Use cached data
      response = gownsCache.data;
      console.log('✅ CACHE HIT: Using cached gowns data');
      console.log(`   Cache age: ${getCacheAge(gownsCache.timestamp)}s (expires in ${getCacheExpiry(gownsCache.timestamp)}s)`);
      console.log(`   Total items in cache: ${response.items.length}`);
    } else {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntries({
        content_type: 'gown',
        include: 10, // Include linked assets (images)
        limit: 1000, // Maximum allowed by Contentful API to fetch all items
      });
      const fetchDuration = Date.now() - fetchStart;
      
      dataSource = 'contentful';
      
      // Update cache
      gownsCache = {
        data: response,
        timestamp: now
      };
      
      if (gownsCache) {
        console.log('🔄 CACHE MISS: Fetched fresh gowns data from Contentful');
      } else {
        console.log('🆕 INITIAL FETCH: Fetched gowns data from Contentful');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${response.items.length}`);
      console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
    }

    // Transform Contentful entries to our Gown interface
    let gowns: Gown[] = response.items.map((item) => {
      const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

      const name = ensureString(fields.name) ?? 'Untitled Gown';
      const collection = ensureStringArray(fields.collection);
      const bestFor = ensureStringArray(fields.bestFor);
      const tags = ensureStringArray(fields.tags);
      const color = ensureStringArray(fields.color);
      const skirtStyle = ensureStringArray(fields.skirtStyle);
      const metroManilaRate = ensureNumber(fields.metroManilaRate) ?? 0;
      const luzonRate = ensureNumber(fields.luzonRate) ?? 0;
      const outsideLuzonRate = ensureNumber(fields.outsideLuzonRate) ?? 0;
      const pixieMetroManilaRate = ensureNumber(fields.pixieMetroManilaRate) ?? 0;
      const pixieLuzonRate = ensureNumber(fields.pixieLuzonRate) ?? 0;
      const pixieOutsideLuzonRate = ensureNumber(fields.pixieOutsideLuzonRate) ?? 0;
      const forSaleRateLong = ensureNumber(fields.forSaleRateLong) ?? 0;
      const forSaleRatePixie = ensureNumber(fields.forSaleRatePixie) ?? 0;
      const bust = ensureString(fields.bust) ?? '';
      const waist = ensureString(fields.waist) ?? '';
      const arms = ensureString(fields.arms) ?? '';
      const backing = ensureString(fields.backing) ?? '';
      const lenght = ensureString(fields.lenght) ?? '';
      // Add-ons may be Symbols or Entry links; normalize to entry IDs
      const addOns = extractIdArray(fields.addOns);
      const relatedGowns = ensureStringArray(fields.relatedGowns);

      // Extract image URLs (handle arrays of images)
      const longGownPictures = normalizeAssetUrls(fields.longGownPicture);
      const filipinianaPictures = normalizeAssetUrls(fields.filipinianaPicture);
      const pixiePictures = normalizeAssetUrls(fields.pixiePicture);
      const trainPictures = normalizeAssetUrls(fields.trainPicture);

      return {
        id: String(item.sys.id),
        name,
        collection,
        bestFor,
        tags,
        color,
        skirtStyle,
        metroManilaRate,
        luzonRate,
        outsideLuzonRate,
        pixieMetroManilaRate,
        pixieLuzonRate,
        pixieOutsideLuzonRate,
        forSaleRateLong,
        forSaleRatePixie,
        bust,
        waist,
        arms,
        backing,
        lenght,
        longGownPictures,
        filipinianaPictures,
        pixiePictures,
        trainPictures,
        addOns,
        relatedGowns,
      };
    });

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
      const searchLower = search.toLowerCase();
      gowns = gowns.filter(gown => 
        gown.name.toLowerCase().includes(searchLower) ||
        gown.collection.some(c => c.toLowerCase().includes(searchLower)) ||
        gown.bestFor.some(b => b.toLowerCase().includes(searchLower)) ||
        gown.color.some(c => c.toLowerCase().includes(searchLower)) ||
        gown.skirtStyle.some(s => s.toLowerCase().includes(searchLower)) ||
        gown.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low-high':
        gowns.sort((a, b) => {
          const priceA = a.metroManilaRate > 0 ? a.metroManilaRate : a.pixieMetroManilaRate;
          const priceB = b.metroManilaRate > 0 ? b.metroManilaRate : b.pixieMetroManilaRate;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        gowns.sort((a, b) => {
          const priceA = a.metroManilaRate > 0 ? a.metroManilaRate : a.pixieMetroManilaRate;
          const priceB = b.metroManilaRate > 0 ? b.metroManilaRate : b.pixieMetroManilaRate;
          return priceB - priceA;
        });
        break;
      case 'name-desc':
        gowns.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'name':
      default:
        gowns.sort((a, b) => a.name.localeCompare(b.name));
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
    console.error('Error fetching gowns from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gowns' },
      { status: 500 }
    );
  }
}