-- ============================================================================
-- Analytics Tables Migration
-- ============================================================================
-- This migration creates the analytics tables for tracking page views and 
-- gown clicks in Supabase (replacing Redis)
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Analytics: Page Views
-- ============================================================================
-- Tracks every page view on the website
-- Used for: Analytics dashboard, popular pages tracking

CREATE TABLE IF NOT EXISTS analytics_page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_agent TEXT
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_path ON analytics_page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON analytics_page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path_created ON analytics_page_views(path, created_at DESC);

-- ============================================================================
-- Analytics: Gown Clicks
-- ============================================================================
-- Tracks when users click on gown links (detail pages, related gowns, etc.)
-- Used for: Analytics dashboard, popular gowns tracking

CREATE TABLE IF NOT EXISTS analytics_gown_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gown_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_agent TEXT
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gown_clicks_gown_id ON analytics_gown_clicks(gown_id);
CREATE INDEX IF NOT EXISTS idx_gown_clicks_created_at ON analytics_gown_clicks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gown_clicks_gown_created ON analytics_gown_clicks(gown_id, created_at DESC);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
-- Enable RLS on both tables
ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_gown_clicks ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS Policies: Allow public insert for tracking
-- ============================================================================
-- These policies allow anonymous users to insert analytics events
-- (needed for tracking from the frontend)

CREATE POLICY "Allow public insert for page views" 
  ON analytics_page_views 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow public insert for gown clicks" 
  ON analytics_gown_clicks 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- ============================================================================
-- RLS Policies: Allow authenticated users (admins) to read
-- ============================================================================
-- These policies allow authenticated users to read analytics data
-- (needed for the admin dashboard)

CREATE POLICY "Allow authenticated read for page views" 
  ON analytics_page_views 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated read for gown clicks" 
  ON analytics_gown_clicks 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- ============================================================================
-- Optional: Add comments for documentation
-- ============================================================================

COMMENT ON TABLE analytics_page_views IS 'Tracks all page views on the website for analytics';
COMMENT ON COLUMN analytics_page_views.path IS 'URL path of the page viewed (e.g., /gown/123)';
COMMENT ON COLUMN analytics_page_views.user_agent IS 'Browser user agent string for device/browser tracking';
COMMENT ON COLUMN analytics_page_views.created_at IS 'Timestamp when the page view occurred';

COMMENT ON TABLE analytics_gown_clicks IS 'Tracks clicks on gown links for popularity metrics';
COMMENT ON COLUMN analytics_gown_clicks.gown_id IS 'Contentful ID of the gown that was clicked';
COMMENT ON COLUMN analytics_gown_clicks.user_agent IS 'Browser user agent string for device/browser tracking';
COMMENT ON COLUMN analytics_gown_clicks.created_at IS 'Timestamp when the click occurred';

-- ============================================================================
-- Data Retention (Optional)
-- ============================================================================
-- Uncomment if you want to automatically delete old analytics data
-- This example keeps 1 year of data

-- CREATE OR REPLACE FUNCTION cleanup_old_analytics() 
-- RETURNS void AS $$
-- BEGIN
--   DELETE FROM analytics_page_views WHERE created_at < NOW() - INTERVAL '1 year';
--   DELETE FROM analytics_gown_clicks WHERE created_at < NOW() - INTERVAL '1 year';
-- END;
-- $$ LANGUAGE plpgsql;

-- Schedule cleanup to run daily (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-analytics', '0 2 * * *', 'SELECT cleanup_old_analytics()');

-- ============================================================================
-- Verification Queries
-- ============================================================================
-- Run these after migration to verify everything is set up correctly:

-- Check tables exist:
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'analytics_%';

-- Check indexes:
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' AND tablename LIKE 'analytics_%';

-- Check RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'analytics_%';

-- Check policies:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd 
-- FROM pg_policies 
-- WHERE schemaname = 'public' AND tablename LIKE 'analytics_%';

