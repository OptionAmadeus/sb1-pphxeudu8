/*
  # Add Test User
  
  Creates a test user account for development:
  - Email: test@example.com
  - Password: Test123!
*/

DO $$ 
BEGIN
  -- Create test user if doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'test@example.com'
  ) THEN
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      gen_random_uuid(),
      'test@example.com',
      crypt('Test123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"name":"Test User"}'::jsonb
    );
  END IF;
END $$;