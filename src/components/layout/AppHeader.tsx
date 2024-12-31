import React from 'react';
import { useAuthStore } from '../../stores/auth';
import { Logo } from '../ui/Logo';

export function AppHeader() {
  const { logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={logout}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}