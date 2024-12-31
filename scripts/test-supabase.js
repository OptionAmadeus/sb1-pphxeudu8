import { getSupabaseConfig } from '../src/lib/supabase/config/environment.js';

async function testSupabaseConfig() {
  try {
    const config = getSupabaseConfig();
    console.log('\nSupabase Configuration Test');
    console.log('------------------------');
    console.log('URL:', config.url);
    console.log('Key:', config.anonKey ? '✓ Present' : '✗ Missing');
    console.log('\n✅ Configuration validation successful');
  } catch (error) {
    console.error('\n❌ Configuration error:', error.message);
    process.exit(1);
  }
}

testSupabaseConfig().catch(console.error);