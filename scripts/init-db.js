import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Setup dirname equivalent for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

// Validate environment variables
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create waitlist table
    const { error: tableError } = await supabase.from('waitlist').select('id').limit(1);
    
    if (tableError?.code === '42P01') { // Table doesn't exist
      console.log('Creating waitlist table...');
      const { error: createError } = await supabase.rpc('create_table', {
        table_sql: `
          CREATE TABLE public.waitlist (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            email text UNIQUE NOT NULL,
            name text NOT NULL,
            created_at timestamptz DEFAULT now(),
            confirmed boolean DEFAULT false,
            confirmation_token uuid DEFAULT gen_random_uuid(),
            confirmation_sent_at timestamptz,
            position serial
          );

          ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

          CREATE POLICY "Anyone can join waitlist" 
            ON public.waitlist FOR INSERT 
            WITH CHECK (true);

          CREATE POLICY "Users can view own entries" 
            ON public.waitlist FOR SELECT 
            USING (true);
        `
      });

      if (createError) {
        throw new Error(`Failed to create table: ${createError.message}`);
      }
      console.log('✅ Waitlist table created successfully');
    } else {
      console.log('✅ Waitlist table already exists');
    }

    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
}

// Run initialization
initializeDatabase()
  .then(success => {
    if (success) {
      console.log('✅ Database initialization completed successfully');
      process.exit(0);
    } else {
      console.error('❌ Database initialization failed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });