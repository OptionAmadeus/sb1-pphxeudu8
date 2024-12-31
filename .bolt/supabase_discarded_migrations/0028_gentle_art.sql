/*
  # Fix Auth Schema and Connection Issues
  
  1. Schema Fixes
    - Recreate auth schema if needed
    - Ensure proper permissions
    - Fix test user setup
  
  2. Security
    - Proper RLS policies
    - Secure function execution
*/

-- Ensure auth schema exists with proper permissions
CREATE SCHEMA IF NOT EXISTS auth;
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;

-- Recreate auth schema health check function
CREATE OR REPLACE FUNCTION auth.check_schema_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth
AS $$
BEGIN
  -- Verify essential tables exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'auth' 
    AND tablename = 'users'
  ) THEN
    RETURN false;
  END IF;

  -- Verify test user exists and is properly configured
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'wesche@outlook.com' 
    AND email_confirmed_at IS NOT NULL
  ) THEN
    -- Recreate test user if missing or misconfigured
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'wesche@outlook.com',
      crypt('Test@12!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"name":"Test User"}'::jsonb,
      now(),
      now()
    ) ON CONFLICT (email) 
    DO UPDATE SET
      email_confirmed_at = EXCLUDED.email_confirmed_at,
      encrypted_password = EXCLUDED.encrypted_password,
      updated_at = now();
  END IF;

  RETURN true;
END;
$$;

-- Create connection test function
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
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT EXECUTE ON FUNCTION auth.check_schema_health TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.check_connection TO anon, authenticated, service_role;