import { OAuthStorage } from './storage';
import type { OAuthState } from './types';

export const OAuthStateManager = {
  save(returnUrl: string = '/dashboard'): string {
    const state = crypto.randomUUID();
    const stateObj: OAuthState = {
      state,
      returnUrl,
      timestamp: Date.now()
    };
    
    OAuthStorage.setState(state, stateObj);
    return state;
  },

  validate(state: string): OAuthState | null {
    const stored = OAuthStorage.getState(state) as OAuthState;
    if (!stored) return null;

    // Check expiry (30 minutes)
    if (Date.now() - stored.timestamp > 30 * 60 * 1000) {
      return null;
    }

    OAuthStorage.clearState();
    return stored;
  }
};