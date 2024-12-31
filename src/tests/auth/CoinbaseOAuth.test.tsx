import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthCallback } from '@/pages/AuthCallback';
import { DashboardPage } from '@/pages/DashboardPage';
import { authClient } from '@/lib/auth/client';

// Mock the auth client
vi.mock('@/lib/auth/client', () => ({
  authClient: {
    handleOAuthCallback: vi.fn()
  }
}));

describe('Coinbase OAuth Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to dashboard on successful OAuth callback', async () => {
    // Mock successful OAuth callback
    vi.mocked(authClient.handleOAuthCallback).mockResolvedValueOnce({
      data: {
        user: { id: '1', email: 'test@example.com' },
        session: { access_token: 'test-token' }
      }
    });

    render(
      <MemoryRouter initialEntries={['/auth/callback?code=test-code']}>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('should redirect to login on OAuth failure', async () => {
    // Mock failed OAuth callback
    vi.mocked(authClient.handleOAuthCallback).mockRejectedValueOnce(
      new Error('OAuth failed')
    );

    render(
      <MemoryRouter initialEntries={['/auth/callback?code=invalid-code']}>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });
});