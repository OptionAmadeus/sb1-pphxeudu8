import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
      <AlertCircle className="w-12 h-12 mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  );
}