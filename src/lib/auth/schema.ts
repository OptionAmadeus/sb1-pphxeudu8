import { getSupabase } from '../supabase';
import { AuthError } from './errors';

export async function verifyAuthSchema(): Promise<boolean> {
  try {
    const supabase = await getSupabase();
    
    // First verify basic connection
    const { data: connected, error: connError } = await supabase
      .rpc('check_connection');

    if (connError || !connected) {
      throw new AuthError(
        'Unable to connect to database',
        'CONNECTION_ERROR',
        500
      );
    }

    // Then verify auth schema health
    const { data: healthy, error: healthError } = await supabase
      .rpc('verify_schema_health');

    if (healthError) {
      console.error('Schema health check failed:', healthError);
      return false;
    }

    return !!healthy;
  } catch (error) {
    console.error('Schema verification failed:', error);
    return false;
  }
}

// Initialize schema verification
verifyAuthSchema().catch(error => {
  console.error('Auth schema verification failed:', error);
});