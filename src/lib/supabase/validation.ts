import { supabase } from './client';

export async function validateSupabaseConnection() {
  try {
    const { error } = await supabase
      .from('waitlist')
      .select('count')
      .limit(0);

    return !error;
  } catch (error) {
    console.error('Validation failed:', error);
    return false;
  }
}

export async function validateAuthConfig() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      return { isValid: false, error };
    }

    return {
      isValid: true,
      session: session ? {
        user: session.user.email,
        expires: new Date(session.expires_at!).toLocaleString()
      } : null
    };
  } catch (error) {
    return { isValid: false, error };
  }
}