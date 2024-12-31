import type { Asset, Transaction, TradeRecommendation } from '../../types/portfolio';

export const mockAssets: Asset[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 1.25,
    price: 52000,
    value: 65000,
    change24h: 2.5,
    costBasis: 45000,
    profitLoss: 8750
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 15.5,
    price: 2800,
    value: 43400,
    change24h: 3.2,
    costBasis: 2400,
    profitLoss: 6200
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    balance: 250,
    price: 110,
    value: 27500,
    change24h: -1.8,
    costBasis: 95,
    profitLoss: 3750
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'buy',
    asset: 'BTC',
    amount: 0.5,
    price: 51000,
    timestamp: new Date(Date.now() - 86400000),
    status: 'completed'
  },
  {
    id: 'tx2',
    type: 'sell',
    asset: 'ETH',
    amount: 2.5,
    price: 2750,
    timestamp: new Date(Date.now() - 172800000),
    status: 'completed'
  },
  {
    id: 'tx3',
    type: 'buy',
    asset: 'SOL',
    amount: 100,
    price: 105,
    timestamp: new Date(Date.now() - 259200000),
    status: 'completed'
  }
];

export const mockRecommendations: TradeRecommendation[] = [
  {
    action: 'buy',
    asset: 'BTC',
    amount: 0.25,
    reason: 'Strong upward momentum and positive market sentiment',
    confidence: 0.85
  },
  {
    action: 'hold',
    asset: 'ETH',
    amount: 0,
    reason: 'Price consolidation phase, maintain current position',
    confidence: 0.75
  },
  {
    action: 'sell',
    asset: 'SOL',
    amount: 50,
    reason: 'Technical indicators suggest short-term correction',
    confidence: 0.65
  }
];