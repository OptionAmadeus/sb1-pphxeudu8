import { describe, it, expect } from 'vitest';
import { generateSignature } from '../../lib/coinbase/crypto';

describe('Coinbase Crypto Utils', () => {
  const mockSecret = 'bW9jay1zZWNyZXQ='; // base64 encoded 'mock-secret'
  
  it('should generate valid signatures', async () => {
    const timestamp = 1625097600;
    const method = 'GET';
    const path = '/accounts';
    
    const signature = await generateSignature(
      timestamp,
      method,
      path,
      '',
      mockSecret
    );

    expect(signature).toBeDefined();
    expect(typeof signature).toBe('string');
    expect(signature.length).toBeGreaterThan(0);
  });

  it('should handle empty bodies', async () => {
    const timestamp = 1625097600;
    const method = 'GET';
    const path = '/accounts';
    
    const signature1 = await generateSignature(
      timestamp,
      method,
      path,
      '',
      mockSecret
    );
    
    const signature2 = await generateSignature(
      timestamp,
      method,
      path,
      undefined,
      mockSecret
    );

    expect(signature1).toBe(signature2);
  });

  it('should throw on invalid secret', async () => {
    const timestamp = 1625097600;
    const method = 'GET';
    const path = '/accounts';
    
    await expect(generateSignature(
      timestamp,
      method,
      path,
      '',
      'invalid-secret'
    )).rejects.toThrow('Invalid API secret');
  });
});