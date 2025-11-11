import { NextRequest, NextResponse } from 'next/server';
import { trackPageView, trackGownClick } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    if (!type) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') ?? undefined;
    const referrer = request.headers.get('referer') ?? undefined;

    switch (type) {
      case 'page_view':
        if (!data?.path) {
          return NextResponse.json(
            { error: 'Path is required for page view events' },
            { status: 400 }
          );
        }
        await trackPageView(data.path, { 
          userAgent, 
          referrer,
          sessionId: data.sessionId 
        });
        break;

      case 'gown_click':
        if (!data?.gownId) {
          return NextResponse.json(
            { error: 'Gown ID is required for gown click events' },
            { status: 400 }
          );
        }
        await trackGownClick(data.gownId, { userAgent });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
