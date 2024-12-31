const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const { resolve } = require('path');

// Load environment variables from all possible .env files
['', '.development', '.production'].forEach(env => {
  dotenv.config({ path: resolve(process.cwd(), `.env${env}`) });
});

async function checkMigrations() {
  try {
    // Validate environment variables
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
    }

    // Initialize Supabase client
    const supabase = createClient(url, key);

    console.log('\nChecking database migrations...');

    // Query migrations table
    const { data: migrations, error } = await supabase
      .from('schema_migrations')
      .select('version, name, executed_at')
      .order('version');

    if (error) {
      if (error.message.includes('does not exist')) {
        console.log('\nℹ️  No migrations table found. Run migrations to create it.');
        return;
      }
      throw error;
    }

    if (!migrations?.length) {
      console.log('No migrations found in the database.');
      return;
    }

    // Display migrations
    console.log('\nExecuted migrations:');
    console.table(
      migrations.map(m => ({
        Version: m.version,
        Name: m.name,
        'Executed At': new Date(m.executed_at).toLocaleString()
      }))
    );

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

checkMigrations();