export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }

  static fromSupabaseError(error: any): AuthError {
    // Handle connection errors
    if (error.message?.includes('Failed to fetch') || 
        error.message?.includes('network')) {
      return new AuthError(
        'Unable to connect to authentication service. Please try again.',
        'CONNECTION_ERROR',
        503
      );
    }

    // Handle invalid credentials
    if (error.message?.includes('Invalid login credentials') || 
        error.code === 'invalid_credentials') {
      return new AuthError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        401
      );
    }

    // Handle missing credentials
    if (error.message?.includes('Email') || error.message?.includes('Password')) {
      return new AuthError(
        'Email and password are required',
        'MISSING_CREDENTIALS',
        400
      );
    }

    // Default error
    return new AuthError(
      'Authentication failed. Please try again.',
      'AUTH_ERROR',
      500
    );
  }
}