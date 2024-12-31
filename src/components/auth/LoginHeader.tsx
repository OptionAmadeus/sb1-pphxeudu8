import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export function LoginHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Link to="/" className="flex justify-center mb-6">
        <Logo size="lg" />
      </Link>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{' '}
        <Link to="/get-started" className="font-medium text-blue-600 hover:text-blue-500">
          join our waitlist
        </Link>
      </p>
    </div>
  );
}