import { apiClient } from '../client';
import type { WaitlistEntry } from '@/types/auth';
import type { ApiResponse } from '../types';

export const waitlistApi = {
  join: (data: WaitlistEntry) =>
    apiClient.post<ApiResponse<{ position: number }>>('/waitlist', data),
    
  getPosition: (email: string) =>
    apiClient.get<ApiResponse<{ position: number }>>(`/waitlist/position/${email}`),
};