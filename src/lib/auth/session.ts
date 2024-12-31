import { supabase } from '../supabase';
import type { User } from '@/types/auth';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) throw error;
  if (!session) return null;

  return {
    user: {
      id: session.user.id,
      email: session.user.email!,
      name: session.user.user_metadata.name || 'User',
      createdAt: new Date(session.user.created_at)
    } as User,
    token: session.access_token,
    expiresAt: new Date(session.expires_at!)
  };
}