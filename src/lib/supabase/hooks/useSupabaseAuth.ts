import { useEffect } from 'react';
import { supabase } from '../client';
import { useAuthStore } from '@/stores/auth';

export function useSupabaseAuth() {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.name || 'User'
          });
        }

        if (event === 'SIGNED_OUT') {
          logout();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, logout]);
}