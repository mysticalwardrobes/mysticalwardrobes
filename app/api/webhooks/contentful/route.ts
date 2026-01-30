import { NextRequest, NextResponse } from 'next/server';
import { USE_REDIS_CACHE, invalidateContentfulCache } from '@/lib/redis';

/**
 * Contentful Webhook Endpoint
 * 
 * This endpoint is called by Contentful when content is published, unpublished, or deleted.
 * It invalidates all Redis cache to ensure fresh data is served.
 * 
 * Security: Uses CONTENTFUL_WEBHOOK_SECRET environment variable for authentication
 * 
 * Setup in Contentful:
 * 1. Go to Settings > Webhooks
 * 2. Create a new webhook
 * 3. Set URL to: https://yourdomain.com/api/webhooks/contentful
 * 4. Add header: X-Contentful-Secret: <your-secret>
 * 5. Select events: Entry publish, Entry unpublish, Entry delete
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const webhookSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;
    const providedSecret = request.headers.get('X-Contentful-Secret');

    if (!webhookSecret) {
      console.error('❌ CONTENTFUL_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    if (providedSecret !== webhookSecret) {
      console.warn('⚠️  Invalid webhook secret provided');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload = await request.json().catch(() => null);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔔 CONTENTFUL WEBHOOK RECEIVED');
    console.log(`   Timestamp: ${new Date().toISOString()}`);
    
    if (payload) {
      const sys = payload.sys || {};
      const contentType = sys.contentType?.sys?.id || 'unknown';
      const eventType = sys.type || 'unknown';
      
      console.log(`   Content Type: ${contentType}`);
      console.log(`   Event Type: ${eventType}`);
      console.log(`   Entry ID: ${sys.id || 'N/A'}`);
    }

    // Invalidate all Contentful cache if Redis is enabled; otherwise, no-op
    if (USE_REDIS_CACHE) {
      const result = await invalidateContentfulCache();

      console.log('✅ Cache invalidation complete');
      console.log(`   Gowns cache cleared: ${result.gowns} keys`);
      console.log(`   Addons cache cleared: ${result.addons} keys`);
      console.log(`   Custom-made gowns cache cleared: ${result.customMadeGowns} keys`);
      console.log(`   Total keys cleared: ${result.total}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return NextResponse.json({
        success: true,
        message: 'Cache invalidated successfully',
        cleared: result,
      });
    } else {
      console.log('ℹ️ Redis cache disabled: skipping Redis invalidation');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return NextResponse.json({
        success: true,
        message: 'Redis cache is disabled; no cache invalidation performed',
        cleared: {
          gowns: 0,
          addons: 0,
          customMadeGowns: 0,
          total: 0,
        },
      });
    }
  } catch (error) {
    console.error('❌ Error processing Contentful webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also handle GET requests for webhook testing/verification
export async function GET() {
  return NextResponse.json({
    message: 'Contentful webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}

