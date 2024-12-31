import { useState, useCallback } from 'react';
import type { ApiError } from '@/types/api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiCall: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async (...args: any[]) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      options.onError?.(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, options]);

  return { data, error, isLoading, execute };
}