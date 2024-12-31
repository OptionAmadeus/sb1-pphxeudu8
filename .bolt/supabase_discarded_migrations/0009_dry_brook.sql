/*
  # Update User Password

  1. Changes
    - Updates password for user wesche@outlook.com
    - Uses proper password hashing with bcrypt
  
  2. Security
    - Uses secure password hashing
    - Executed within a transaction
*/

DO $$ 
BEGIN
  UPDATE auth.users
  SET encrypted_password = crypt('Test@12!', gen_salt('bf'))
  WHERE email = 'wesche@outlook.com'
  AND raw_app_meta_data->>'provider' = 'email';
END $$;