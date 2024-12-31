// Re-export Supabase client and types
export { supabase } from './client';
export type { SupabaseClient } from './client';

// Export other utilities
export { SupabaseError } from './errors';
export { validateSupabaseConnection, validateAuthConfig } from './validation';
export { useSupabaseAuth } from './hooks/useSupabaseAuth';