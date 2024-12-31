import { createSupabaseClient } from './connection/retryClient';
import { authLogger } from './debug/logger';

let supabaseInstance: Awaited<ReturnType<typeof createSupabaseClient>> | null = null;

export async function getSupabase() {
  if (!supabaseInstance) {
    try {
      supabaseInstance = await createSupabaseClient();
    } catch (error) {
      authLogger.error('Failed to initialize Supabase:', error);
      throw error;
    }
  }
  return supabaseInstance;
}

// Initialize on app load
getSupabase().catch(error => {
  console.error('Failed to initialize Supabase:', error);
});