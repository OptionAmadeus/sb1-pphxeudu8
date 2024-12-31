import type { RegistrationData, ValidationErrors } from '@/types/auth';
import { validateEmail, validatePassword } from './common';

export function validateRegistrationData(data: RegistrationData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions';
  }

  return errors;
}