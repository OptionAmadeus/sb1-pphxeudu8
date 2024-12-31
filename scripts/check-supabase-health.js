import { checkSupabaseHealth } from '../src/lib/supabase/health/check.js';

async function runHealthCheck() {
  console.log('\nRunning Supabase Health Check...');
  
  const result = await checkSupabaseHealth();
  
  console.log('\nHealth Check Results:');
  console.log('-------------------');
  console.log('Status:', result.status);
  console.log('Time:', result.timestamp);
  console.log('Message:', result.message);
  
  if (result.error) {
    console.error('Error:', result.error);
    process.exit(1);
  }
}

runHealthCheck().catch(console.error);