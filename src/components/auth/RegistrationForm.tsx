import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { validateRegistrationData } from '../../utils/validation';
import type { RegistrationData, ValidationErrors } from '../../types/auth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function RegistrationForm() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRegistrationData(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          } focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          } focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.password ? 'border-red-300' : 'border-gray-300'
          } focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
          } focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
          I accept the <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="mt-2 text-sm text-red-600">{errors.acceptTerms}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? <LoadingSpinner /> : 'Create Account'}
      </button>
    </form>
  );
}