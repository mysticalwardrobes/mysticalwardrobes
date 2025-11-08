import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { supabaseAdmin } from '@/lib/supabase';
import { deleteOptionImages } from '@/lib/supabase-storage';

/**
 * PUT /api/admin/voting/events/[id]/options/[optionId]
 * Update an option
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; optionId: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, optionId } = await params;
    const { name, description, image_urls, display_order } = await request.json();

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (image_urls) updateData.image_urls = image_urls;
    if (display_order !== undefined) updateData.display_order = display_order;

    const { data: option, error } = await supabaseAdmin
      .from('voting_options')
      .update(updateData)
      .eq('id', optionId)
      .eq('event_id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating option:', error);
      return NextResponse.json(
        { error: 'Failed to update option' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, option });
  } catch (error) {
    console.error('Error in PUT option:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/voting/events/[id]/options/[optionId]
 * Delete an option and its images
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; optionId: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, optionId } = await params;

    // Delete images first
    await deleteOptionImages(id, optionId);

    // Delete option from database
    const { error } = await supabaseAdmin
      .from('voting_options')
      .delete()
      .eq('id', optionId)
      .eq('event_id', id);

    if (error) {
      console.error('Error deleting option:', error);
      return NextResponse.json(
        { error: 'Failed to delete option' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE option:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

