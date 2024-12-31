/*
  # Create Schema Migrations Table

  1. Changes
    - Creates schema_migrations table if it doesn't exist
    - Adds indexes for better query performance
  
  2. Purpose
    - Enables tracking of database migrations
    - Ensures synchronization between local and remote migrations
    - Prevents duplicate migrations from being applied

  Note: This is an idempotent operation - safe to run multiple times
*/

-- Create schema_migrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  name text NOT NULL,
  executed_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_schema_migrations_executed_at 
  ON schema_migrations(executed_at);

-- Insert record for migration 0007 that was already executed
INSERT INTO schema_migrations (version, name, executed_at)
VALUES ('0007', 'quiet_voice', now())
ON CONFLICT (version) DO NOTHING;