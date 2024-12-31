import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleOAuthCallback } from '@/lib/coinbase/auth';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    async function processCallback() {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          throw new Error('Missing required OAuth parameters');
        }

        const success = await handleOAuthCallback(code);
        if (success) {
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error('Authentication failed');
        }
      } catch (err) {
        console.error('OAuth callback failed:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setTimeout(() => navigate('/login', { replace: true }), 3000);
      }
    }

    processCallback();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} />
          <p className="mt-2 text-center text-gray-600">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Connecting your account...</p>
      </div>
    </div>
  );
}