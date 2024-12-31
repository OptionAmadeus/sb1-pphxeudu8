import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/authStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback, error, isLoading } = useAuthStore();

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get('code');
      if (!code) {
        navigate('/login');
        return;
      }

      try {
        const success = await handleOAuthCallback(code);
        if (success) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('OAuth callback failed:', err);
        navigate('/login', { replace: true });
      }
    }

    handleCallback();
  }, [searchParams, handleOAuthCallback, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} />
          <button
            onClick={() => navigate('/login')}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Login
          </button>
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