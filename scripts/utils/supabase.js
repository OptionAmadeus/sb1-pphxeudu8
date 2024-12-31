import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient(url, key) {
  return createClient(url, key, {
    auth: { persistSession: false }
  });
}

export async function getMigrations(supabase) {
  const { data, error } = await supabase
    .from('schema_migrations')
    .select('version, name, executed_at')
    .order('version');

  if (error) {
    throw new Error(`Failed to fetch migrations: ${error.message}`);
  }

  return data || [];
}