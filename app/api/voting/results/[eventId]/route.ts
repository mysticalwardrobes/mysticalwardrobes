import { NextRequest, NextResponse } from 'next/server';
import { calculateResults } from '@/lib/voting-utils';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/voting/results/[eventId]
 * Get public voting results for an event
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;

    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('voting_events')
      .select('*, voting_options (*)')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Calculate results
    const results = await calculateResults(eventId);

    // Enhance results with option details
    const detailedResults = results.results.map(result => {
      const option = event.voting_options?.find((opt: any) => opt.id === result.optionId);
      return {
        optionId: result.optionId,
        optionName: option?.name || 'Unknown',
        optionDescription: option?.description || '',
        imageUrls: option?.image_urls || [],
        votes: result.votes,
        percentage: result.percentage,
      };
    });

    return NextResponse.json({
      event: {
        id: event.id,
        name: event.name,
        description: event.description,
        status: event.status,
        end_date: event.end_date,
      },
      totalVotes: results.totalVotes,
      results: detailedResults,
    });
  } catch (error) {
    console.error('Error in GET results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

