/*
  # Add User Profile Fields
  
  1. Changes
    - Adds display_name column to auth.users
    - Adds avatar_url column to auth.users
    - Creates index on display_name for performance
  
  2. Safety
    - Uses IF NOT EXISTS checks
    - Wrapped in transaction block
    - Idempotent operations
*/

BEGIN;

DO $$ 
BEGIN
  -- Add display_name column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'display_name'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN display_name text;
  END IF;

  -- Add avatar_url column if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN avatar_url text;
  END IF;

  -- Create index if not exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'auth' 
    AND tablename = 'users' 
    AND indexname = 'idx_users_display_name'
  ) THEN
    CREATE INDEX idx_users_display_name ON auth.users(display_name);
  END IF;
END $$;

COMMIT;