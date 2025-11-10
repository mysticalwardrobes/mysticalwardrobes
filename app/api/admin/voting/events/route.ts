import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/voting/events
 * List all voting events
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: events, error } = await supabaseAdmin
      .from('voting_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error in GET /api/admin/voting/events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/voting/events
 * Create a new voting event
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, start_date, end_date, is_active } = await request.json();

    // Validation
    if (!name || !description || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid start or end date' },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    const startIso = start.toISOString();
    const endIso = end.toISOString();

    const { data: event, error } = await supabaseAdmin
      .from('voting_events')
      .insert({
        name,
        description,
        start_date: startIso,
        end_date: endIso,
        is_active: is_active || false,
        created_by: session.user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return NextResponse.json(
        { error: 'Failed to create event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error in POST /api/admin/voting/events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

