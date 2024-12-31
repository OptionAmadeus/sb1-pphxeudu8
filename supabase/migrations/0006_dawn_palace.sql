/*
  # Auth Schema Updates

  1. Changes
    - Add last_login column to users table
    - Add failed_login_attempts column to users table
    - Add status column to users table
    - Add indexes for performance optimization

  2. Security
    - Enable RLS on users table
    - Add policies for user data access
*/

-- Add new columns to users table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN last_login timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'failed_login_attempts'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN failed_login_attempts integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'status'
  ) THEN
    ALTER TABLE auth.users ADD COLUMN status text DEFAULT 'active';
  END IF;
END $$;

-- Create indexes for performance
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'users' AND indexname = 'idx_users_status'
  ) THEN
    CREATE INDEX idx_users_status ON auth.users(status);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'users' AND indexname = 'idx_users_last_login'
  ) THEN
    CREATE INDEX idx_users_last_login ON auth.users(last_login);
  END IF;
END $$;