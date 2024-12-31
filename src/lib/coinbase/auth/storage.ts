const STORAGE_KEYS = {
  CODE_VERIFIER: 'code_verifier',
  OAUTH_STATE: 'oauth_state',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token'
} as const;

export const OAuthStorage = {
  setCodeVerifier(verifier: string): void {
    try {
      console.log('Storing Code Verifier');
      sessionStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, verifier);
    } catch (error) {
      console.error('Failed to store code verifier:', error);
      throw error;
    }
  },

  getCodeVerifier(): string | null {
    try {
      const verifier = sessionStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
      console.log('Retrieved Code Verifier:', verifier ? 'Found' : 'Not Found');
      return verifier;
    } catch (error) {
      console.error('Failed to retrieve code verifier:', error);
      return null;
    }
  },

  clearCodeVerifier(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
    } catch (error) {
      console.error('Failed to clear code verifier:', error);
    }
  },

  setState(state: string, data: unknown): void {
    try {
      sessionStorage.setItem(STORAGE_KEYS.OAUTH_STATE, JSON.stringify({ state, data }));
    } catch (error) {
      console.error('Failed to store OAuth state:', error);
      throw error;
    }
  },

  getState(state: string): unknown | null {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.OAUTH_STATE);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      return parsed.state === state ? parsed.data : null;
    } catch (error) {
      console.error('Failed to retrieve OAuth state:', error);
      return null;
    }
  },

  clearState(): void {
    sessionStorage.removeItem(STORAGE_KEYS.OAUTH_STATE);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  clearTokens(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
};