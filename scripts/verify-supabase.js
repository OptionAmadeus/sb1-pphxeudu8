#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function verifySupabaseSetup() {
  console.log('Verifying Supabase configuration...\n');

  // Validate environment variables
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('❌ Missing required environment variables:');
    if (!url) console.error('   - VITE_SUPABASE_URL');
    if (!key) console.error('   - VITE_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  console.log('Environment variables:');
  console.log('- URL:', url);
  console.log('- Key:', key.substring(0, 8) + '...');

  // Initialize Supabase client
  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // First verify connection
    console.log('\nTesting connection...');
    const { error: healthError } = await supabase.from('waitlist').select('count');
    if (healthError && healthError.code !== 'PGRST116') { // Ignore permission errors
      throw healthError;
    }
    console.log('✓ Connection successful');

    // Test authentication
    console.log('\nTesting authentication...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'wesche@outlook.com',
      password: 'Test@12!'
    });

    if (signInError) {
      console.error('\n❌ Authentication failed:', signInError.message);
      console.error('Error code:', signInError.status);
      return;
    }

    if (signInData?.user) {
      console.log('\n✓ Authentication successful');
      console.log('\nUser details:');
      console.log('- ID:', signInData.user.id);
      console.log('- Email:', signInData.user.email);
      console.log('- Email confirmed:', !!signInData.user.email_confirmed_at);
      console.log('- Created at:', new Date(signInData.user.created_at).toLocaleString());
      
      if (signInData.session) {
        console.log('\nSession details:');
        console.log('- Expires:', new Date(signInData.session.expires_at).toLocaleString());
      }
    } else {
      console.log('\n❌ No user data returned');
    }

  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    if (error.status) console.error('Status code:', error.status);
    process.exit(1);
  }
}

verifySupabaseSetup().catch(console.error);