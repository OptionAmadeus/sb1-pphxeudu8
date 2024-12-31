export const OAUTH_ENDPOINTS = {
  AUTH: 'https://www.coinbase.com/oauth/authorize',
  TOKEN: 'https://api.coinbase.com/oauth/token'
} as const;

export const OAUTH_SCOPES = [
  'wallet:accounts:read',
  'wallet:transactions:read'
] as const;

export const OAUTH_STORAGE_KEYS = {
  STATE: 'oauth_state',
  CODE_VERIFIER: 'oauth_code_verifier'
} as const;