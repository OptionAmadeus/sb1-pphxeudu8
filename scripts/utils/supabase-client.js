import { createClient } from '@supabase/supabase-js';
import { fetchConfig } from './fetch-config.js';

export function initSupabase(url, key) {
  if (!url || !key) {
    throw new Error('Supabase URL and key are required');
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      ...fetchConfig,
      headers: {
        ...fetchConfig.headers,
        'Connection': 'keep-alive',
        'Keep-Alive': 'timeout=5, max=1000'
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  });
}

export async function testConnection(supabase) {
  try {
    // Use the lightweight health check function first
    const { data: healthCheck, error: healthError } = await supabase
      .rpc('check_connection');

    if (healthError) {
      throw healthError;
    }

    // If health check passes, get waitlist count
    const { data: count, error: countError } = await supabase
      .rpc('get_waitlist_count');

    if (countError) {
      throw countError;
    }

    // Log successful connection
    await supabase
      .from('connection_monitoring')
      .insert({
        success: true,
        query_duration: '1 millisecond'
      })
      .throwOnError();

    return true;
  } catch (error) {
    // Log failed connection
    try {
      await supabase
        .from('connection_monitoring')
        .insert({
          success: false,
          error_message: error.message
        });
    } catch {} // Ignore logging errors

    throw error;
  }
}