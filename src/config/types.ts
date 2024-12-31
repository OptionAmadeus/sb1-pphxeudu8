export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
}

export interface Web3Config {
  infuraId: string;
  coinbaseConfig: {
    appName: string;
    appLogoUrl: string;
    darkMode: boolean;
    defaultChainId: number;
  };
}

export interface FeatureFlags {
  enableAnalytics: boolean;
  enableMockData: boolean;
}

export interface CacheConfig {
  portfolioTTL: number;
  marketDataTTL: number;
}