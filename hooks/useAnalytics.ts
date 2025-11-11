'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Get or create a session ID for analytics deduplication
 * Stored in sessionStorage to persist across page navigations in the same tab
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  const storageKey = 'analytics_session_id';
  let sessionId = sessionStorage.getItem(storageKey);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
}

/**
 * Track an analytics event
 */
export async function trackEvent(type: string, data: Record<string, any>) {
  try {
    // Add session ID for page views
    const eventData = type === 'page_view' 
      ? { ...data, sessionId: getSessionId() }
      : data;

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data: eventData }),
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience for analytics
    console.warn('Analytics tracking failed:', error);
  }
}

/**
 * Hook to automatically track page views with deduplication
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

