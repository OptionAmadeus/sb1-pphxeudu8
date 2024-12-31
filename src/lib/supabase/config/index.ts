import { z } from 'zod';
import { getEnvironmentConfig } from './environment';
import { validateConfig } from './validation';
import type { SupabaseConfig } from './types';

export function getSupabaseConfig(): SupabaseConfig {
  const envConfig = getEnvironmentConfig();
  return validateConfig(envConfig);
}

export * from './types';
export * from './constants';