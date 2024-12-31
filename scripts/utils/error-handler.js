export function handleConnectionError(error) {
  console.error('\n❌ Connection failed:');
  console.error(`Error: ${error.message}`);
  
  if (error.code) {
    console.error(`Code: ${error.code}`);
  }
  
  // Provide helpful suggestions based on error type
  if (error.message.includes('Network connection')) {
    console.log('\nSuggestions:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your VPN connection if using one');
    console.log('3. Check if Supabase is accessible from your network');
  } else if (error.message.includes('Invalid Supabase')) {
    console.log('\nSuggestions:');
    console.log('1. Verify your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    console.log('2. Ensure you\'re using the correct project credentials');
  }
}