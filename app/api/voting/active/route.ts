import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/voting/active
 * Get the currently active voting event with all options
 */
export async function GET() {
  try {
    const { data: event, error } = await supabaseAdmin
      .from('voting_events')
      .select(`
        *,
        voting_options (*)
      `)
      .eq('is_active', true)
      .eq('status', 'active')
      .single();

    if (error) {
      // No active event (this is normal, not an error)
      if (error.code === 'PGRST116') {
        return NextResponse.json({ event: null });
      }
      
      console.error('Error fetching active event:', error);
      return NextResponse.json(
        { error: 'Failed to fetch active event' },
        { status: 500 }
      );
    }

    let activeEvent = event;

    if (activeEvent) {
      const now = new Date();
      const startDate = new Date(activeEvent.start_date);
      const endDate = new Date(activeEvent.end_date);

      let status = activeEvent.status;
      let isActive = activeEvent.is_active;

      if (now < startDate) {
        status = 'draft';
      } else if (now >= startDate && now <= endDate) {
        status = 'active';
        isActive = true;
      } else {
        status = 'ended';
        isActive = false;
      }

      if (status !== activeEvent.status || isActive !== activeEvent.is_active) {
        const { data: updatedEvent, error: updateError } = await supabaseAdmin
          .from('voting_events')
          .update({
            status,
            is_active: isActive,
            updated_at: new Date().toISOString(),
          })
          .eq('id', activeEvent.id)
          .select(`
            *,
            voting_options (*)
          `)
          .single();

        if (updateError) {
          console.error('Error updating event status:', updateError);
          return NextResponse.json(
            { error: 'Failed to fetch active event' },
            { status: 500 }
          );
        }

        activeEvent = updatedEvent;
      }

      if (
        status !== 'active' ||
        !isActive ||
        now < startDate ||
        now > endDate
      ) {
        return NextResponse.json({ event: null });
      }

      if (activeEvent.voting_options) {
        activeEvent.voting_options.sort((a: any, b: any) => a.display_order - b.display_order);
      }

      return NextResponse.json({ event: activeEvent });
    }

    return NextResponse.json({ event: null });
  } catch (error) {
    console.error('Error in GET /api/voting/active:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

