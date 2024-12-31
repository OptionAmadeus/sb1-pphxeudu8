// Re-export with explicit names to avoid conflicts
export { API_CONFIG as apiConfig } from './api';
export { FEATURES as featureFlags } from './features';
export { PATHS as paths } from './paths';
export { config as environmentConfig } from './environment';

// Re-export configuration types
export type { ApiConfig, Web3Config } from './types';