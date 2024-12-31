const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const { resolve } = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

async function syncMigrations() {
  try {
    console.log('Synchronizing migrations...');

    // Validate environment variables
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
    }

    // Initialize Supabase client
    const supabase = createClient(url, key);

    // Create schema_migrations table if it doesn't exist
    const { error: tableError } = await supabase.rpc('create_migrations_table');
    
    if (tableError) {
      // If RPC fails, try direct SQL
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
          version text PRIMARY KEY,
          name text NOT NULL,
          executed_at timestamptz DEFAULT now()
        );
      `);
      
      if (error) throw error;
    }

    // Get list of migration files
    const migrationsDir = resolve(process.cwd(), 'supabase/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Insert migration records
    for (const file of migrationFiles) {
      const [version, ...nameParts] = file.replace('.sql', '').split('_');
      const name = nameParts.join('_');
      
      const { error } = await supabase
        .from('schema_migrations')
        .upsert({
          version,
          name,
          executed_at: new Date()
        }, {
          onConflict: 'version'
        });

      if (error) {
        console.error(`Error syncing migration ${file}:`, error);
        continue;
      }

      console.log(`✓ Synced migration: ${file}`);
    }

    console.log('\n✅ Migration synchronization completed');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

syncMigrations();