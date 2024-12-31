import { OAUTH_CONFIG } from './config';
import { PKCE } from './pkce';
import { OAuthStateManager } from './state';
import { OAuthStorage } from './storage';
import { CoinbaseOAuthError } from './errors';

export async function initializeOAuthFlow(returnUrl: string = '/dashboard'): Promise<void> {
  try {
    const codeVerifier = PKCE.generateCodeVerifier();
    const codeChallenge = await PKCE.generateCodeChallenge(codeVerifier);
    OAuthStorage.setCodeVerifier(codeVerifier);

    const state = OAuthStateManager.save(returnUrl);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: OAUTH_CONFIG.clientId,
      redirect_uri: OAUTH_CONFIG.redirectUri,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      scope: 'wallet:accounts:read wallet:transactions:read',
      state,
      locale: 'en'
    });

    window.location.href = `${OAUTH_CONFIG.endpoints.auth}?${params}`;
  } catch (error) {
    console.error('Failed to initialize OAuth flow:', error);
    throw error;
  }
}

export async function handleOAuthCallback(code: string): Promise<boolean> {
  try {
    const codeVerifier = OAuthStorage.getCodeVerifier();
    if (!codeVerifier) {
      throw CoinbaseOAuthError.missingCodeVerifier();
    }

    // Update to use the background function
    const response = await fetch('/.netlify/functions/exchange-token-background', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, codeVerifier })
    });

    if (!response.ok) {
      const error = await response.json();
      throw CoinbaseOAuthError.tokenExchangeFailed(error.error);
    }

    const tokens = await response.json();
    OAuthStorage.setTokens(tokens.access_token, tokens.refresh_token);
    return true;
  } catch (error) {
    console.error('OAuth callback failed:', error);
    throw error instanceof CoinbaseOAuthError ? error : CoinbaseOAuthError.tokenExchangeFailed();
  } finally {
    OAuthStorage.clearCodeVerifier();
  }
}

export { CoinbaseOAuthError } from './errors';
export type { OAuthState } from './types';