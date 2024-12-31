/*
  # Add Test User

  1. Changes
    - Add test user with email wesche@outlook.com
    - Set up password and metadata
    - Ensure idempotent insertion
*/

-- Create test user with proper auth schema fields
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
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'wesche@outlook.com',
  crypt('Test@12!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'wesche@outlook.com'
);