import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/schema';
import { authLogger } from '../debug/logger';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createSupabaseClient() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase configuration. Please click "Connect to Supabase" to set up your project.');
  }

  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const client = createClient<Database>(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: localStorage,
          storageKey: 'supabase.auth.token'
        },
        global: {
          headers: { 'x-client-info': 'self-ai-web' },
          fetch: (url, init) => {
            return fetch(url, {
              ...init,
              credentials: 'include',
              mode: 'cors'
            });
          }
        }
      });

      // Test connection
      const { error } = await client.auth.getSession();
      if (error) throw error;

      return client;
    } catch (error) {
      retries++;
      authLogger.error(`Connection attempt ${retries} failed:`, error);
      
      if (retries === MAX_RETRIES) {
        throw new Error('Unable to connect to Supabase. Please try again or click "Connect to Supabase" to set up your project.');
      }
      
      await delay(RETRY_DELAY * retries);
    }
  }

  throw new Error('Connection failed after retries');
}