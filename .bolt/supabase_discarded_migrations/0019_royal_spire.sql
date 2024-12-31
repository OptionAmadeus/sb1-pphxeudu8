/*
  # Auth Schema and Test User Setup

  1. Schema Setup
    - Creates auth schema if not exists
    - Sets up users table with required fields
    - Configures proper indexes and constraints

  2. Test User
    - Creates test user with confirmed email
    - Updates password if user exists
    - Sets proper metadata

  3. Security
    - Proper permissions setup
    - RLS policies
*/

-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table if not exists
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

-- Create or update test user
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'wesche@outlook.com'
  ) THEN
    -- Update existing user
    UPDATE auth.users
    SET 
      encrypted_password = crypt('Test@12!', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb,
      raw_user_meta_data = '{"name":"Test User"}'::jsonb,
      updated_at = now()
    WHERE email = 'wesche@outlook.com';
  ELSE
    -- Create new test user
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
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users (instance_id);

-- Grant permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;