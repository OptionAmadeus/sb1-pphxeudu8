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
    // Log the full error in development
    if (import.meta.env.DEV) {
      console.error('Full auth error:', error);
    }

    // Handle schema/setup errors
    if (error.code === 'HEALTH_CHECK_FAILED' || 
        error.message?.includes('schema') ||
        error.message?.includes('unexpected_failure')) {
      return new AuthError(
        'Service temporarily unavailable. Please try again in a few minutes.',
        'TEMPORARY_OUTAGE',
        500
      );
    }

    // Handle invalid credentials
    if (error.status === 400 || error.status === 401) {
      return new AuthError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        401
      );
    }

    // Handle other errors
    return new AuthError(
      error.message || 'Authentication failed',
      error.code,
      error.status
    );
  }
}