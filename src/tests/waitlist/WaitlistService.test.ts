import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitlistService } from '@/services/waitlist.service';
import type { WaitlistEntry } from '@/types/waitlist';

describe('WaitlistService', () => {
  const mockEntry: WaitlistEntry = {
    name: 'Test User',
    email: 'test@example.com'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully join waitlist', async () => {
    const result = await waitlistService.join(mockEntry);
    expect(result.position).toBeDefined();
    expect(result.position).toBeGreaterThan(0);
  });

  it('should reject duplicate email', async () => {
    await waitlistService.join(mockEntry);
    await expect(waitlistService.join(mockEntry))
      .rejects.toThrow('This email is already on the waitlist');
  });

  it('should validate email format', async () => {
    const invalidEntry = { ...mockEntry, email: 'invalid-email' };
    await expect(waitlistService.join(invalidEntry))
      .rejects.toThrow('Invalid email format');
  });
});