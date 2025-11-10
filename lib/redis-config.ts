import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Redis keys for analytics
 */
export const ANALYTICS_KEYS = {
  PAGE_VIEWS: (date: string) => `analytics:pageviews:${date}`,
  GOWN_CLICKS: (gownId: string) => `analytics:gown:${gownId}:clicks`,
  PAGE_PATH_VIEWS: (path: string) => `analytics:page:${path}:views`,
  POPULAR_GOWNS: 'analytics:popular:gowns',
  POPULAR_PAGES: 'analytics:popular:pages',
  TOTAL_VIEWS: 'analytics:total:views',
} as const;

/**
 * Track a page view
 */
export async function trackPageView(path: string): Promise<void> {
  try {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const pipeline = redis.pipeline();
    
    // Increment today's page views
    pipeline.incr(ANALYTICS_KEYS.PAGE_VIEWS(date));
    
    // Increment this specific page's views
    pipeline.incr(ANALYTICS_KEYS.PAGE_PATH_VIEWS(path));
    
    // Add to popular pages sorted set
    pipeline.zincrby(ANALYTICS_KEYS.POPULAR_PAGES, 1, path);
    
    // Increment total views
    pipeline.incr(ANALYTICS_KEYS.TOTAL_VIEWS);
    
    await pipeline.exec();
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Track a gown click
 */
export async function trackGownClick(gownId: string): Promise<void> {
  try {
    const pipeline = redis.pipeline();
    
    // Increment this gown's clicks
    pipeline.incr(ANALYTICS_KEYS.GOWN_CLICKS(gownId));
    
    // Add to popular gowns sorted set
    pipeline.zincrby(ANALYTICS_KEYS.POPULAR_GOWNS, 1, gownId);
    
    await pipeline.exec();
  } catch (error) {
    console.error('Error tracking gown click:', error);
  }
}

/**
 * Get analytics stats
 */
export async function getAnalyticsStats(days: number = 7) {
  try {
    const dates = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    // Get page views for each day
    const pageViewsPromises = dates.map(date =>
      redis.get<number>(ANALYTICS_KEYS.PAGE_VIEWS(date))
    );
    const pageViewsResults = await Promise.all(pageViewsPromises);
    const pageViewsByDate = dates.map((date, i) => ({
      date,
      views: pageViewsResults[i] || 0,
    }));

    // Get popular gowns (top 10)
    const popularGowns = await redis.zrange<string[]>(
      ANALYTICS_KEYS.POPULAR_GOWNS,
      0,
      9,
      { rev: true, withScores: true }
    );

    // Get popular pages (top 10)
    const popularPages = await redis.zrange<string[]>(
      ANALYTICS_KEYS.POPULAR_PAGES,
      0,
      9,
      { rev: true, withScores: true }
    );

    // Get total views
    const totalViews = await redis.get<number>(ANALYTICS_KEYS.TOTAL_VIEWS) || 0;

    // Format popular gowns and pages
    const formattedGowns = [];
    for (let i = 0; i < popularGowns.length; i += 2) {
      formattedGowns.push({
        gownId: popularGowns[i],
        clicks: parseInt(String(popularGowns[i + 1]) || '0'),
      });
    }

    const formattedPages = [];
    for (let i = 0; i < popularPages.length; i += 2) {
      formattedPages.push({
        path: popularPages[i],
        views: parseInt(String(popularPages[i + 1]) || '0'),
      });
    }

    return {
      pageViewsByDate,
      popularGowns: formattedGowns,
      popularPages: formattedPages,
      totalViews,
      todayViews: pageViewsByDate[pageViewsByDate.length - 1]?.views || 0,
    };
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    throw error;
  }
}

export { redis };

