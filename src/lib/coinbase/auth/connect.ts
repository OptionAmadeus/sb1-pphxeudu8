import { OAUTH_CONFIG } from './config';

export async function generateAuthUrl(returnUrl: string = '/dashboard'): string {
  // Generate state for CSRF protection
  const state = crypto.randomUUID();
  sessionStorage.setItem('oauth_state', JSON.stringify({ state, returnUrl }));

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: OAUTH_CONFIG.clientId,
    redirect_uri: OAUTH_CONFIG.redirectUri,
    scope: 'wallet:accounts:read wallet:transactions:read',
    state
  });

  console.log('Generated OAuth URL:', `${OAUTH_CONFIG.endpoints.auth}?${params}`);
  return `${OAUTH_CONFIG.endpoints.auth}?${params}`;
}

export function validateState(state: string): { returnUrl: string } | null {
  try {
    const stored = sessionStorage.getItem('oauth_state');
    if (!stored) return null;

    const { state: savedState, returnUrl } = JSON.parse(stored);
    sessionStorage.removeItem('oauth_state');

    if (state !== savedState) return null;
    return { returnUrl };
  } catch {
    return null;
  }
}