export function getEnvironmentConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing required Supabase configuration. Please check your environment variables.');
  }

  return { url, anonKey: key };
}