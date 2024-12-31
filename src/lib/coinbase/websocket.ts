import { CoinbaseError } from './errors';
import type { PriceUpdate } from './types';

export class CoinbaseWebSocket {
  private ws: WebSocket | null = null;
  private subscriptions: Set<string> = new Set();
  private messageHandlers: ((data: any) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: number | null = null;

  constructor() {
    this.connect();
  }

  private connect() {
    // Always use production WebSocket URL
    const baseUrl = 'wss://ws-feed.pro.coinbase.com';

    this.ws = new WebSocket(baseUrl);
    
    this.ws.onopen = () => {
      console.log('Connected to Coinbase WebSocket (Production)');
      this.reconnectAttempts = 0;
      this.subscribeToProducts(Array.from(this.subscriptions));
    };

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectTimeout = window.setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000));
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'ticker') {
          const update: PriceUpdate = {
            productId: data.product_id,
            price: parseFloat(data.price),
            time: new Date(data.time)
          };
          this.messageHandlers.forEach(handler => handler(update));
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
  }

  private subscribeToProducts(productIds: string[]) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const message = {
      type: 'subscribe',
      product_ids: productIds,
      channels: ['ticker']
    };

    this.ws.send(JSON.stringify(message));
  }

  subscribe(productIds: string | string[]) {
    const products = Array.isArray(productIds) ? productIds : [productIds];
    products.forEach(id => this.subscriptions.add(id));
    
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.subscribeToProducts(products);
    }
  }

  unsubscribe(productIds: string | string[]) {
    const products = Array.isArray(productIds) ? productIds : [productIds];
    products.forEach(id => this.subscriptions.delete(id));

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'unsubscribe',
        product_ids: products,
        channels: ['ticker']
      }));
    }
  }

  onPriceUpdate(handler: (update: PriceUpdate) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  close() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.messageHandlers = [];
  }
}

// Export singleton instance
export const coinbaseWebSocket = new CoinbaseWebSocket();