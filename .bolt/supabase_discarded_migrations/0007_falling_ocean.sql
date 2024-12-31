/*
  # Update Test User Password

  1. Changes
    - Updates password for test user account
    - Uses secure password hashing with bcrypt
  
  2. Security
    - Password is properly hashed using bcrypt
    - Executed with proper security context
*/

DO $$ 
BEGIN
  -- Update test user password with secure hashing
  UPDATE auth.users
  SET encrypted_password = crypt('Test12!Test', gen_salt('bf'))
  WHERE email = 'wesche@outlook.com';
END $$;