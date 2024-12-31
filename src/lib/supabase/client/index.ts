import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '../config';
import { getClientOptions } from './options';
import type { Database } from '../types/schema';

const config = getSupabaseConfig();
const options = getClientOptions();

export const supabase = createClient<Database>(
  config.url,
  config.anonKey,
  options
);

export type SupabaseClient = typeof supabase;