/*
  # Fix Auth Schema and User Setup

  1. Changes
    - Verify and create/update test user
    - Ensure proper user metadata and confirmation
  
  2. Security
    - Set secure password for test user
    - Update auth metadata
*/

DO $$ 
DECLARE
  user_exists boolean;
  user_id uuid;
  user_email text;
  is_confirmed boolean;
  provider text;
BEGIN
  -- Check if test user exists
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'wesche@outlook.com'
  ) INTO user_exists;

  -- If user doesn't exist, create them
  IF NOT user_exists THEN
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
    RAISE NOTICE 'Created test user';
  ELSE
    -- Update existing user's password and metadata
    UPDATE auth.users
    SET 
      encrypted_password = crypt('Test@12!', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      raw_app_meta_data = COALESCE(raw_app_meta_data, '{"provider":"email","providers":["email"]}'::jsonb),
      raw_user_meta_data = COALESCE(raw_user_meta_data, '{"name":"Test User"}'::jsonb),
      updated_at = now()
    WHERE email = 'wesche@outlook.com';
    RAISE NOTICE 'Updated test user';
  END IF;

  -- Verify user status (store in separate variables)
  SELECT 
    id,
    email,
    email_confirmed_at IS NOT NULL,
    raw_app_meta_data->>'provider'
  INTO
    user_id,
    user_email,
    is_confirmed,
    provider
  FROM auth.users
  WHERE email = 'wesche@outlook.com';

  -- Log verification details
  RAISE NOTICE 'User verification:';
  RAISE NOTICE 'ID: %', user_id;
  RAISE NOTICE 'Email: %', user_email;
  RAISE NOTICE 'Confirmed: %', is_confirmed;
  RAISE NOTICE 'Provider: %', provider;

END $$;