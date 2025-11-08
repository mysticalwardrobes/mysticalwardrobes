-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- VOTING EVENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS voting_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'ended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- VOTING OPTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS voting_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES voting_events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- VOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES voting_events(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES voting_options(id) ON DELETE CASCADE,
  voter_email_hash TEXT NOT NULL,
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  UNIQUE(event_id, voter_email_hash)
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_voting_events_active ON voting_events(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_voting_events_status ON voting_events(status);
CREATE INDEX IF NOT EXISTS idx_voting_options_event ON voting_options(event_id);
CREATE INDEX IF NOT EXISTS idx_voting_options_order ON voting_options(event_id, display_order);
CREATE INDEX IF NOT EXISTS idx_votes_event ON votes(event_id);
CREATE INDEX IF NOT EXISTS idx_votes_option ON votes(option_id);
CREATE INDEX IF NOT EXISTS idx_votes_email ON votes(event_id, voter_email_hash);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE voting_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Voting Events Policies
CREATE POLICY "Public can view active events" 
  ON voting_events FOR SELECT 
  TO anon, authenticated 
  USING (is_active = true AND status = 'active');

CREATE POLICY "Authenticated can view all events" 
  ON voting_events FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated can insert events" 
  ON voting_events FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated can update events" 
  ON voting_events FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated can delete events" 
  ON voting_events FOR DELETE 
  TO authenticated 
  USING (true);

-- Voting Options Policies
CREATE POLICY "Public can view options for active events" 
  ON voting_options FOR SELECT 
  TO anon, authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM voting_events 
      WHERE id = voting_options.event_id 
      AND is_active = true 
      AND status = 'active'
    )
  );

CREATE POLICY "Authenticated can view all options" 
  ON voting_options FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated can insert options" 
  ON voting_options FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated can update options" 
  ON voting_options FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated can delete options" 
  ON voting_options FOR DELETE 
  TO authenticated 
  USING (true);

-- Votes Policies
CREATE POLICY "Public can insert votes" 
  ON votes FOR INSERT 
  TO anon 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM voting_events 
      WHERE id = votes.event_id 
      AND is_active = true 
      AND status = 'active'
      AND NOW() BETWEEN start_date AND end_date
    )
  );

CREATE POLICY "Authenticated can view all votes" 
  ON votes FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Public can view vote counts" 
  ON votes FOR SELECT 
  TO anon 
  USING (true);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to automatically deactivate other events when one is activated
CREATE OR REPLACE FUNCTION enforce_single_active_event()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    UPDATE voting_events 
    SET is_active = false 
    WHERE id != NEW.id AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce single active event
DROP TRIGGER IF EXISTS enforce_single_active_event_trigger ON voting_events;
CREATE TRIGGER enforce_single_active_event_trigger
  BEFORE INSERT OR UPDATE ON voting_events
  FOR EACH ROW
  WHEN (NEW.is_active = true)
  EXECUTE FUNCTION enforce_single_active_event();

-- Function to update event status based on dates
CREATE OR REPLACE FUNCTION update_event_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    IF NOW() < NEW.start_date THEN
      NEW.status = 'draft';
    ELSIF NOW() BETWEEN NEW.start_date AND NEW.end_date THEN
      NEW.status = 'active';
    ELSE
      NEW.status = 'ended';
      NEW.is_active = false;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update event status
DROP TRIGGER IF EXISTS update_event_status_trigger ON voting_events;
CREATE TRIGGER update_event_status_trigger
  BEFORE INSERT OR UPDATE ON voting_events
  FOR EACH ROW
  EXECUTE FUNCTION update_event_status();

