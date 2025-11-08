import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { calculateResults } from '@/lib/voting-utils';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/voting/events/[id]/results
 * Get detailed voting results for an event
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Get event details
    const { data: event, error: eventError } = await supabaseAdmin
      .from('voting_events')
      .select('*, voting_options (*)')
      .eq('id', id)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Calculate results
    const results = await calculateResults(id);

    // Enhance results with option details
    const detailedResults = results.results.map(result => {
      const option = event.voting_options?.find((opt: any) => opt.id === result.optionId);
      return {
        ...result,
        optionName: option?.name || 'Unknown',
        optionDescription: option?.description || '',
      };
    });

    return NextResponse.json({
      event: {
        id: event.id,
        name: event.name,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        status: event.status,
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

