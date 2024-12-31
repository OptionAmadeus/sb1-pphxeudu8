import { create } from 'zustand';
import type { AuthStore } from './types';
import { createAuthSlice } from './slice';

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...createAuthSlice(set, get)
}));