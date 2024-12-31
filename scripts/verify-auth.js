import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function verifyAuthService() {
  try {
    // Validate environment variables
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
    }

    console.log('Environment variables loaded successfully');
    console.log('Supabase URL:', url);
    console.log('Key present:', !!key);

    // Initialize Supabase client
    const supabase = createClient(url, key);
    
    // Step 1: Test basic connection
    console.log('\nTesting connection...');
    const { error: connError } = await supabase.auth.getSession();

    if (connError) {
      throw connError;
    }

    console.log('✓ Connection successful');

    // Step 2: Test authentication
    console.log('\nTesting authentication...');
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: 'wesche@duck.com',
      password: 'Test@123!'
    });

    if (authError) {
      throw authError;
    }

    if (!data?.user) {
      throw new Error('Authentication successful but no user data returned');
    }

    console.log('✓ Authentication successful');
    console.log('User:', data.user.email);

    // Step 3: Sign out
    await supabase.auth.signOut();

    return {
      status: 'healthy',
      message: 'Authentication service is working correctly'
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
}

async function runVerification() {
  console.log('Starting authentication verification...\n');
  
  const result = await verifyAuthService();
  
  if (result.status === 'healthy') {
    console.log('\n✅', result.message);
    return true;
  } else {
    console.error('\n❌ Authentication verification failed:');
    console.error(result.message);
    return false;
  }
}

runVerification().then(success => {
  process.exit(success ? 0 : 1);
});