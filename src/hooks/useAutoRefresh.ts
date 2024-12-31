import { useEffect, useRef, useCallback } from 'react';

interface AutoRefreshConfig {
  onRefresh: () => Promise<void>;
  interval: number;
  enabled?: boolean;
}

export function useAutoRefresh({ onRefresh, interval, enabled = true }: AutoRefreshConfig) {
  const lastRefresh = useRef<Date>(new Date());
  const timeoutRef = useRef<NodeJS.Timeout>();

  const refresh = useCallback(async () => {
    if (!enabled) return;
    
    try {
      await onRefresh();
      lastRefresh.current = new Date();
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  }, [onRefresh, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Initial refresh
    refresh();

    // Set up interval
    timeoutRef.current = setInterval(refresh, interval);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [refresh, interval, enabled]);

  return { lastRefresh: lastRefresh.current, refresh };
}