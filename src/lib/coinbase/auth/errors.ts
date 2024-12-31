export class CoinbaseOAuthError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'CoinbaseOAuthError';
  }

  static invalidState(): CoinbaseOAuthError {
    return new CoinbaseOAuthError('Invalid OAuth state', 'INVALID_STATE');
  }

  static missingCodeVerifier(): CoinbaseOAuthError {
    return new CoinbaseOAuthError('Missing code verifier', 'MISSING_VERIFIER');
  }

  static tokenExchangeFailed(message?: string): CoinbaseOAuthError {
    return new CoinbaseOAuthError(
      message || 'Failed to exchange code for token',
      'TOKEN_ERROR'
    );
  }
}