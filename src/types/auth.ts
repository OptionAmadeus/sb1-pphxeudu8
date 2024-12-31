export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends LoginCredentials {
  name: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}