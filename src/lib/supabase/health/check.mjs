import { supabase } from '../client.mjs';

export async function checkSupabaseHealth() {
  try {
    // Basic connection test
    const { error: connError } = await supabase
      .from('waitlist')
      .select('count')
      .limit(0);

    if (connError) {
      throw connError;
    }

    // Auth service test
    const { error: authError } = await supabase.auth.getSession();
    if (authError) {
      throw authError;
    }

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      message: 'All services operational'
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Service experiencing issues'
    };
  }
}