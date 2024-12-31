export function getClientOptions() {
  return {
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
  } as const;
}