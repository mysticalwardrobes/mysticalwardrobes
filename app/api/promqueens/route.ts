import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/app/api/config';
import { PromQueen, PromQueensResponse } from './model';
import { 
  REVALIDATE_TIME, 
  PROMQUEENS_CACHE_DURATION, 
  CACHE_CONTROL_HEADER,
  ContentfulEntriesResponse,
  CacheEntry,
  isCacheValid,
  getCacheAge,
  getCacheExpiry
} from '@/app/api/cache-config';

// Cache configuration
export const revalidate = REVALIDATE_TIME;

// In-memory cache for promqueens data
let promqueensCache: CacheEntry<ContentfulEntriesResponse> | null = null;

// Helper functions for Contentful data extraction
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const ensureString = (value: unknown): string | null => {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
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

const extractGownInfo = (value: unknown): { id: string | null; name: string | null } => {
  if (!isRecord(value) || !('sys' in value) || !('fields' in value)) {
    return { id: null, name: null };
  }

  const sys = (value as { sys?: unknown }).sys;
  const fields = (value as { fields?: unknown }).fields;

  if (!isRecord(sys) || !('id' in sys)) {
    return { id: null, name: null };
  }

  if (!isRecord(fields) || !('name' in fields)) {
    return { id: null, name: null };
  }

  const id = ensureString((sys as { id?: unknown }).id);
  const name = ensureString((fields as { name?: unknown }).name);

  return { id, name };
};

// Fisher-Yates shuffle algorithm for random ordering
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export async function GET(request: NextRequest) {
  try {
    const requestStart = Date.now();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW PROMQUEENS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Check if we have valid cached data
    const now = Date.now();
    let response;
    let dataSource: 'cache' | 'contentful' = 'cache';
    
    if (promqueensCache && isCacheValid(promqueensCache.timestamp, PROMQUEENS_CACHE_DURATION)) {
      // Use cached data
      response = promqueensCache.data;
      console.log('✅ CACHE HIT: Using cached promqueens data');
      console.log(`   Cache age: ${getCacheAge(promqueensCache.timestamp)}s (expires in ${getCacheExpiry(promqueensCache.timestamp, PROMQUEENS_CACHE_DURATION)}s)`);
      console.log(`   Total items in cache: ${response.items.length}`);
    } else {
      // Fetch fresh data from Contentful
      const fetchStart = Date.now();
      response = await client.getEntries({
        content_type: 'promQueens',
        include: 2, // Include linked entries (gowns) and assets (pictures)
      });
      const fetchDuration = Date.now() - fetchStart;
      
      dataSource = 'contentful';
      
      // Update cache
      promqueensCache = {
        data: response,
        timestamp: now
      };
      
      if (promqueensCache) {
        console.log('🔄 CACHE MISS: Fetched fresh promqueens data from Contentful');
      } else {
        console.log('🆕 INITIAL FETCH: Fetched promqueens data from Contentful');
      }
      console.log(`   Fetch duration: ${fetchDuration}ms`);
      console.log(`   Total items fetched: ${response.items.length}`);
      console.log(`   Cache updated at: ${new Date(now).toISOString()}`);
    }

    // Transform Contentful entries to our PromQueen interface
    const promQueens = response.items
      .map((item) => {
        const fields = isRecord(item.fields) ? (item.fields as Record<string, unknown>) : {};

        const clientName = ensureString(fields.clientName);
        const picture = fields.picture;
        const gown = fields.gown;

        const pictureUrl = extractAssetUrl(picture);
        const gownInfo = extractGownInfo(gown);

        // Only include entries that have a picture
        if (!pictureUrl) {
          return null;
        }

        return {
          id: String(item.sys.id),
          clientName,
          pictureUrl: 'https:' + pictureUrl,
          gownId: gownInfo.id,
          gownName: gownInfo.name,
        };
      })
      .filter((item) => item !== null);

    // Shuffle the array for random ordering
    const shuffledPromQueens = shuffleArray(promQueens);

    // Apply limit if specified
    const limitedPromQueens = limit > 0 ? shuffledPromQueens.slice(0, limit) : shuffledPromQueens;

    const responseData: PromQueensResponse = {
      items: limitedPromQueens,
      total: promQueens.length,
    };

    const responseJson = NextResponse.json(responseData);

    // Add cache headers for browser caching
    responseJson.headers.set('Cache-Control', CACHE_CONTROL_HEADER);

    // Log final response details
    const totalRequestTime = Date.now() - requestStart;
    console.log('📤 RESPONSE:');
    console.log(`   Data source: ${dataSource.toUpperCase()}`);
    console.log(`   Limit: ${limit}`);
    console.log(`   Items in response: ${limitedPromQueens.length}`);
    console.log(`   Total promqueens: ${promQueens.length}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return responseJson;
  } catch (error) {
    console.error('❌ Error fetching prom queens from Contentful:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prom queens' },
      { status: 500 }
    );
  }
}
