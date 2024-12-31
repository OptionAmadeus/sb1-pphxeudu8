// JavaScript version of environment config
function getSupabaseConfig() {
  const config = {
    supabaseUrl: 'https://dvkpanntfxehgasngylg.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3Bhbm50ZnhlaGdhc25neWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMzQ2OTEsImV4cCI6MjA1MDgxMDY5MX0.mYSCoWL2Ajk61V7vKfWM3aDkLY-0O47bilMdMPuwe_4'
  };

  // Basic validation
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw new Error('Missing required Supabase configuration');
  }

  if (!config.supabaseUrl.includes('supabase.co')) {
    throw new Error('Invalid Supabase URL format');
  }

  if (!config.supabaseKey.includes('.')) {
    throw new Error('Invalid Supabase key format');
  }

  return config;
}

export { getSupabaseConfig };