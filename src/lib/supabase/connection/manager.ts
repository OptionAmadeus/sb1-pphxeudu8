import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/schema';
import { authLogger } from '../debug/logger';

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export async function initializeSupabase() {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing Supabase configuration. Please click "Connect to Supabase" to set up your project.');
    }

    supabaseInstance = createClient<Database>(url, key, {
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
    });

    // Test connection
    const { error } = await supabaseInstance.auth.getSession();
    if (error) throw error;

    return supabaseInstance;
  } catch (error) {
    authLogger.error('Failed to initialize Supabase:', error);
    throw error;
  }
}

export function getSupabase() {
  if (!supabaseInstance) {
    throw new Error('Supabase not initialized. Please click "Connect to Supabase" to set up your project.');
  }
  return supabaseInstance;
}