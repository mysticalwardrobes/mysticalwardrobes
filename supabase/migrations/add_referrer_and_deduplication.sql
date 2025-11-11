-- ============================================================================
-- Add Referrer Column and Deduplication
-- ============================================================================
-- This migration adds the referrer column and implements session-based
-- deduplication to avoid recording duplicate page views from the same user
-- ============================================================================

-- Add referrer column to analytics_page_views
ALTER TABLE analytics_page_views 
ADD COLUMN IF NOT EXISTS referrer TEXT;

-- Add session_id for deduplication
ALTER TABLE analytics_page_views 
ADD COLUMN IF NOT EXISTS session_id TEXT;

-- Create index for fast session-based deduplication lookups
CREATE INDEX IF NOT EXISTS idx_page_views_session_path 
ON analytics_page_views(session_id, path, created_at DESC);

-- Add comment for documentation
COMMENT ON COLUMN analytics_page_views.referrer IS 'HTTP referer header - where the user came from';
COMMENT ON COLUMN analytics_page_views.session_id IS 'Session identifier for deduplication (prevents counting rapid refreshes)';

-- ============================================================================
-- Optional: Create a function to clean up duplicate entries (if any exist)
-- ============================================================================
-- This is optional - use if you want to clean up any duplicates that may have been created

-- CREATE OR REPLACE FUNCTION deduplicate_page_views() 
-- RETURNS INTEGER AS $$
-- DECLARE
--   deleted_count INTEGER;
-- BEGIN
--   -- Keep only the first view of each path within 5 minutes from the same session
--   WITH duplicates AS (
--     SELECT id,
--       ROW_NUMBER() OVER (
--         PARTITION BY session_id, path, DATE_TRUNC('minute', created_at)
--         ORDER BY created_at
--       ) as rn
--     FROM analytics_page_views
--     WHERE session_id IS NOT NULL
--   )
--   DELETE FROM analytics_page_views
--   WHERE id IN (
--     SELECT id FROM duplicates WHERE rn > 1
--   );
--   
--   GET DIAGNOSTICS deleted_count = ROW_COUNT;
--   RETURN deleted_count;
-- END;
-- $$ LANGUAGE plpgsql;

-- Run the deduplication (uncomment if needed):
-- SELECT deduplicate_page_views();

