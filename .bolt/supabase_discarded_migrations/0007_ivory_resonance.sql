/*
  # Update Test User Password

  Updates the password for the test user account with proper encryption.

  1. Changes
    - Updates the encrypted password for the test user
    - Uses secure password hashing with bcrypt
*/

DO $$ 
BEGIN
  -- Update test user password with secure hashing
  UPDATE auth.users
  SET encrypted_password = crypt('Test12!Test', gen_salt('bf'))
  WHERE email = 'wesche@outlook.com';
END $$;