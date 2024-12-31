export class TokenExchangeError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'TokenExchangeError';
  }

  static fromResponse(response: Response, data: any): TokenExchangeError {
    return new TokenExchangeError(
      data.error_description || 'Token exchange failed',
      data.error,
      { status: response.status, data }
    );
  }
}