import { env } from './environment';

export const FEATURES = {
  analytics: {
    enabled: env.VITE_ENABLE_ANALYTICS,
  },
  mockData: {
    enabled: env.VITE_ENABLE_MOCK_DATA,
  },
} as const;