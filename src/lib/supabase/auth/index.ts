import { AuthService } from './service';

export const authService = new AuthService();
export { AuthError } from './errors';
export type { LoginCredentials } from '@/types/auth';