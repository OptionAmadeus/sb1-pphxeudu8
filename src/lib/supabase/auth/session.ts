import { supabase } from '../client';
import { AuthError } from './errors';

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session error:', error);
      throw AuthError.fromSupabaseError(error);
    }
    
    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    throw error instanceof AuthError ? error : AuthError.fromSupabaseError(error);
  }
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Session refresh error:', error);
      throw AuthError.fromSupabaseError(error);
    }
    
    return session;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    throw error instanceof AuthError ? error : AuthError.fromSupabaseError(error);
  }
}