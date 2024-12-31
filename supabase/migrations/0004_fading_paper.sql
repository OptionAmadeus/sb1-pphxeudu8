-- Enable RLS\nALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY
\n\n-- Drop existing policies if any\nDROP POLICY IF EXISTS "Enable insert for all users" ON public.waitlist
\nDROP POLICY IF EXISTS "Enable read for all users" ON public.waitlist
\n\n-- Create new policies\nCREATE POLICY "Enable insert for all users" \nON public.waitlist FOR INSERT \nWITH CHECK (true)
\n\nCREATE POLICY "Enable read for all users" \nON public.waitlist FOR SELECT \nUSING (true)
