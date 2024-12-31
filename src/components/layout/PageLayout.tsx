import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageLayoutProps } from './types';

export function PageLayout({ children, showGetStarted = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showGetStarted={showGetStarted} />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}