export class CoinbaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'CoinbaseError';
  }

  static fromResponse(response: Response): CoinbaseError {
    return new CoinbaseError(
      response.statusText,
      response.headers.get('CB-ERROR-CODE') || undefined,
      response.status
    );
  }
}

export class CoinbaseAuthError extends CoinbaseError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'CoinbaseAuthError';
  }
}

export class CoinbaseNetworkError extends CoinbaseError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'CoinbaseNetworkError';
  }
}