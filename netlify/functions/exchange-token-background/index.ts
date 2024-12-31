import { Handler } from '@netlify/functions';
import { COINBASE_CONFIG } from './config';
import { validateEnvironment, validateRequest } from './validation';
import { createTokenParams } from './utils';
import { logger } from './logger';
import { TokenExchangeError } from './errors';
import type { TokenExchangeResponse } from './types';

export const handler: Handler = async (event) => {
  logger.info('Function Started', { method: event.httpMethod });

  try {
    validateEnvironment();

    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: COINBASE_CONFIG.CORS
      };
    }

    if (event.httpMethod !== 'POST') {
      throw new Error(`Invalid HTTP method: ${event.httpMethod}`);
    }

    const request = validateRequest(event.body);
    const params = createTokenParams(request);

    logger.info('Sending Token Exchange Request');
    const response = await fetch(COINBASE_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: COINBASE_CONFIG.HEADERS,
      body: params.toString()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw TokenExchangeError.fromResponse(response, data);
    }

    const tokens = data as TokenExchangeResponse;
    logger.info('Token Exchange Successful');

    return {
      statusCode: 200,
      headers: COINBASE_CONFIG.CORS,
      body: JSON.stringify(tokens)
    };
  } catch (error) {
    logger.error('Function Error:', error);
    return {
      statusCode: error instanceof TokenExchangeError ? 400 : 500,
      headers: COINBASE_CONFIG.CORS,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      })
    };
  }
};