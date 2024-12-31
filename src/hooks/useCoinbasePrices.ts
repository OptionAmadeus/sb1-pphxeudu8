import { useState, useEffect } from 'react';
import { coinbaseWebSocket } from '@/lib/coinbase/websocket';
import type { PriceUpdate } from '@/lib/coinbase/types';

export function useCoinbasePrices(productIds: string[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Subscribe to price updates
    coinbaseWebSocket.subscribe(productIds);

    // Handle price updates
    const unsubscribe = coinbaseWebSocket.onPriceUpdate((update: PriceUpdate) => {
      setPrices(prev => ({
        ...prev,
        [update.productId]: update.price
      }));
      setLastUpdate(update.time);
    });

    // Cleanup
    return () => {
      unsubscribe();
      coinbaseWebSocket.unsubscribe(productIds);
    };
  }, [productIds.join(',')]); // Only re-run if product IDs change

  return {
    prices,
    lastUpdate
  };
}