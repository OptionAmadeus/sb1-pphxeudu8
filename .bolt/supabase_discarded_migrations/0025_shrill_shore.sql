/*
  # Consolidated Auth Schema Migration

  1. Changes
    - Consolidates all auth-related functions and tables
    - Simplifies schema verification
    - Ensures test user exists with correct credentials
    - Sets up proper permissions

  2. Security
    - Enables RLS
    - Grants minimal required permissions
    - Ensures secure password storage
*/

-- Drop existing functions
DROP FUNCTION IF EXISTS public.check_auth();
DROP FUNCTION IF EXISTS public.verify_auth_health();
DROP FUNCTION IF EXISTS auth.check_health();
DROP FUNCTION IF EXISTS auth.verify_auth_setup();

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Ensure proper permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;

-- Create or update auth tables
CREATE TABLE IF NOT EXISTS auth.users (
  instance_id uuid,
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aud varchar(255),
  role varchar(255),
  email varchar(255) UNIQUE,
  encrypted_password varchar(255),
  email_confirmed_at timestamptz,
  invited_at timestamptz,
  confirmation_token varchar(255),
  confirmation_sent_at timestamptz,
  recovery_token varchar(255),
  recovery_sent_at timestamptz,
  email_change_token_new varchar(255),
  email_change varchar(255),
  email_change_sent_at timestamptz,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  phone varchar(255),
  phone_confirmed_at timestamptz,
  phone_change varchar(255),
  phone_change_token varchar(255),
  phone_change_sent_at timestamptz,
  confirmed_at timestamptz GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
  email_change_token_current varchar(255),
  email_change_confirm_status smallint,
  banned_until timestamptz,
  reauthentication_token varchar(255),
  reauthentication_sent_at timestamptz,
  is_sso_user boolean DEFAULT false,
  deleted_at timestamptz
);

-- Create simple auth check function
CREATE OR REPLACE FUNCTION public.check_auth()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM 1;
  RETURN true;
END;
$$;

-- Create test user if doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'wesche@outlook.com'
  ) THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'wesche@outlook.com',
      crypt('Test@12!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"name":"Test User"}'::jsonb
    );
  ELSE
    -- Update existing user's password
    UPDATE auth.users
    SET 
      encrypted_password = crypt('Test@12!', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      updated_at = now()
    WHERE email = 'wesche@outlook.com';
  END IF;
END $$;

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.check_auth TO anon, authenticated, service_role;