/*
  # Fix Auth Schema and Test User Setup

  1. Schema Updates
    - Ensures auth schema exists
    - Sets up proper permissions
  
  2. User Management
    - Creates or updates test user with proper password and metadata
    - Verifies user setup
*/

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Ensure proper permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;

-- Create function to handle user setup
CREATE OR REPLACE FUNCTION setup_test_user()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  test_user_id uuid;
BEGIN
  -- Check if user exists
  SELECT id INTO test_user_id
  FROM auth.users
  WHERE email = 'wesche@outlook.com';

  IF test_user_id IS NULL THEN
    -- Create new user if doesn't exist
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
    );
    RAISE NOTICE 'Created new test user';
  ELSE
    -- Update existing user
    UPDATE auth.users
    SET 
      encrypted_password = crypt('Test@12!', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb,
      raw_user_meta_data = '{"name":"Test User"}'::jsonb,
      updated_at = now()
    WHERE id = test_user_id;
    RAISE NOTICE 'Updated existing test user';
  END IF;
END;
$$;

-- Execute the function
SELECT setup_test_user();

-- Drop the function after use
DROP FUNCTION IF EXISTS setup_test_user();

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA auth TO postgres, service_role;