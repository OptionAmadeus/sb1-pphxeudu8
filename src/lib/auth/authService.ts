import { supabase } from '../supabase';
import type { LoginCredentials, User } from '@/types/auth';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);

      if (error) throw error;
      if (!data?.user) throw new Error('Login failed - no user data returned');

      return {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name || 'User',
        createdAt: new Date(data.user.created_at)
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
}

export const authService = new AuthService();