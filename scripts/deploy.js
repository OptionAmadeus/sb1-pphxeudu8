#!/usr/bin/env node
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function deploy() {
  try {
    // Deploy database changes first
    console.log('Deploying database changes...');
    execSync('npm run db:deploy', { stdio: 'inherit' });

    // Verify database setup
    console.log('Verifying database setup...');
    execSync('npm run db:verify', { stdio: 'inherit' });

    // Build and deploy frontend
    console.log('Building and deploying frontend...');
    execSync('npm run build', { stdio: 'inherit' });
    execSync('netlify deploy --prod', { stdio: 'inherit' });

    console.log('✅ Deployment completed successfully!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deploy();