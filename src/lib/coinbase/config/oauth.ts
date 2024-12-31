import { z } from 'zod';

// Environment-specific redirect URI configuration
function getRedirectUri(): string {
  if (import.meta.env.PROD) {
    return 'https://tryself.ai/auth/callback';
  }
  if (window.location.hostname.includes('stackblitz.io')) {
    return `${window.location.origin}/auth/callback`;
  }
  return 'http://localhost:5173/auth/callback';
}

// Validate OAuth configuration
const oauthConfigSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  redirectUri: z.string().url('Invalid redirect URI'),
  endpoints: z.object({
    auth: z.string().url(),
    token: z.string().url()
  }),
  scopes: z.array(z.string()).min(1)
});

// Export validated configuration
export const OAUTH_CONFIG = oauthConfigSchema.parse({
  clientId: import.meta.env.VITE_COINBASE_CLIENT_ID || 'f9ea95af-876c-4a33-9230-bed617584e83',
  redirectUri: import.meta.env.VITE_COINBASE_REDIRECT_URI || getRedirectUri(),
  endpoints: {
    auth: 'https://www.coinbase.com/oauth/authorize',
    token: 'https://api.coinbase.com/oauth/token'
  },
  scopes: ['wallet:accounts:read', 'wallet:transactions:read']
});