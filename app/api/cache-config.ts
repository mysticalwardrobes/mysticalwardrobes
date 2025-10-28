/**
 * Centralized cache configuration for all API routes
 * 
 * This file contains all caching-related constants and types
 * to ensure consistent cache behavior across the application.
 */

import { client } from './config';

// ============================================================================
// CACHE DURATIONS
// ============================================================================

/**
 * Server-side in-memory cache duration for gowns and addons (5 minutes)
 * After this time, data will be refetched from Contentful
 */
export const CACHE_DURATION = 120 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Server-side in-memory cache duration for promqueens (15 minutes)
 * Longer duration since promqueens data changes less frequently
 */
export const PROMQUEENS_CACHE_DURATION = 120 * 60 * 1000; // 1 hour in milliseconds

/**
 * Server-side in-memory cache duration for custom made gowns (30 minutes)
 * Custom gowns are created less frequently than rental gowns, so longer cache duration is appropriate
 * This reduces API calls to Contentful while ensuring custom gown portfolio stays reasonably fresh
 */
export const CUSTOM_MADE_GOWNS_CACHE_DURATION = 120 * 60 * 1000; // 30 minutes in milliseconds

/**
 * ISR (Incremental Static Regeneration) revalidation time (1 hour)
 * Controls how often Next.js regenerates static pages
 */
export const REVALIDATE_TIME = 3600; // 1 hour in seconds

/**
 * Browser/CDN cache control header settings
 */
export const CACHE_CONTROL_HEADER = 'public, s-maxage=300, stale-while-revalidate=600';

// ============================================================================
// CACHE TYPES
// ============================================================================

/**
 * Type for Contentful entries response (getEntries)
 * Used for list endpoints (gowns, addons)
 */
export type ContentfulEntriesResponse = Awaited<ReturnType<typeof client.getEntries>>;

/**
 * Type for Contentful entry response (getEntry)
 * Used for detail endpoints (individual gown/addon)
 */
export type ContentfulEntryResponse = Awaited<ReturnType<typeof client.getEntry>>;

/**
 * Generic cache entry structure
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// ============================================================================
// CACHE UTILITIES
// ============================================================================

/**
 * Check if a cache entry is still valid
 * @param timestamp - The timestamp when the cache was created
 * @param duration - Cache duration in milliseconds (defaults to CACHE_DURATION)
 * @returns true if cache is still valid, false otherwise
 */
export function isCacheValid(timestamp: number, duration: number = CACHE_DURATION): boolean {
  return Date.now() - timestamp < duration;
}

/**
 * Get cache age in seconds
 * @param timestamp - The timestamp when the cache was created
 * @returns Age of cache in seconds
 */
export function getCacheAge(timestamp: number): number {
  return Math.floor((Date.now() - timestamp) / 1000);
}

/**
 * Get time until cache expires in seconds
 * @param timestamp - The timestamp when the cache was created
 * @param duration - Cache duration in milliseconds (defaults to CACHE_DURATION)
 * @returns Seconds until cache expires
 */
export function getCacheExpiry(timestamp: number, duration: number = CACHE_DURATION): number {
  return Math.floor((duration - (Date.now() - timestamp)) / 1000);
}

/**
 * Apply cache headers to a NextResponse
 * @param response - The NextResponse object to add headers to
 */
export function applyCacheHeaders(response: Response): void {
  response.headers.set('Cache-Control', CACHE_CONTROL_HEADER);
}

