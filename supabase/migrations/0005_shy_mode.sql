/*
  # Update Waitlist RLS Policies

  1. Changes
    - Enable RLS on waitlist table
    - Drop and recreate policies for better security
    - Add policies for insert and select operations

  2. Security
    - Allow anyone to insert into waitlist (for signups)
    - Allow anyone to read waitlist entries (for position checking)
    - Maintain data integrity with RLS
*/

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'waitlist' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies safely
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Enable insert for all users" ON public.waitlist;
  DROP POLICY IF EXISTS "Enable read for all users" ON public.waitlist;
  DROP POLICY IF EXISTS "Enable read for own entries" ON public.waitlist;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create new policies
CREATE POLICY "Enable insert for all users" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable read for all users" 
ON public.waitlist 
FOR SELECT 
USING (true);

-- Add helpful comment
COMMENT ON TABLE public.waitlist IS 'Stores waitlist entries with RLS enabled';