import { supabase } from '../init';
import { AuthError } from './errors';
import type { LoginCredentials } from '@/types/auth';
import { authLogger } from '../debug/logger';

export class AuthService {
  async signIn(credentials: LoginCredentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        authLogger.error('Sign in failed:', error);
        throw AuthError.fromSupabaseError(error);
      }

      if (!data?.user) {
        throw new Error('No user data returned');
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      
      // Handle network/connection errors
      if (error instanceof Error && error.message.includes('fetch')) {
        throw new AuthError(
          'Unable to connect to authentication service. Please try again.',
          'CONNECTION_ERROR',
          503
        );
      }

      throw AuthError.fromSupabaseError(error);
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw AuthError.fromSupabaseError(error);
    } catch (error) {
      authLogger.error('Sign out error:', error);
      throw error instanceof AuthError ? error : AuthError.fromSupabaseError(error);
    }
  }
}