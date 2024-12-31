import { authClient } from '@/lib/auth/client';
import type { StateCreator } from 'zustand';
import type { AuthState, AuthActions } from '@/types/auth';

export const createAuthActions: StateCreator<
  AuthState & AuthActions,
  [],
  [],
  AuthActions
> = (set) => ({
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authClient.signIn(credentials);
      if (!data?.user) {
        throw new Error('No user data returned');
      }
      
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
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
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
      set({ 
        error: error instanceof Error ? error.message : 'Logout failed'
      });
    }
  },

  setUser: (user) => set({ user, isAuthenticated: true }),
  clearError: () => set({ error: null })
});