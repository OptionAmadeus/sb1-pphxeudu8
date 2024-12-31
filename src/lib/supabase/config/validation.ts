import { z } from 'zod';
import type { SupabaseConfig } from './types';

const configSchema = z.object({
  url: z.string().url('Invalid Supabase URL'),
  anonKey: z.string().min(1, 'Supabase key is required')
});

export function validateConfig(config: unknown): SupabaseConfig {
  return configSchema.parse(config);
}