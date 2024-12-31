import type { CoinbaseConfig, CoinbaseBalance, CoinbaseOrder } from './types';

export class CoinbaseAPI {
  private baseUrl: string;
  private headers: Headers;

  constructor(config: CoinbaseConfig) {
    this.baseUrl = config.sandbox 
      ? 'https://api-public.sandbox.pro.coinbase.com'
      : 'https://api.pro.coinbase.com';
    
    this.headers = new Headers({
      'CB-ACCESS-KEY': config.apiKey,
      'CB-ACCESS-TIMESTAMP': Date.now().toString(),
      'Content-Type': 'application/json'
    });
  }

  async getAccounts(): Promise<CoinbaseBalance[]> {
    const response = await fetch(`${this.baseUrl}/accounts`, {
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(`Coinbase API error: ${response.statusText}`);
    }

    return response.json();
  }

  async placeOrder(order: Partial<CoinbaseOrder>): Promise<CoinbaseOrder> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error(`Failed to place order: ${response.statusText}`);
    }

    return response.json();
  }
}