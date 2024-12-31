/*
  # Add Phone Authentication Support

  1. Changes
    - Add phone number fields to auth schema
    - Create phone verification table
    - Add verification functions and policies

  2. Security
    - Enable RLS for verification table
    - Add secure verification process
*/

-- Create phone verification table in public schema
CREATE TABLE IF NOT EXISTS public.phone_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  token text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '10 minutes'),
  UNIQUE(phone, token)
);

-- Enable RLS
ALTER TABLE public.phone_verification ENABLE ROW LEVEL SECURITY;

-- Add phone fields to auth.users via Supabase's auth schema
BEGIN;
  -- Only add columns if they don't exist
  DO $$ 
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'auth' 
                  AND table_name = 'users' 
                  AND column_name = 'phone') THEN
      ALTER TABLE auth.users ADD COLUMN phone text;
      ALTER TABLE auth.users ADD COLUMN phone_confirmed_at timestamptz;
    END IF;
  END $$;
COMMIT;

-- Create verification policy
CREATE POLICY "Enable insert access for all users" ON public.phone_verification
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create function to verify phone
CREATE OR REPLACE FUNCTION public.verify_phone(
  phone_number text,
  verification_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  matching_token public.phone_verification;
BEGIN
  -- Find and delete the verification record
  DELETE FROM public.phone_verification 
  WHERE phone = phone_number 
    AND token = verification_token
    AND expires_at > now()
  RETURNING * INTO matching_token;

  -- If found, update the user's phone verification status
  IF matching_token.id IS NOT NULL THEN
    UPDATE auth.users
    SET phone_confirmed_at = now()
    WHERE phone = phone_number;
    
    RETURN true;
  END IF;

  RETURN false;
END;
$$;