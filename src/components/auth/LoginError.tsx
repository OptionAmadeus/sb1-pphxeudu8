import React from 'react';
import { AlertCircle } from 'lucide-react';

interface LoginErrorProps {
  message: string;
}

export function LoginError({ message }: LoginErrorProps) {
  return (
    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
      <AlertCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}