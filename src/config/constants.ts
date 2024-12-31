// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3,
} as const;

// Web3 Configuration
export const WEB3_CONFIG = {
  infuraId: import.meta.env.VITE_INFURA_ID,
  coinbaseConfig: {
    appName: import.meta.env.VITE_COINBASE_APP_NAME || 'Self AI',
    appLogoUrl: import.meta.env.VITE_COINBASE_APP_LOGO_URL,
    darkMode: false,
    defaultChainId: 1, // Ethereum Mainnet
  },
} as const;

// Feature Flags
export const FEATURES = {
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  portfolioTTL: 5 * 60 * 1000, // 5 minutes
  marketDataTTL: 60 * 1000, // 1 minute
} as const;