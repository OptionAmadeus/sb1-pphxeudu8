#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function verifyAuthSetup() {
  console.log('Starting comprehensive auth verification...\n');

  // Validate environment variables
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('Missing required environment variables:');
    if (!url) console.error('- VITE_SUPABASE_URL');
    if (!key) console.error('- VITE_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  // Initialize client with minimal config
  const supabase = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });

  try {
    // Verify database connection
    console.log('Verifying database connection...');
    const { error: healthError } = await supabase.from('waitlist').select('count');
    if (healthError && healthError.code !== 'PGRST116') { // Ignore permission errors
      throw healthError;
    }
    console.log('✓ Database connection successful\n');

    // Sign out to ensure clean state
    await supabase.auth.signOut();
    console.log('Cleared existing sessions\n');

    // Test sign in
    console.log('Testing authentication...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'wesche@outlook.com',
      password: 'Test@12!'
    });

    if (error) throw error;
    if (!data?.user || !data?.session) {
      throw new Error('No user or session returned');
    }

    console.log('\n✅ Authentication successful!');
    console.log('\nUser details:');
    console.log('- ID:', data.user.id);
    console.log('- Email:', data.user.email);
    console.log('- Confirmed:', !!data.user.email_confirmed_at);
    console.log('- Created:', new Date(data.user.created_at).toLocaleString());
    
    console.log('\nSession details:');
    console.log('- Expires:', new Date(data.session.expires_at).toLocaleString());
    console.log('- Token type:', data.session.token_type);

    // Clean up
    await supabase.auth.signOut();
    console.log('\n✅ Verification completed successfully');

  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    if (error.status) console.error('Status code:', error.status);
    process.exit(1);
  }
}

verifyAuthSetup().catch(console.error);