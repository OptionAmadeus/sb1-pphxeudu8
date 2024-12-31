import { getSupabase } from '../supabase';
import { AuthError } from './errors';
import type { LoginCredentials } from '@/types/auth';

class AuthClient {
  async signIn(credentials: LoginCredentials) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) throw AuthError.fromSupabaseError(error);
    return { data };
  }

  async handleOAuthCallback(code: string) {
    try {
      const supabase = await getSupabase();
      
      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw AuthError.fromSupabaseError(error);
      
      // Verify we got user data
      if (!data?.user || !data?.session) {
        throw new Error('OAuth callback failed - incomplete user data');
      }

      // Set session in Supabase client
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      });

      return { 
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.error('OAuth callback failed:', error);
      throw AuthError.fromSupabaseError(error);
    }
  }

  async signOut() {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw AuthError.fromSupabaseError(error);
  }
}

export const authClient = new AuthClient();