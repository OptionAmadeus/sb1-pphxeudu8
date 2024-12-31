import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function RefreshButton({ onClick, isLoading }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      Refresh
    </button>
  );
}