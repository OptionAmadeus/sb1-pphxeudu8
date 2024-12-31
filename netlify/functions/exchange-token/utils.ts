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