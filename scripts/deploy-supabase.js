import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function deployDatabase() {
  try {
    console.log('🚀 Starting Supabase deployment...');

    // Push database changes
    console.log('Pushing database changes...');
    execSync('npx supabase db push', { stdio: 'inherit' });

    console.log('✅ Database deployment completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error deploying database:', error);
    return false;
  }
}

deployDatabase()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('Deployment failed:', error);
    process.exit(1);
  });