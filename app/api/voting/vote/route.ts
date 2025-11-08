import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashEmail, validateEmail, canUserVote, isEventActive } from '@/lib/voting-utils';

/**
 * POST /api/voting/vote
 * Submit a vote for an option
 */
export async function POST(request: NextRequest) {
  try {
    const { eventId, optionId, email } = await request.json();

    // Validation
    if (!eventId || !optionId || !email) {
      return NextResponse.json(
        { error: 'Event ID, option ID, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if event exists and is active
    const { data: event, error: eventError } = await supabaseAdmin
      .from('voting_events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (!isEventActive(event)) {
      return NextResponse.json(
        { error: 'This voting event is not currently active' },
        { status: 400 }
      );
    }

    // Check if user already voted
    const canVote = await canUserVote(eventId, email);
    if (!canVote) {
      return NextResponse.json(
        { error: 'You have already voted in this event' },
        { status: 400 }
      );
    }

    // Verify option belongs to this event
    const { data: option, error: optionError } = await supabaseAdmin
      .from('voting_options')
      .select('id')
      .eq('id', optionId)
      .eq('event_id', eventId)
      .single();

    if (optionError || !option) {
      return NextResponse.json(
        { error: 'Invalid option for this event' },
        { status: 400 }
      );
    }

    // Get IP and user agent (for fraud prevention)
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Submit vote
    const emailHash = hashEmail(email);
    const { data: vote, error: voteError } = await supabaseAdmin
      .from('votes')
      .insert({
        event_id: eventId,
        option_id: optionId,
        voter_email_hash: emailHash,
        ip_address: ip,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (voteError) {
      console.error('Error submitting vote:', voteError);
      
      // Check for duplicate vote constraint
      if (voteError.code === '23505') {
        return NextResponse.json(
          { error: 'You have already voted in this event' },
          { status: 400 }
        );
      }

      if (voteError.code === '42501') {
        console.error('RLS blocked vote insert. Check Supabase policies or service role configuration.');
        return NextResponse.json(
          { error: 'Voting is temporarily unavailable. Please try again later.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to submit vote' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your vote has been recorded successfully!',
      voteId: vote.id,
    });
  } catch (error) {
    console.error('Error in POST /api/voting/vote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

