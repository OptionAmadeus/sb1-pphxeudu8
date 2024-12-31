import { loadConfig } from './utils/config.js';
import { initSupabase, testConnection } from './utils/supabase-client.js';
import { handleConnectionError } from './utils/error-handler.js';

async function checkConnection() {
  try {
    console.log('Loading configuration...');
    const { supabaseUrl, supabaseKey } = loadConfig();

    console.log('Initializing Supabase client...');
    const supabase = initSupabase(supabaseUrl, supabaseKey);

    console.log('Testing connection...');
    await testConnection(supabase);

    console.log('\n✅ Successfully connected to Supabase');
    return true;
  } catch (error) {
    handleConnectionError(error);
    return false;
  }
}

checkConnection().catch(console.error);