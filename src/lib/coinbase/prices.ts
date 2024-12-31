import { coinbaseConfig } from './config';
import { CoinbaseError } from './errors';
import type { PriceHistory, Granularity } from './types';

export async function fetchPriceHistory(
  productId: string,
  granularity: Granularity = 3600, // 1 hour by default
  start?: Date,
  end: Date = new Date()
): Promise<PriceHistory[]> {
  const baseUrl = coinbaseConfig.sandbox
    ? 'https://api-public.sandbox.pro.coinbase.com'
    : 'https://api.pro.coinbase.com';

  // Default to 24 hours ago if no start date provided
  const startDate = start || new Date(end.getTime() - 24 * 60 * 60 * 1000);
  
  const params = new URLSearchParams({
    start: startDate.toISOString(),
    end: end.toISOString(),
    granularity: granularity.toString()
  });

  try {
    const response = await fetch(
      `${baseUrl}/products/${productId}/candles?${params}`
    );

    if (!response.ok) {
      throw new CoinbaseError(
        `Failed to fetch price history: ${response.statusText}`,
        'PRICE_HISTORY_ERROR',
        response.status
      );
    }

    const data = await response.json();
    
    // Transform the raw candle data into a more usable format
    return data.map((candle: number[]) => ({
      time: new Date(candle[0] * 1000),
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5]
    }));
  } catch (error) {
    if (error instanceof CoinbaseError) throw error;
    throw new CoinbaseError(
      'Failed to fetch price history',
      'NETWORK_ERROR'
    );
  }
}