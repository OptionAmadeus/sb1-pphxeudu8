/*
  # Add Waitlist Email Confirmation

  1. Changes
    - Add confirmation_status enum type
    - Add confirmation fields to waitlist table
    - Add function to generate confirmation tokens
    - Add function to handle email confirmations
  
  2. Security
    - Add policy for confirming email addresses
*/

-- Create confirmation status enum
CREATE TYPE confirmation_status AS ENUM ('pending', 'confirmed', 'expired');

-- Add confirmation fields to waitlist table
ALTER TABLE waitlist 
  ADD COLUMN IF NOT EXISTS confirmation_status confirmation_status DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS confirmation_token uuid DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS confirmation_expires_at timestamptz DEFAULT (now() + interval '24 hours');

-- Function to handle email confirmation
CREATE OR REPLACE FUNCTION confirm_waitlist_email(token uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE waitlist
  SET confirmation_status = 'confirmed'
  WHERE confirmation_token = token
    AND confirmation_status = 'pending'
    AND confirmation_expires_at > now();
    
  RETURN FOUND;
END;
$$;

-- Allow public access to confirmation function
GRANT EXECUTE ON FUNCTION confirm_waitlist_email TO anon;