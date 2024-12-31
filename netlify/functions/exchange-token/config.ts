export const COINBASE_CONFIG = {
  TOKEN_URL: 'https://api.coinbase.com/oauth/token',
  HEADERS: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  CORS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }
} as const;