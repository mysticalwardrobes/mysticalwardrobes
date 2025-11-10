import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/voting/events/[id]/options
 * List all options for an event
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

    const { data: options, error } = await supabaseAdmin
      .from('voting_options')
      .select('*')
      .eq('event_id', id)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching options:', error);
      return NextResponse.json(
        { error: 'Failed to fetch options' },
        { status: 500 }
      );
    }

    return NextResponse.json({ options });
  } catch (error) {
    console.error('Error in GET options:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/voting/events/[id]/options
 * Create a new option for an event
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
    const body = await request.json();
    const { name, description, image_urls, display_order } = body;

    // Validation
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const { data: option, error } = await supabaseAdmin
      .from('voting_options')
      .insert({
        event_id: id,
        name,
        description,
        image_urls: image_urls || [],
        display_order: display_order || 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating option:', error);
      return NextResponse.json(
        { error: 'Failed to create option' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, option });
  } catch (error) {
    console.error('Error in POST options:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

