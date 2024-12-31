import { verifyAuthService } from '../utils/auth/verify';

async function runVerification() {
  console.log('Verifying authentication service...\n');
  
  const result = await verifyAuthService();
  
  if (result.status === 'healthy') {
    console.log('✅', result.message);
    return true;
  } else {
    console.error('❌ Authentication service verification failed:');
    console.error(result.message);
    return false;
  }
}

runVerification().then(success => {
  process.exit(success ? 0 : 1);
});