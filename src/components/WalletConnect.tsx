import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { initializeOAuthFlow } from '@/lib/coinbase/auth';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function WalletConnect() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await initializeOAuthFlow();
    } catch (error) {
      console.error('Failed to initialize OAuth flow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? (
        <LoadingSpinner size="sm" />
      ) : (
        <Wallet className="w-5 h-5" />
      )}
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}