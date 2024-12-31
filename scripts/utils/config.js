import { config } from 'dotenv';
import { resolve } from 'path';

export function loadConfig() {
  // Load environment variables
  config();
  
  const required = {
    supabaseUrl: process.env.VITE_SUPABASE_URL,
    supabaseKey: process.env.VITE_SUPABASE_ANON_KEY
  };

  // Validate all required variables are present
  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return required;
}