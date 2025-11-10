import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { supabaseAdmin } from '@/lib/supabase';
import { deleteEventImages } from '@/lib/supabase-storage';

/**
 * GET /api/admin/voting/events/[id]
 * Get event details with options
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

    const { data: event, error } = await supabaseAdmin
      .from('voting_events')
      .select(`
        *,
        voting_options (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error in GET /api/admin/voting/events/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/voting/events/[id]
 * Update event details
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { name, description, start_date, end_date } = await request.json();

    const updateData: any = { updated_at: new Date().toISOString() };
    
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const start = start_date ? new Date(start_date) : null;
    const end = end_date ? new Date(end_date) : null;

    if (start_date) {
      if (!start || Number.isNaN(start.getTime())) {
        return NextResponse.json(
          { error: 'Invalid start date' },
          { status: 400 }
        );
      }
      updateData.start_date = start.toISOString();
    }

    if (end_date) {
      if (!end || Number.isNaN(end.getTime())) {
        return NextResponse.json(
          { error: 'Invalid end date' },
          { status: 400 }
        );
      }
      updateData.end_date = end.toISOString();
    }

    if (start && end && end <= start) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    const { data: event, error } = await supabaseAdmin
      .from('voting_events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      return NextResponse.json(
        { error: 'Failed to update event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error in PUT /api/admin/voting/events/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/voting/events/[id]
 * Delete event (and all associated options, votes, images)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Delete all images for this event
    await deleteEventImages(id);

    // Delete event (cascade will delete options and votes)
    const { error } = await supabaseAdmin
      .from('voting_events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return NextResponse.json(
        { error: 'Failed to delete event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/voting/events/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

