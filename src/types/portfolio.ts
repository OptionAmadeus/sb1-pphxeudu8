export interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
  costBasis?: number;
  profitLoss?: number;
}

export interface PortfolioStats {
  totalValue: number;
  totalChange24h: number;
  totalProfitLoss: number;
  totalROI: number;
  lastUpdated: Date;
}

export interface TradeRecommendation {
  action: 'buy' | 'sell' | 'hold';
  asset: string;
  amount: number;
  reason: string;
  confidence: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  asset: string;
  amount: number;
  price: number;
  timestamp: Date;
  fee?: number;
  status: 'completed' | 'pending' | 'failed';
}

export interface PerformanceMetric {
  timestamp: Date;
  totalValue: number;
  dailyReturn: number;
  totalReturn: number;
}