import { apiClient } from '@/lib/api/client';
import { ApiError, NetworkError } from '@/lib/api/errors';
import type { ApiResponse } from '@/lib/api/types';

export class ApiService {
  protected async get<T>(url: string): Promise<T> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url);
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        throw ApiError.fromResponse(error.response);
      }
      throw new NetworkError(error.message);
    }
  }

  protected async post<T>(url: string, data?: unknown): Promise<T> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data);
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        throw ApiError.fromResponse(error.response);
      }
      throw new NetworkError(error.message);
    }
  }
}