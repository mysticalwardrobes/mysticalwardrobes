import { NextResponse } from 'next/server';
import { sanityClient, REVIEWS_LIST_QUERY } from '@/lib/sanity';
import { Review } from './model';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const random = searchParams.get('random') === 'true';
    const limit = parseInt(searchParams.get('limit') || '0', 10);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 NEW REVIEWS API REQUEST');
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Fetch reviews from Sanity
    const fetchStart = Date.now();
    const sanityResponse = await sanityClient.fetch<Review[] | null>(REVIEWS_LIST_QUERY);
    const fetchDuration = Date.now() - fetchStart;

    // Handle null response
    if (!sanityResponse || !Array.isArray(sanityResponse)) {
      console.log('⚠️ No reviews found in Sanity or invalid response');
      return NextResponse.json([]);
    }

    // Map Sanity response to ensure proper defaults
    let items: Review[] = sanityResponse.map((item) => ({
      id: item.id,
      clientName: item.clientName ?? '',
      comment: item.comment ?? null, // Portable Text array from Sanity
      thumbnailMediaUrl: item.thumbnailMediaUrl ?? null,
      otherMediaUrls: item.otherMediaUrls?.filter((url): url is string => typeof url === 'string' && url.length > 0) ?? null,
      gownId: item.gownId ?? null,
      otherGownsIds: item.otherGownsIds?.filter((id): id is string => typeof id === 'string' && id.length > 0) ?? null,
    }));

    console.log(`   Fetch duration: ${fetchDuration}ms`);
    console.log(`   Total items fetched: ${items.length}`);

    // Apply random selection if requested
    if (random) {
      items = items.sort(() => Math.random() - 0.5);
    }

    // Apply limit if specified
    if (limit > 0) {
      items = items.slice(0, limit);
    }

    console.log('📤 RESPONSE:');
    console.log(`   Random: ${random}`);
    console.log(`   Limit: ${limit > 0 ? limit : 'none'}`);
    console.log(`   Items in response: ${items.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return NextResponse.json(items);
  } catch (error) {
    console.error('❌ Error fetching reviews from Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
