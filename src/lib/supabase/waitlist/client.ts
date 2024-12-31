import { supabase } from '../client';
import { WaitlistError } from './errors';
import type { WaitlistEntry } from '@/types/waitlist';

export class WaitlistClient {
  async join(entry: WaitlistEntry) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{
          email: entry.email.toLowerCase(),
          name: entry.name
        }])
        .select('position')
        .single();

      if (error) {
        if (error.code === '23505') { // Unique violation
          throw new WaitlistError(
            'This email is already on the waitlist',
            'DUPLICATE_EMAIL'
          );
        }
        throw WaitlistError.fromSupabaseError(error);
      }

      if (!data) {
        throw new WaitlistError('No data returned from waitlist insertion');
      }

      return {
        position: data.position,
        message: 'Successfully joined waitlist'
      };
    } catch (error) {
      console.error('Waitlist join error:', error);
      if (error instanceof WaitlistError) throw error;
      throw WaitlistError.fromSupabaseError(error);
    }
  }

  async getPosition(email: string) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('position')
        .eq('email', email.toLowerCase())
        .single();

      if (error) throw WaitlistError.fromSupabaseError(error);
      return data?.position;
    } catch (error) {
      console.error('Get position error:', error);
      throw error instanceof WaitlistError ? error : WaitlistError.fromSupabaseError(error);
    }
  }
}

export const waitlistClient = new WaitlistClient();