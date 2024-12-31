/*
  # Add Monitoring and Health Check Features

  1. New Tables
    - connection_monitoring: Tracks database connection attempts and performance

  2. New Functions
    - check_connection(): Health check function
    - get_waitlist_count(): Safe way to get waitlist statistics

  3. Security
    - Enable RLS on monitoring table
    - Grant execute permissions to functions
    - Policies for monitoring table access
*/

-- Create connection monitoring table
CREATE TABLE IF NOT EXISTS connection_monitoring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz DEFAULT now(),
  success boolean NOT NULL,
  query_duration text,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE connection_monitoring ENABLE ROW LEVEL SECURITY;

-- Create health check function
CREATE OR REPLACE FUNCTION check_connection()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN true;
END;
$$;

-- Create waitlist count function
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total integer;
BEGIN
  SELECT COUNT(*) INTO total FROM waitlist;
  RETURN total;
END;
$$;

-- Grant access to the functions
GRANT EXECUTE ON FUNCTION check_connection TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_waitlist_count TO anon, authenticated;

-- Add monitoring policies
DO $$ BEGIN
  CREATE POLICY "Allow insert for all users" ON connection_monitoring
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow select for all users" ON connection_monitoring
    FOR SELECT TO anon, authenticated
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;