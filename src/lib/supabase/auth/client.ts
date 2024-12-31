import { supabase } from '../client';
import { AuthError } from './errors';
import type { LoginCredentials } from '@/types/auth';

class AuthClient {
  async signIn(credentials: LoginCredentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email.toLowerCase(),
        password: credentials.password
      });

      if (error) {
        throw AuthError.fromSupabaseError(error);
      }

      if (!data?.user) {
        throw new AuthError('No user data returned', 'AUTH_ERROR', 401);
      }

      return { data };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error instanceof AuthError ? error : AuthError.fromSupabaseError(error);
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw AuthError.fromSupabaseError(error);
  }
}

export const authClient = new AuthClient();