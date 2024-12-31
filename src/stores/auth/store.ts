import { create } from 'zustand';
import type { AuthStore } from './types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Mock login for now
      if (credentials.email === 'wesche@outlook.com' && credentials.password === 'Test@12!') {
        set({
          user: {
            id: '1',
            email: credentials.email,
            name: 'Test User'
          },
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return true;
      }
      throw new Error('Invalid credentials');
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
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null })
}));