import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../..');

export function loadEnv() {
  // Load from all possible .env files
  config({ path: resolve(rootDir, '.env') });
  config({ path: resolve(rootDir, '.env.development') });
  config({ path: resolve(rootDir, '.env.production') });

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
  }

  return { supabaseUrl, supabaseKey };
}