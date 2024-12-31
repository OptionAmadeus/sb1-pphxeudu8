import { useState, useEffect } from 'react';
import { getSupabase } from '../client';

export function useSupabaseInit() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initSupabase() {
      try {
        await getSupabase();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Supabase'));
      }
    }

    initSupabase();
  }, []);

  return { isInitialized, error };
}