import React, { useState } from 'react';
import { waitlistService } from '@/services/waitlist.service';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export function GetStartedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsLoading(true);
    try {
      const result = await waitlistService.join({ name, email });
      setPosition(result.position);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            You're on the list!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in Self AI. You are #{position} on our waitlist.
          </p>
          <p className="text-gray-600">
            We'll notify you as soon as we're ready to welcome new users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Join the waitlist
        </h2>
        <p className="text-gray-600 mb-8">
          Be among the first to experience the future of AI-powered portfolio management.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <ErrorMessage message={error} />
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Join Waitlist'}
          </button>
        </form>
      </div>
    </div>
  );
}