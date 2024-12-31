/*
  # Auth Schema and Functions Setup

  1. Schema Verification
    - Creates function to verify auth schema health
    - Adds public wrapper for schema health check
    - Sets up proper permissions

  2. Functions
    - verify_schema_health: Validates auth schema integrity
    - check_schema_health: Public wrapper for health check
    - check_connection: Basic connection test

  3. Security
    - Proper function permissions
    - Security definer settings
*/

-- Create schema verification function
CREATE OR REPLACE FUNCTION auth.verify_schema_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth
AS $$
BEGIN
  -- Check if auth schema exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_namespace WHERE nspname = 'auth'
  ) THEN
    RETURN false;
  END IF;

  -- Check if users table exists with required columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users'
    AND column_name IN ('id', 'email', 'encrypted_password', 'email_confirmed_at')
  ) THEN
    RETURN false;
  END IF;

  -- Verify test user exists and is confirmed
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

-- Create public wrapper function
CREATE OR REPLACE FUNCTION public.check_schema_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (SELECT auth.verify_schema_health());
END;
$$;

-- Create basic connection test
CREATE OR REPLACE FUNCTION public.check_connection()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN true;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION auth.verify_schema_health TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.check_schema_health TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.check_connection TO anon, authenticated, service_role;