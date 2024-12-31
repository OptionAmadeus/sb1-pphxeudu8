import React from 'react';
import { useAuthSession } from '@/lib/supabase/hooks/useAuthSession';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useAuthSession();

  return <>{children}</>;
}