export class WaitlistError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'WaitlistError';
  }

  static fromSupabaseError(error: any): WaitlistError {
    if (error.code === '23505') {
      return new WaitlistError(
        'This email is already on the waitlist',
        'DUPLICATE_EMAIL',
        409
      );
    }

    if (error.message?.includes('Failed to fetch')) {
      return new WaitlistError(
        'Unable to connect to waitlist service',
        'CONNECTION_ERROR',
        503
      );
    }

    return new WaitlistError(
      error.message || 'Waitlist operation failed',
      error.code,
      error.status
    );
  }
}