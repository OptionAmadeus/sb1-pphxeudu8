export class AuthError extends Error {
  constructor(
    message: string = 'Authentication failed',
    public code?: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}