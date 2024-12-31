import { TokenExchangeRequest } from './types';

export function createTokenParams(request: TokenExchangeRequest): URLSearchParams {
  return new URLSearchParams({
    grant_type: 'authorization_code',
    code: request.code,
    client_id: process.env.VITE_COINBASE_CLIENT_ID!,
    client_secret: process.env.COINBASE_CLIENT_SECRET!,
    code_verifier: request.codeVerifier,
    redirect_uri: process.env.VITE_COINBASE_REDIRECT_URI!
  });
}

export function validateRequest(body: string | null): TokenExchangeRequest {
  if (!body) {
    throw new Error('Missing request body');
  }

  const data = JSON.parse(body);
  
  if (!data.code || !data.codeVerifier) {
    throw new Error('Missing required parameters: code or codeVerifier');
  }

  return data as TokenExchangeRequest;
}

export function validateEnvironment(): void {
  const required = [
    'VITE_COINBASE_CLIENT_ID',
    'COINBASE_CLIENT_SECRET',
    'VITE_COINBASE_REDIRECT_URI'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}