export const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce',
    debug: import.meta.env.DEV,
    // Add proper CORS settings
    cookieOptions: {
      sameSite: 'lax',
      secure: true,
      domain: window.location.hostname
    }
  },
  global: {
    headers: { 
      'x-client-info': 'self-ai-web',
      'x-webcontainer': 'true'
    }
  }
} as const;