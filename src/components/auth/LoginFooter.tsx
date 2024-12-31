import React from 'react';
import { Link } from 'react-router-dom';

export function LoginFooter() {
  return (
    <div className="mt-6 text-center text-sm">
      <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
        Forgot your password?
      </Link>
    </div>
  );
}