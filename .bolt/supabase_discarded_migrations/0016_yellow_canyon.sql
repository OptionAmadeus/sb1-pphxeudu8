/*
  # Update test user credentials

  1. Changes
    - Update test user email to wesche@duck.com
    - Update test user password to Test@123!
  
  2. Security
    - Ensures email is confirmed
    - Updates password hash
*/

DO $$ 
BEGIN
  -- Update existing user if exists
  UPDATE auth.users
  SET 
    email = 'wesche@duck.com',
    encrypted_password = crypt('Test@123!', gen_salt('bf')),
    email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
  WHERE email = 'wesche@outlook.com';

  -- If no user was updated, create new one
  IF NOT FOUND THEN
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
      'wesche@duck.com',
      crypt('Test@123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"name":"Test User"}'::jsonb,
      now(),
      now()
    );
  END IF;
END $$;