import { waitlistClient } from '@/lib/supabase/waitlist/client';
import type { WaitlistEntry } from '@/types/waitlist';
import { validateEmail } from '@/utils/validation';

export class WaitlistService {
  async join(data: WaitlistEntry) {
    if (!validateEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    if (!data.name?.trim()) {
      throw new Error('Name is required');
    }

    const result = await waitlistClient.join({
      email: data.email.toLowerCase(),
      name: data.name.trim()
    });

    return {
      position: result.position,
      message: result.message
    };
  }

  async getPosition(email: string) {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    return waitlistClient.getPosition(email.toLowerCase());
  }
}

export const waitlistService = new WaitlistService();