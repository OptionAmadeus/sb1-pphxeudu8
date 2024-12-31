import { z } from 'zod';

const configSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  clientSecret: z.string().min(1, 'Client secret is required'),
  redirectUri: z.string().url('Invalid redirect URI'),
  scopes: z.array(z.enum([
    'wallet:accounts:read',
    'wallet:transactions:read'
  ])).default(['wallet:accounts:read', 'wallet:transactions:read'])
});

export type CoinbaseConfig = z.infer<typeof configSchema>;

// Get the base URL for the current environment
const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    // Use the deployed URL in production
    return 'https://tryself.ai';
  }
  // Use localhost for development
  return 'http://localhost:5173';
};

export const COINBASE_CONFIG = configSchema.parse({
  clientId: import.meta.env.VITE_COINBASE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_COINBASE_CLIENT_SECRET,
  redirectUri: `${getBaseUrl()}/auth/callback`,
  scopes: ['wallet:accounts:read', 'wallet:transactions:read']
}) as const;