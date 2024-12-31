import { useEffect, useState } from 'react';
import { validateSupabaseConnection, validateAuthConfig } from '../validation';

export function useSupabaseConfig() {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function validateConfig() {
      try {
        // Check connection
        const isConnected = await validateSupabaseConnection();
        if (!isConnected) {
          throw new Error('Please click "Connect to Supabase" to set up your project.');
        }

        // Validate auth configuration
        const authConfig = await validateAuthConfig();
        if (!authConfig.isValid) {
          throw new Error(authConfig.error?.message || 'Invalid authentication configuration');
        }

        setIsValid(true);
        setError(null);
      } catch (err) {
        setIsValid(false);
        setError(err instanceof Error ? err.message : 'Configuration validation failed');
        console.error('Supabase configuration error:', err);
      }
    }

    validateConfig();
  }, []);

  return { isValid, error };
}