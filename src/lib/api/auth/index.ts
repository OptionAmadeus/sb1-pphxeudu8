import { apiClient } from '../client';
import type { LoginCredentials, RegistrationData, User } from '@/types/auth';
import type { ApiResponse } from '../types';

export const authApi = {
  login: (credentials: LoginCredentials) => 
    apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials),
    
  register: (data: RegistrationData) =>
    apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/register', data),
    
  logout: () => 
    apiClient.post('/auth/logout'),
    
  refreshToken: () =>
    apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh'),
};