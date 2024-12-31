import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabase';

describe('send-confirmation-email Edge Function', () => {
  const testPayload = {
    email: 'test@example.com',
    name: 'Test User',
    token: '123e4567-e89b-12d3-a456-426614174000'
  };

  it('should successfully send confirmation email', async () => {
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: testPayload
    });

    expect(error).toBeNull();
    expect(data).toEqual({ success: true });
  });

  it('should handle invalid email format', async () => {
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: { ...testPayload, email: 'invalid-email' }
    });

    expect(error).toBeDefined();
    expect(error?.message).toContain('invalid email');
  });
});