import { CoinbaseError } from './errors';

export async function generateSignature(
  timestamp: number,
  method: string,
  path: string,
  body: string = '',
  secret: string
): Promise<string> {
  try {
    // Decode the base64 secret key
    const key = await importKey(secret);
    
    // Create the message to sign
    const message = `${timestamp}${method}${path}${body}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    // Sign the message using HMAC-SHA256
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      data
    );

    // Convert the signature to base64
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  } catch (error) {
    throw new CoinbaseError(
      'Failed to generate signature',
      'SIGNATURE_ERROR'
    );
  }
}

async function importKey(secret: string): Promise<CryptoKey> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(atob(secret));

    return await crypto.subtle.importKey(
      'raw',
      keyData,
      {
        name: 'HMAC',
        hash: { name: 'SHA-256' }
      },
      false,
      ['sign']
    );
  } catch (error) {
    throw new CoinbaseError(
      'Invalid API secret',
      'INVALID_SECRET'
    );
  }
}