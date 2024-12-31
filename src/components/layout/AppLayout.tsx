import React from 'react';
import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';
import { AuthFooter } from './AuthFooter';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <AppMain />
      <AuthFooter />
    </div>
  );
}