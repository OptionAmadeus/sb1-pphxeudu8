import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_INFURA_ID: z.string().min(1),
  VITE_ENABLE_ANALYTICS: z.string().transform((val: string) => val === 'true'),
  VITE_ENABLE_MOCK_DATA: z.string().transform((val: string) => val === 'true'),
});

export type Environment = z.infer<typeof envSchema>;

export const config = {
  infuraId: import.meta.env.VITE_INFURA_ID,
  coinbaseConfig: {
    appName: import.meta.env.VITE_COINBASE_APP_NAME || 'Self AI',
    appLogoUrl: import.meta.env.VITE_COINBASE_APP_LOGO_URL,
    darkMode: false,
    defaultChainId: 1
  }
};

export function validateEnvironment(): Environment {
  try {
    return envSchema.parse({
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_INFURA_ID: import.meta.env.VITE_INFURA_ID,
      VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS,
      VITE_ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA,
    });
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment configuration');
  }
}

export const env = validateEnvironment();