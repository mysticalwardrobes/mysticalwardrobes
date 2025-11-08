'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Track an analytics event
 */
export async function trackEvent(type: string, data: Record<string, any>) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience for analytics
    console.warn('Analytics tracking failed:', error);
  }
}

/**
 * Hook to automatically track page views
 */
export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }

    if (pathname) {
      trackEvent('page_view', { path: pathname });
    }
  }, [pathname]);
}

/**
 * Hook to track gown clicks
 */
export function useGownClickTracking() {
  const trackGownClick = useCallback((gownId: string) => {
    trackEvent('gown_click', { gownId });
  }, []);

  return trackGownClick;
}

/**
 * Combined analytics hook
 */
export function useAnalytics() {
  usePageTracking();

  return {
    trackGownClick: useGownClickTracking(),
    trackEvent,
  };
}

