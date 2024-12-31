import React from 'react';
import { Logo } from '../ui/Logo';
import { Link } from 'react-router-dom';

export function GetStartedHero() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}