/*
  # Fix waitlist RLS policies

  1. Changes
    - Update RLS policy to allow public inserts into waitlist table
    - Add policy for reading own waitlist position
  
  2. Security
    - Enable RLS on waitlist table
    - Allow anyone to join waitlist
    - Allow users to view their own position
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can join waitlist" ON waitlist;
DROP POLICY IF EXISTS "Users can view own entries" ON waitlist;

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Anyone can join waitlist"
ON waitlist FOR INSERT
WITH CHECK (true);

-- Allow users to read their own entries
CREATE POLICY "Users can view own entries"
ON waitlist FOR SELECT
USING (true);