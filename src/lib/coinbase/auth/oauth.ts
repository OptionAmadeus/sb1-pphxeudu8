import { COINBASE_CONSTANTS } from '../config/constants';
import { COINBASE_ENV } from '../config/environment';

export function generateOAuthUrl(): string {
  const state = crypto.randomUUID();
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: COINBASE_ENV.clientId,
    redirect_uri: COINBASE_ENV.redirectUri,
    scope: COINBASE_CONSTANTS.SCOPES.join(' '),
    state
  });

  return `${COINBASE_CONSTANTS.AUTH_ENDPOINT}?${params.toString()}`;
}

export async function validateOAuthState(state: string): Promise<boolean> {
  const savedState = sessionStorage.getItem('oauth_state');
  if (!savedState || savedState !== state) {
    return false;
  }
  sessionStorage.removeItem('oauth_state');
  return true;
}