-- Create schema verification functions
CREATE OR REPLACE FUNCTION auth.verify_schema_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth
AS $$
BEGIN
  -- Verify auth.users table structure
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'auth' 
    AND table_name = 'users'
  ) THEN
    RETURN false;
  END IF;

  -- Verify required columns
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth'
    AND table_name = 'users'
    AND column_name IN ('id', 'email', 'encrypted_password', 'email_confirmed_at')
  ) THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$;

-- Create connection check function
CREATE OR REPLACE FUNCTION public.check_connection()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN true;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION auth.verify_schema_health TO service_role;
GRANT EXECUTE ON FUNCTION public.check_connection TO anon, authenticated, service_role;

-- Ensure test user exists and has correct password
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