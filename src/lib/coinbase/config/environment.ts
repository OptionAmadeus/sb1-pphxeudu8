function getRedirectUri(): string {
  // Handle StackBlitz preview URLs
  if (window.location.hostname.includes('stackblitz.io')) {
    return `${window.location.origin}/auth/callback`;
  }
  
  // Production URL
  if (import.meta.env.PROD) {
    return 'https://tryself.ai/auth/callback';
  }
  
  // Local development
  return 'http://localhost:5173/auth/callback';
}

export const COINBASE_ENV = {
  clientId: 'f9ea95af-876c-4a33-9230-bed617584e83',
  clientSecret: 'jzp53bfr7CPERb.SZw_TGfW1Qz',
  redirectUri: getRedirectUri(),
} as const;