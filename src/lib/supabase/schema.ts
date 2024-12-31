import { getSupabase } from './client';
import { SupabaseError } from './errors';

export async function verifyDatabaseSetup() {
  try {
    const supabase = await getSupabase();

    // First verify basic connection
    const { data: connected, error: connError } = await supabase
      .rpc('check_connection');

    if (connError || !connected) {
      throw new SupabaseError(
        'Unable to connect to database',
        'CONNECTION_ERROR',
        500
      );
    }

    // Then verify auth schema
    const { data: verified, error: verifyError } = await supabase
      .rpc('verify_auth_schema');

    if (verifyError) {
      console.error('Schema verification failed:', verifyError);
      return false;
    }

    if (!verified) {
      console.error('Auth schema verification failed');
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof SupabaseError) {
      throw error;
    }
    throw new SupabaseError(
      'Failed to verify database setup',
      'SETUP_ERROR',
      500
    );
  }
}

// Initialize schema verification
verifyDatabaseSetup().catch(error => {
  console.error('Database setup verification failed:', error);
});