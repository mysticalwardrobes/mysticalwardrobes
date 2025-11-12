import { supabaseAdmin } from './supabase';
import { client } from '@/app/api/config';

/**
 * Generate a session ID for deduplication
 * Uses a combination of timestamp and random string
 */
function generateSessionId(): string {
  // This will be passed from the client in a real implementation
  // For now, we'll generate it server-side
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Track a page view in Supabase with deduplication
 */
export async function trackPageView(
  path: string, 
  options?: { 
    userAgent?: string; 
    referrer?: string;
    sessionId?: string;
  }
): Promise<void> {
  try {
    const userAgent = options?.userAgent?.slice(0, 512) ?? null;
    const referrer = options?.referrer?.slice(0, 512) ?? null;
    const sessionId = options?.sessionId || generateSessionId();

    // Check for duplicate: same session, same path within last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { data: recentView } = await supabaseAdmin
      .from('analytics_page_views')
      .select('id')
      .eq('session_id', sessionId)
      .eq('path', path)
      .gte('created_at', fiveMinutesAgo)
      .limit(1)
      .single();

    // If we found a recent duplicate, skip insertion
    if (recentView) {
      console.log('Skipping duplicate page view:', { path, sessionId });
      return;
    }

    // Insert new page view
    const { error } = await supabaseAdmin
      .from('analytics_page_views')
      .insert({
        path,
        user_agent: userAgent,
        referrer,
        session_id: sessionId,
      });

    if (error) {
      console.error('Supabase page view tracking failed:', error);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Track a gown click in Supabase
 */
export async function trackGownClick(gownId: string, options?: { userAgent?: string }): Promise<void> {
  try {
    if (!gownId) {
      return;
    }

    const userAgent = options?.userAgent?.slice(0, 512) ?? null;

    const { error } = await supabaseAdmin
      .from('analytics_gown_clicks')
      .insert({
        gown_id: gownId,
        user_agent: userAgent,
      });

    if (error) {
      console.error('Supabase gown click tracking failed:', error);
    }
  } catch (error) {
    console.error('Error tracking gown click:', error);
  }
}

/**
 * Get analytics stats from Supabase
 */
export async function getAnalyticsStats(days: number = 7) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString();

    // Get page views by date
    const { data: pageViewsData, error: pageViewsError } = await supabaseAdmin
      .from('analytics_page_views')
      .select('created_at')
      .gte('created_at', startDateStr)
      .order('created_at', { ascending: true });

    if (pageViewsError) {
      throw pageViewsError;
    }

    // Group page views by date
    const viewsByDate = new Map<string, number>();
    const dates = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      return date.toISOString().split('T')[0];
    });

    // Initialize all dates with 0
    dates.forEach(date => viewsByDate.set(date, 0));

    // Count views per date
    pageViewsData?.forEach(view => {
      const date = new Date(view.created_at).toISOString().split('T')[0];
      viewsByDate.set(date, (viewsByDate.get(date) || 0) + 1);
    });

    const pageViewsByDate = dates.map(date => ({
      date,
      views: viewsByDate.get(date) || 0,
    }));

    // Get total views
    const { count: totalViews, error: totalViewsError } = await supabaseAdmin
      .from('analytics_page_views')
      .select('*', { count: 'exact', head: true });

    if (totalViewsError) {
      throw totalViewsError;
    }

    // Get today's views
    const today = new Date().toISOString().split('T')[0];
    const { count: todayViews, error: todayViewsError } = await supabaseAdmin
      .from('analytics_page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00Z`)
      .lt('created_at', `${today}T23:59:59Z`);

    if (todayViewsError) {
      throw todayViewsError;
    }

    // Get popular gowns (top 10)
    const { data: gownClicksData, error: gownClicksError } = await supabaseAdmin
      .from('analytics_gown_clicks')
      .select('gown_id')
      .gte('created_at', startDateStr);

    if (gownClicksError) {
      throw gownClicksError;
    }

    // Count clicks per gown
    const gownClickCounts = new Map<string, number>();
    gownClicksData?.forEach(click => {
      gownClickCounts.set(click.gown_id, (gownClickCounts.get(click.gown_id) || 0) + 1);
    });

    // Sort and get top 10
    const popularGowns = Array.from(gownClickCounts.entries())
      .map(([gownId, clicks]) => ({ gownId, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    // Fetch gown names from Contentful
    const gownIds = popularGowns.map(g => g.gownId);
    let gownsWithNames = popularGowns;
    
    if (gownIds.length > 0) {
      try {
        const gownsResponse = await client.getEntries({
          content_type: 'gown',
          'sys.id[in]': gownIds,
          limit: 100,
        });

        const gownNamesMap = new Map<string, string>();
        gownsResponse.items.forEach((item: any) => {
          const name = item.fields?.name;
          if (name && typeof name === 'string') {
            gownNamesMap.set(item.sys.id, name);
          }
        });

        gownsWithNames = popularGowns.map(g => ({
          gownId: g.gownId,
          gownName: gownNamesMap.get(g.gownId) || g.gownId,
          clicks: g.clicks,
        }));
      } catch (error) {
        console.error('Error fetching gown names from Contentful:', error);
        // Fallback to just IDs if fetching names fails
        gownsWithNames = popularGowns.map(g => ({
          gownId: g.gownId,
          gownName: g.gownId,
          clicks: g.clicks,
        }));
      }
    }

    // Get popular pages (top 10)
    const { data: pagePathData, error: pagePathError } = await supabaseAdmin
      .from('analytics_page_views')
      .select('path')
      .gte('created_at', startDateStr);

    if (pagePathError) {
      throw pagePathError;
    }

    // Count views per path
    const pagePathCounts = new Map<string, number>();
    pagePathData?.forEach(view => {
      pagePathCounts.set(view.path, (pagePathCounts.get(view.path) || 0) + 1);
    });

    // Sort and get top 10
    const popularPages = Array.from(pagePathCounts.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return {
      pageViewsByDate,
      popularGowns: gownsWithNames,
      popularPages,
      totalViews: totalViews || 0,
      todayViews: todayViews || 0,
    };
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    throw error;
  }
}

/**
 * Legacy export for backwards compatibility (will be removed)
 * @deprecated Use trackGownClick instead
 */
export const recordGownClick = trackGownClick;
