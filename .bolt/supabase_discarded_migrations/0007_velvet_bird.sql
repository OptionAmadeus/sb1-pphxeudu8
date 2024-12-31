/*
  # Update Test User Password

  1. Changes
    - Updates password for test user (wesche@outlook.com)
    
  2. Security
    - Uses secure password hashing with bcrypt
    - Executed as database owner for auth schema access
*/

DO $$ 
BEGIN
  UPDATE auth.users
  SET encrypted_password = crypt('Test12!Test', gen_salt('bf'))
  WHERE email = 'wesche@outlook.com';
END $$;