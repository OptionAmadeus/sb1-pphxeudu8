import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { HeaderProps } from './types';

export function Header({ showGetStarted = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          {showGetStarted && (
            <Link
              to="/get-started"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}