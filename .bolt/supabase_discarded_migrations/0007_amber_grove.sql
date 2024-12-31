/*
  # Add Monitoring and Health Check Functions

  1. New Functions
    - check_connection(): Simple health check function that returns true
    - get_waitlist_count(): Returns total count of waitlist entries

  2. Security
    - Grant execute permissions to anon and authenticated roles
    - Functions use SECURITY DEFINER to run with elevated privileges

  3. Purpose
    - Enable basic health monitoring
    - Provide safe access to waitlist statistics
*/

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