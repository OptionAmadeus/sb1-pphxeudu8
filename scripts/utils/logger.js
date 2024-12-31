export function logMigrations(migrations) {
  if (migrations.length === 0) {
    console.log('No migrations found in the database.');
    return;
  }

  console.log('\nCurrent migrations in database:');
  console.table(migrations.map(m => ({
    version: m.version,
    name: m.name,
    executed_at: m.executed_at
  })));

  const version7 = migrations.find(m => m.version === '0007');
  if (version7) {
    console.log('\nWARNING: Version 0007 already exists:', {
      version: version7.version,
      name: version7.name,
      executed_at: version7.executed_at
    });
  }
}