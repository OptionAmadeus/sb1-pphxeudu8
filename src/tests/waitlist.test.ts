import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitlistService } from '../services/waitlist.service';

describe('Waitlist Service', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully join waitlist', async () => {
    const result = await waitlistService.join(testUser);
    expect(result.position).toBeDefined();
    expect(typeof result.position).toBe('number');
  });

  it('should reject duplicate email', async () => {
    await waitlistService.join(testUser);
    await expect(waitlistService.join(testUser)).rejects.toThrow('This email is already on the waitlist');
  });
});