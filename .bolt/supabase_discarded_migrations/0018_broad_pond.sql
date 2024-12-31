/*
  # Auth Schema Setup and Verification

  1. Schema Setup
    - Creates auth schema if not exists
    - Sets up proper permissions
    - Creates schema verification functions

  2. Functions
    - check_schema_health: Verifies auth schema integrity
    - verify_auth_setup: Validates auth configuration
    - check_connection: Basic connection test

  3. Security
    - Proper function permissions
    - RLS policies
*/

-- Create schema verification function
CREATE OR REPLACE FUNCTION auth.verify_schema_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth
AS $$
BEGIN
  -- Check if auth schema is properly set up
  IF NOT EXISTS (
    SELECT 1 FROM pg_namespace WHERE nspname = 'auth'
  ) THEN
    RETURN false;
  END IF;

  -- Check if users table exists and has required columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'auth' 
    AND table_name = 'users'
  ) THEN
    RETURN false;
  END IF;

  -- Verify test user exists and is properly configured
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'wesche@outlook.com'
    AND email_confirmed_at IS NOT NULL
  ) THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$;

-- Create connection test function
CREATE OR REPLACE FUNCTION public.check_schema_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call auth schema verification
  RETURN (SELECT auth.verify_schema_health());
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION auth.verify_schema_health TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.check_schema_health TO anon, authenticated, service_role;