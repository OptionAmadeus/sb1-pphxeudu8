import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config/constants.mjs';

const clientOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
};

export const supabase = createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey,
  clientOptions
);