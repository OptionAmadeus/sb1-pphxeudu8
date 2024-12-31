export const COINBASE_CONSTANTS = {
  AUTH_ENDPOINT: 'https://www.coinbase.com/oauth/authorize',
  TOKEN_ENDPOINT: 'https://api.coinbase.com/oauth/token',
  API_ENDPOINT: 'https://api.coinbase.com/v2',
  DEFAULT_LOCALE: 'en',
  SCOPES: ['wallet:accounts:read', 'wallet:transactions:read'] as const
} as const;