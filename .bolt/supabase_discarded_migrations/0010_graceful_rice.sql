/*
  # Verify Auth User and Update Password
  
  1. Verification
    - Check if user exists in auth.users
    - Log user status
  
  2. Password Update
    - Update password using pgcrypto functions
*/

DO $$ 
DECLARE
  user_record auth.users%ROWTYPE;
BEGIN
  -- Get user record
  SELECT * INTO user_record
  FROM auth.users
  WHERE email = 'wesche@outlook.com';

  -- Log user status
  RAISE NOTICE 'User status: %', CASE 
    WHEN user_record IS NULL THEN 'User not found'
    ELSE format(
      'Found user: id=%s, confirmed=%s, provider=%s',
      user_record.id,
      user_record.email_confirmed_at IS NOT NULL,
      user_record.raw_app_meta_data->>'provider'
    )
  END;

  -- If user exists, reset their password using pgcrypto
  IF user_record.id IS NOT NULL THEN
    UPDATE auth.users
    SET 
      encrypted_password = crypt('Test@12!', gen_salt('bf')),
      updated_at = now()
    WHERE id = user_record.id;
    
    RAISE NOTICE 'Password updated for user %', user_record.email;
  END IF;
END $$;