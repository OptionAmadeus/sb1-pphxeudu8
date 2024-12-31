/*
  # Auth Schema Setup

  1. New Schema
    - Creates auth schema if not exists
  
  2. Tables
    - users: Core user authentication table
    - sessions: User session management
  
  3. Security
    - Enables RLS on all tables
    - Creates policies for user data access
    
  4. Indexes
    - Email lookup optimization
    - Session lookup optimization
*/

-- Enable auth schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  encrypted_password text,
  email_confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS auth.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- Users policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND schemaname = 'auth' 
    AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data" ON auth.users
      FOR SELECT USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND schemaname = 'auth' 
    AND policyname = 'Users can update own data'
  ) THEN
    CREATE POLICY "Users can update own data" ON auth.users
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- Create indexes (if they don't exist)
DO $$ 
BEGIN
  -- Users email index
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'auth' 
    AND tablename = 'users' 
    AND indexname = 'users_email_idx'
  ) THEN
    CREATE INDEX users_email_idx ON auth.users(email);
  END IF;

  -- Sessions user_id index
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'auth' 
    AND tablename = 'sessions' 
    AND indexname = 'sessions_user_id_idx'
  ) THEN
    CREATE INDEX sessions_user_id_idx ON auth.sessions(user_id);
  END IF;
END $$;