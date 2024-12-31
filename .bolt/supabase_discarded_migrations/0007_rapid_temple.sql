/*
  # Add Schema Migrations Table

  1. New Tables
    - `schema_migrations`
      - `version` (text, primary key) - Migration version number
      - `name` (text) - Migration name
      - `executed_at` (timestamptz) - When migration was executed

  2. Purpose
    - Track database migration history
    - Enable migration version checking
    - Prevent duplicate migrations
*/

CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  name text NOT NULL,
  executed_at timestamptz DEFAULT now()
);

-- Insert existing migrations
INSERT INTO schema_migrations (version, name) VALUES
('0001', 'restless_band'),
('0002', 'copper_math'),
('0003', 'sparkling_smoke'),
('0004', 'still_violet'),
('0005', 'azure_swamp'),
('0006', 'noisy_feather'),
('0007', 'schema_migrations')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE schema_migrations ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view migrations
CREATE POLICY "Allow authenticated users to view migrations" 
  ON schema_migrations FOR SELECT 
  TO authenticated 
  USING (true);