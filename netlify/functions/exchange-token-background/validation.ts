import { TokenExchangeRequest } from './types';

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

export function validateRequest(body: string | null): TokenExchangeRequest {
  if (!body) {
    throw new Error('Request body is required');
  }

  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    throw new Error('Invalid JSON in request body');
  }

  if (!isTokenExchangeRequest(data)) {
    throw new Error('Invalid request format');
  }

  return data;
}

function isTokenExchangeRequest(data: unknown): data is TokenExchangeRequest {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    'codeVerifier' in data &&
    typeof data.code === 'string' &&
    typeof data.codeVerifier === 'string' &&
    data.code.length > 0 &&
    data.codeVerifier.length > 0
  );
}