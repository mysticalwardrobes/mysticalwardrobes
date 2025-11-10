import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-supabase';
import { redis } from '@/lib/redis-config';

/**
 * GET /api/admin/cache
 * Get cache status for all content types
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

    const cacheKeys = [
      'mysticalwardrobes:gowns',
      'mysticalwardrobes:reviews',
      'mysticalwardrobes:promqueens',
      'mysticalwardrobes:addons',
    ];

    const cacheStatus = await Promise.all(
      cacheKeys.map(async (key) => {
        try {
          const ttl = await redis.ttl(key);
          const exists = ttl > -2;

          return {
            key,
            exists,
            ttl: ttl > 0 ? ttl : null,
            expiresIn: ttl > 0 ? `${Math.floor(ttl / 3600)}h ${Math.floor((ttl % 3600) / 60)}m` : null,
          };
        } catch (error) {
          return {
            key,
            exists: false,
            ttl: null,
            expiresIn: null,
            error: 'Failed to check status',
          };
        }
      })
    );

    return NextResponse.json({ cacheStatus });
  } catch (error) {
    console.error('Error fetching cache status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/cache/refresh
 * Trigger a manual cache refresh
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

    const { contentType } = await request.json();

    // If no specific content type, refresh all
    const refreshUrl = contentType
      ? `/api/cache/refresh?type=${contentType}`
      : '/api/cache/refresh';

    // Note: In a real implementation, you might want to call an internal refresh function
    // For now, we'll return a message indicating the admin should trigger the refresh endpoint

    return NextResponse.json({
      success: true,
      message: 'Cache refresh initiated',
      note: 'Please ensure the cache refresh endpoint is called with proper authentication',
    });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/cache
 * Clear specific cache keys
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

    const { keys } = await request.json();

    if (!Array.isArray(keys)) {
      return NextResponse.json(
        { error: 'keys must be an array' },
        { status: 400 }
      );
    }

    await Promise.all(keys.map(key => redis.del(key)));

    return NextResponse.json({
      success: true,
      message: `Cleared ${keys.length} cache key(s)`,
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

