import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Brain className="w-24 h-24 text-blue-600 animate-pulse" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Oops! My AI circuits can't find that page
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Even with all my artificial intelligence, I couldn't locate what you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1024"
        alt="AI Robot"
        className="mt-12 rounded-lg shadow-xl max-w-md w-full"
      />
    </div>
  );
}