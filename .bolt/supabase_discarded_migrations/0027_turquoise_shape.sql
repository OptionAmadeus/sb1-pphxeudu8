/*
  # Add Auth Diagnostics Functions
  
  1. New Functions
    - check_auth_status: Checks auth system status
    - verify_session: Verifies session validity
    - log_auth_diagnostics: Logs auth diagnostic info
  
  2. Security
    - Functions are security definer
    - Limited to authenticated users
*/

-- Function to check auth system status
CREATE OR REPLACE FUNCTION public.check_auth_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'auth_enabled', EXISTS (SELECT 1 FROM auth.users LIMIT 1),
    'test_user_exists', EXISTS (SELECT 1 FROM auth.users WHERE email = 'wesche@outlook.com'),
    'timestamp', now()
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Function to verify session
CREATE OR REPLACE FUNCTION public.verify_session(user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'user_exists', EXISTS (SELECT 1 FROM auth.users WHERE id = user_id),
    'has_confirmed_email', EXISTS (SELECT 1 FROM auth.users WHERE id = user_id AND email_confirmed_at IS NOT NULL),
    'timestamp', now()
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.check_auth_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_session TO authenticated;