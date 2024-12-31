import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/schema';
import { SUPABASE_CONFIG } from '../config/constants';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createRetryClient() {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const client = createClient<Database>(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: localStorage,
            storageKey: 'supabase.auth.token',
            flowType: 'pkce'
          },
          global: {
            headers: { 'x-client-info': 'self-ai-web' }
          }
        }
      );

      // Test connection
      const { error } = await client.auth.getSession();
      if (error) throw error;

      return client;
    } catch (error) {
      retries++;
      console.error(`Connection attempt ${retries} failed:`, error);
      
      if (retries === MAX_RETRIES) {
        throw new Error('Failed to connect to Supabase after multiple attempts');
      }
      
      await delay(RETRY_DELAY * retries);
    }
  }

  throw new Error('Connection failed after retries');
}