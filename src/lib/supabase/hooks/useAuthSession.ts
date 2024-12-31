import { useEffect } from 'react';
import { supabase } from '../client';
import { getSession, refreshSession } from '../auth/session';
import { useAuthStore } from '@/stores/auth';

export function useAuthSession() {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const session = await getSession();
        
        if (!mounted) return;

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.name || 'User'
          });
          
          // Refresh session if it's close to expiring
          const expiresAt = new Date(session.expires_at!);
          const now = new Date();
          if (expiresAt.getTime() - now.getTime() < 60000) { // Less than 1 minute
            await refreshSession();
          }
        }
      } catch (error) {
        console.error('Session initialization failed:', error);
        if (mounted) logout();
      }
    }

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

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
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, logout]);
}