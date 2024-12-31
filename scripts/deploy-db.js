#!/usr/bin/env node
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { validateEnvironment } from '../src/lib/supabase/deployment/validate.js';
import { DEPLOYMENT_CONFIG } from '../src/lib/supabase/deployment/config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function deployDatabase() {
  try {
    console.log('🚀 Starting Supabase deployment...');
    
    // Validate environment
    validateEnvironment();

    // Link to project
    console.log('Linking to Supabase project...');
    execSync(
      `npx supabase link --project-ref ${DEPLOYMENT_CONFIG.projectRef} --access-token ${DEPLOYMENT_CONFIG.accessToken}`,
      { stdio: 'inherit' }
    );

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