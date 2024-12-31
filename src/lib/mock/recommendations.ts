import type { TradeRecommendation } from '@/types/portfolio';

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
  }
];