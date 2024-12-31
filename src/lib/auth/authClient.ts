import { supabase } from '../supabase';
import { AuthError } from './errors';
import type { LoginCredentials } from '@/types/auth';

class AuthClient {
  async handleOAuthCallback(code: string) {
    try {
      // Get code verifier from session storage
      const codeChallenge = sessionStorage.getItem('code_challenge');
      if (!codeChallenge) {
        throw new Error('Missing code challenge');
      }
      sessionStorage.removeItem('code_challenge');

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('OAuth exchange error:', error);
        throw AuthError.fromSupabaseError(error);
      }

      if (!data?.user || !data?.session) {
        throw new Error('OAuth callback failed - incomplete user data');
      }

      // Set auth token in localStorage
      localStorage.setItem('sb-access-token', data.session.access_token);
      localStorage.setItem('sb-refresh-token', data.session.refresh_token);

      return { data };
    } catch (error) {
      console.error('OAuth callback failed:', error);
      throw error instanceof AuthError ? error : AuthError.fromSupabaseError(error);
    }
  }

  // ... rest of the client implementation
}

export const authClient = new AuthClient();