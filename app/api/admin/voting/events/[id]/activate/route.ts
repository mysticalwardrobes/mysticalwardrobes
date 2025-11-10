import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * POST /api/admin/voting/events/[id]/activate
 * Activate an event (deactivates all others)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // The trigger will automatically deactivate other events
    const { data: event, error } = await supabaseAdmin
      .from('voting_events')
      .update({ is_active: true, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error activating event:', error);
      return NextResponse.json(
        { error: 'Failed to activate event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error in POST activate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/voting/events/[id]/activate
 * Deactivate an event
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

    const { data: event, error } = await supabaseAdmin
      .from('voting_events')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deactivating event:', error);
      return NextResponse.json(
        { error: 'Failed to deactivate event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error in DELETE activate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

