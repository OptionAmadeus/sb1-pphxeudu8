#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function verifyEdgeFunction() {
  try {
    console.log('Verifying Edge Function...');

    // Test the edge function with a sample payload
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: {
        email: 'test@example.com',
        name: 'Test User',
        token: '123e4567-e89b-12d3-a456-426614174000'
      }
    });

    if (error) throw error;

    console.log('✅ Edge Function responded successfully:', data);
    return true;
  } catch (error) {
    console.error('❌ Edge Function verification failed:', error.message);
    return false;
  }
}

// Run verification
verifyEdgeFunction().then(success => {
  process.exit(success ? 0 : 1);
});