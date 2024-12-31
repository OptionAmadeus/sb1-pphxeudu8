import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface LoginButtonProps {
  isLoading: boolean;
}

export function LoginButton({ isLoading }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isLoading ? <LoadingSpinner size="sm" /> : 'Sign in'}
    </button>
  );
}