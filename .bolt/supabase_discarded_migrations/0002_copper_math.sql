/*
  # Create waitlist system

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `created_at` (timestamp)
      - `confirmed` (boolean)
      - `confirmation_token` (text)
      - `confirmation_sent_at` (timestamp)
      - `position` (integer)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public access to create entries
    - Add policy for authenticated users to read own data
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false,
  confirmation_token text UNIQUE,
  confirmation_sent_at timestamptz,
  position integer GENERATED ALWAYS AS IDENTITY
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public to create entries
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Allow users to read their own entries
CREATE POLICY "Users can view own entries" ON waitlist
  FOR SELECT USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Create index for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_confirmation_token ON waitlist(confirmation_token);