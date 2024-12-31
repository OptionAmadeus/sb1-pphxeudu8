import axios from 'axios';
import type { ApiError } from '@/types/api';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      code: error.response?.data?.code,
      details: error.response?.data?.details
    };
    return Promise.reject(apiError);
  }
);