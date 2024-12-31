import { create } from 'zustand';
import { authClient } from '@/lib/supabase/auth/client';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authClient.signIn(credentials);
      
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata.name || 'User'
        },
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      console.error('Login error:', error);
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authClient.signOut();
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null 
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      set({ error: message });
    }
  },

  clearError: () => set({ error: null })
}));