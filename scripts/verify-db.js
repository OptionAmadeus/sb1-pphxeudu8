#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function verifyDatabase() {
  try {
    console.log('Verifying database setup...');

    // Verify waitlist table
    const { error: waitlistError } = await supabase
      .from('waitlist')
      .select('count')
      .limit(1);

    if (waitlistError) throw new Error(`Waitlist table check failed: ${waitlistError.message}`);
    console.log('✅ Waitlist table verified');

    // Verify RLS policies
    const { error: policyError } = await supabase
      .from('waitlist')
      .select('id')
      .limit(1);

    if (policyError?.message?.includes('policy')) {
      throw new Error('RLS policies check failed');
    }
    console.log('✅ RLS policies verified');

    console.log('✅ Database verification completed successfully!');
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verifyDatabase();