import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/schema';

// Create and export the Supabase client
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
      storageKey: 'supabase.auth.token'
    },
    global: {
      headers: { 'x-client-info': 'self-ai-web' }
    }
  }
);