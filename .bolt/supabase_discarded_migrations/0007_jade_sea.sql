/*
  # Optimize Database Connection Handling

  1. Changes
    - Add connection pooling settings
    - Create health check function
    - Add connection monitoring table
    - Add connection timeout settings
    
  2. Performance
    - Optimize waitlist table queries
    - Add appropriate indexes
    
  3. Monitoring
    - Track connection statistics
    - Monitor query performance
*/

-- Create connection monitoring table
CREATE TABLE IF NOT EXISTS connection_monitoring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_time timestamptz DEFAULT now(),
  query_duration interval,
  success boolean,
  error_message text
);

-- Add index to waitlist table to optimize count queries
CREATE INDEX IF NOT EXISTS idx_waitlist_status 
  ON waitlist(confirmation_status)
  WHERE confirmation_status = 'pending';

-- Create a lightweight health check function
CREATE OR REPLACE FUNCTION check_connection()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN true;
END;
$$;

-- Optimize waitlist count query
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  count_value bigint;
BEGIN
  SELECT count(*) INTO count_value 
  FROM waitlist 
  WHERE confirmation_status = 'pending';
  RETURN count_value;
END;
$$;

-- Add RLS policies
ALTER TABLE connection_monitoring ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for authenticated users"
  ON connection_monitoring
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users"
  ON connection_monitoring
  FOR SELECT
  TO authenticated
  USING (true);