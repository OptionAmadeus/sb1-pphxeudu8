/*
  # Create Schema Migrations Table

  1. New Tables
    - `schema_migrations`
      - `version` (text, primary key) - Migration version identifier
      - `name` (text) - Migration name
      - `executed_at` (timestamptz) - When the migration was executed
  
  2. Security
    - Enable RLS on schema_migrations table
    - Add policy for authenticated users to read migrations
*/

-- Create migrations table
CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  name text NOT NULL,
  executed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE schema_migrations ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read migrations
CREATE POLICY "Authenticated users can read migrations"
  ON schema_migrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_schema_migrations_executed_at 
  ON schema_migrations(executed_at);