import { useState, useEffect } from 'react';
import { runAuthDiagnostics } from '../debug/diagnostics';
import { authLogger } from '../debug/logger';

export function useAuthDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<{
    success: boolean;
    results: Record<string, boolean>;
    error?: unknown;
  } | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const results = await runAuthDiagnostics();
        setDiagnostics(results);
        
        if (!results.success) {
          authLogger.debug('Auth diagnostics failed:', results);
        }
      } catch (error) {
        authLogger.error(error);
        setDiagnostics({
          success: false,
          results: {
            connection: false,
            session: false,
            config: false
          },
          error
        });
      }
    }

    checkAuth();
  }, []);

  return diagnostics;
}