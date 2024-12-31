import { supabase } from '../config';
import { authLogger } from './logger';

export async function runAuthDiagnostics() {
  const results = {
    connection: false,
    session: false,
    config: false
  };

  try {
    // Test connection
    const { error: connError } = await supabase.from('waitlist').select('count');
    results.connection = !connError;
    
    // Check session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      authLogger.error('Session check failed:', sessionError);
    }
    results.session = !sessionError && !!session;
    
    if (!session) {
      authLogger.debug('No active session found');
    } else {
      authLogger.debug('Session found:', {
        user: session.user.email,
        expires: new Date(session.expires_at!).toLocaleString()
      });
    }

    // Validate config
    const { error: configError } = await supabase.auth.getUser();
    results.config = !configError;

    return {
      success: Object.values(results).every(Boolean),
      results,
      sessionDetails: session ? {
        user: session.user.email,
        expires: new Date(session.expires_at!).toLocaleString()
      } : null
    };
  } catch (error) {
    authLogger.error('Auth diagnostics failed:', error);
    return {
      success: false,
      results,
      error
    };
  }
}