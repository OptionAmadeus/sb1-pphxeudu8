import { TEST_USER } from './constants';
import type { LoginCredentials } from '@/types/auth';

export function validateTestCredentials(credentials: LoginCredentials): boolean {
  return (
    credentials.email === TEST_USER.email && 
    credentials.password === TEST_USER.password
  );
}

export function getTestUserData() {
  return {
    id: TEST_USER.id,
    email: TEST_USER.email,
    name: TEST_USER.name
  };
}