/*
  # Initial Database Setup
  
  1. Tables
    - Creates waitlist table for early access signups
  
  2. Security
    - Enables RLS
    - Adds policies for public access
*/

-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false,
  confirmation_token uuid DEFAULT gen_random_uuid(),
  confirmation_sent_at timestamptz,
  position serial
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for all users" ON public.waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for own entries" ON public.waitlist
  FOR SELECT TO anon, authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_confirmation_token ON public.waitlist(confirmation_token);