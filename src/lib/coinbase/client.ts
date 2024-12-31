import { CoinbaseError } from './errors';
import type { CoinbaseBalance, CoinbaseOrder } from './types';

export class CoinbaseClient {
  private accessToken: string | null = null;
  private baseUrl = 'https://api.coinbase.com/v2';

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  async getAccounts(): Promise<CoinbaseBalance[]> {
    if (!this.accessToken) {
      throw new CoinbaseError('Not authenticated', 'AUTH_ERROR');
    }

    const response = await fetch(`${this.baseUrl}/accounts`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new CoinbaseError(
        `Failed to fetch accounts: ${response.statusText}`,
        'API_ERROR',
        response.status
      );
    }

    return response.json();
  }

  async placeOrder(order: Partial<CoinbaseOrder>): Promise<CoinbaseOrder> {
    if (!this.accessToken) {
      throw new CoinbaseError('Not authenticated', 'AUTH_ERROR');
    }

    const response = await fetch(`${this.baseUrl}/trades`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new CoinbaseError(
        `Failed to place order: ${response.statusText}`,
        'ORDER_ERROR',
        response.status
      );
    }

    return response.json();
  }
}

// Export singleton instance
export const coinbaseClient = new CoinbaseClient();