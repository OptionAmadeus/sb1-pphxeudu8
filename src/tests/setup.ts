import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      insert: vi.fn().mockResolvedValue({ data: { position: 1 }, error: null }),
      select: vi.fn().mockResolvedValue({ data: null, error: null })
    })
  })
}));

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});