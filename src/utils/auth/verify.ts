import { supabase } from '@/lib/supabase';

export async function verifyAuthService() {
  try {
    // Step 1: Check basic connection
    const { data: connected, error: connError } = await supabase
      .rpc('check_auth');

    if (connError || !connected) {
      throw new Error('Failed to connect to authentication service');
    }

    // Step 2: Verify auth schema health
    const { data: healthy, error: healthError } = await supabase
      .rpc('verify_auth_health');

    if (healthError || !healthy) {
      throw new Error('Authentication service schema verification failed');
    }

    // Step 3: Test authentication with known credentials
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: 'wesche@outlook.com',
      password: 'Test@12!'
    });

    if (authError) {
      throw authError;
    }

    if (!data?.user) {
      throw new Error('Authentication successful but no user data returned');
    }

    // Step 4: Sign out to clean up
    await supabase.auth.signOut();

    return {
      status: 'healthy',
      message: 'Authentication service is active and working correctly'
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
}