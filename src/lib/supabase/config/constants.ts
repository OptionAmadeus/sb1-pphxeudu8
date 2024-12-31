export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
      storageKey: 'supabase.auth.token'
    },
    global: {
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'x-client-info': 'self-ai-web'
      }
    }
  }
} as const;