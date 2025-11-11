import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';

/**
 * GET /api/admin/cache
 * Cache management is no longer needed - data is served directly from Contentful/Supabase
 */
export async function GET() {
  try {
    // Verify admin session
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      message: 'Cache management is no longer needed. Data is served directly from Contentful and Supabase.',
      status: 'disabled'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/cache/refresh
 * No longer needed - removed Redis caching
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cache refresh is no longer needed. Data is served directly from sources.',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/cache
 * No longer needed - removed Redis caching
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin session
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cache clearing is no longer needed.',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
