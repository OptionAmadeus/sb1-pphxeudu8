import type { User } from '@/types/auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  handleOAuthCallback: (code: string) => Promise<boolean>;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;