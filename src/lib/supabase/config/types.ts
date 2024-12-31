export interface SupabaseConfig {
  url: string;
  anonKey: string;
  options?: {
    auth?: {
      persistSession?: boolean;
      autoRefreshToken?: boolean;
    };
  };
}