import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, PROMQUEENS_LIST_QUERY } from '@/lib/sanity';
import { PromQueen, PromQueensResponse } from './model';
import { CACHE_CONTROL_HEADER } from '@/app/api/cache-config';

// Cache configuration
export const revalidate = 3600;

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

    // Fetch prom queens from Sanity
    const fetchStart = Date.now();
    const sanityResponse = await sanityClient.fetch<PromQueen[] | null>(PROMQUEENS_LIST_QUERY);
    const fetchDuration = Date.now() - fetchStart;

    // Handle null response
    if (!sanityResponse || !Array.isArray(sanityResponse)) {
      console.log('⚠️ No prom queens found in Sanity or invalid response');
      const emptyResponse: PromQueensResponse = {
        items: [],
        total: 0,
      };
      return NextResponse.json(emptyResponse);
    }

    console.log(`   Fetch duration: ${fetchDuration}ms`);
    console.log(`   Total items fetched: ${sanityResponse.length}`);

    // Transform Sanity response and filter items with pictures
    const promQueens: PromQueen[] = sanityResponse
      .map((item) => ({
        id: item.id,
        clientName: item.clientName ?? null,
        pictureUrl: item.pictureUrl ?? null,
        gownId: item.gownId ?? null,
        gownName: item.gownName ?? null,
      }))
      .filter((item) => item.pictureUrl !== null);

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
    console.log(`   Data source: SANITY`);
    console.log(`   Limit: ${limit}`);
    console.log(`   Items in response: ${limitedPromQueens.length}`);
    console.log(`   Total promqueens: ${promQueens.length}`);
    console.log(`   Total request time: ${totalRequestTime}ms`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return responseJson;
  } catch (error) {
    console.error('❌ Error fetching prom queens from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prom queens' },
      { status: 500 }
    );
  }
}
