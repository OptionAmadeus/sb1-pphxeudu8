import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authClient } from '@/lib/auth/client';
import { AuthError } from '@/lib/auth/errors';

describe('Coinbase Auth Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should handle OAuth callback successfully', async () => {
    const mockCode = 'valid-auth-code';
    const mockResponse = {
      data: {
        user: { id: '1', email: 'test@example.com' },
        session: { access_token: 'test-token' }
      }
    };

    // Mock the Supabase auth exchange
    vi.spyOn(authClient, 'handleOAuthCallback').mockResolvedValueOnce(mockResponse);

    const result = await authClient.handleOAuthCallback(mockCode);
    expect(result.data.user).toBeDefined();
    expect(result.data.session).toBeDefined();
  });

  it('should handle OAuth errors appropriately', async () => {
    const mockCode = 'invalid-code';
    
    // Mock an OAuth error
    vi.spyOn(authClient, 'handleOAuthCallback').mockRejectedValueOnce(
      new AuthError('Invalid OAuth code', 'INVALID_CODE')
    );

    await expect(authClient.handleOAuthCallback(mockCode))
      .rejects
      .toThrow('Invalid OAuth code');
  });
});