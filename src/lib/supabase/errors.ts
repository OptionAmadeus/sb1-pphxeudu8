export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'SupabaseError';
  }

  static fromSupabaseError(error: any): SupabaseError {
    if (error.message?.includes('Invalid API key')) {
      return new SupabaseError(
        'Invalid Supabase configuration. Please check your environment variables.',
        'INVALID_CONFIG',
        401
      );
    }

    if (error.message?.includes('JWT')) {
      return new SupabaseError(
        'Session expired. Please sign in again.',
        'SESSION_EXPIRED',
        401
      );
    }

    return new SupabaseError(
      error.message || 'An unexpected error occurred',
      error.code,
      error.status
    );
  }
}