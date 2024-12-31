export const COINBASE_CONFIG = {
  clientId: import.meta.env.VITE_COINBASE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_COINBASE_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_COINBASE_REDIRECT_URI,
  scopes: ['wallet:accounts:read', 'wallet:transactions:read']
} as const;

export function generateOAuthUrl(): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: COINBASE_CONFIG.clientId,
    redirect_uri: COINBASE_CONFIG.redirectUri,
    scope: COINBASE_CONFIG.scopes.join(' '),
    state: crypto.randomUUID() // Prevent CSRF attacks
  });

  return `https://www.coinbase.com/oauth/authorize?${params.toString()}`;
}