/*
  # Update Test User Password

  1. Changes
    - Updates password for test user account
    - Uses secure password hashing with bcrypt
  
  2. Security
    - Password is hashed using bcrypt
    - Only affects specific test account
*/

DO $$ 
BEGIN
  UPDATE auth.users
  SET encrypted_password = crypt('Test12!Test', gen_salt('bf'))
  WHERE email = 'wesche@outlook.com';
END $$;