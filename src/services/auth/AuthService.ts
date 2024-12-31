import { getSupabase, resetSupabase } from '@/lib/supabase';
import { AuthError } from '@/lib/auth/errors';
import type { LoginCredentials, User } from '@/types/auth';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const supabase = await getSupabase();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        if (error.message?.includes('schema') || error.status === 500) {
          resetSupabase();
        }
        throw AuthError.fromSupabaseError(error);
      }

      if (!data?.user) {
        throw new AuthError('Login failed - no user data returned');
      }

      return {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name || 'User',
        createdAt: new Date(data.user.created_at)
      };
    } catch (error) {
      if (error instanceof AuthError) throw error;
      throw AuthError.fromSupabaseError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signOut();
      
      if (error) throw AuthError.fromSupabaseError(error);
    } finally {
      resetSupabase();
    }
  }
}