/*
  # Add Connection Monitoring Functions

  1. New Functions
    - check_connection(): Simple health check function
    - get_waitlist_count(): Returns total waitlist count

  2. Security
    - Function execution grants for anon and authenticated roles
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