// Add these types to the existing types.ts file
export interface CoinbaseConfig {
  apiKey: string;
  apiSecret: string;
  sandbox: boolean;
}

export interface CoinbaseBalance {
  id: string;
  currency: string;
  balance: string;
  available: string;
  hold: string;
}

export interface CoinbaseOrder {
  id: string;
  side: 'buy' | 'sell';
  productId: string;
  size: string;
  price?: string;
  type: 'market' | 'limit';
  status: 'pending' | 'open' | 'done' | 'rejected';
  createdAt: string;
}

export interface TradeDecision {
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reason: string;
}

export interface PriceUpdate {
  productId: string;
  price: number;
  time: Date;
}