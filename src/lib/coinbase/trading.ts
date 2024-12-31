import type { TradeDecision } from './types';

export function analyzeTrade(
  currentPrice: number,
  previousPrice: number,
  volatility: number = 0.05
): TradeDecision {
  const priceChange = (currentPrice - previousPrice) / previousPrice;
  
  if (Math.abs(priceChange) < volatility) {
    return {
      action: 'hold',
      confidence: 0.7,
      reason: 'Price movement within normal range'
    };
  }

  if (priceChange < -volatility) {
    return {
      action: 'buy',
      confidence: Math.min(Math.abs(priceChange) * 5, 0.9),
      reason: 'Significant price drop detected'
    };
  }

  return {
    action: 'sell',
    confidence: Math.min(priceChange * 5, 0.9),
    reason: 'Significant price increase detected'
  };
}

export function calculateOrderSize(
  availableBalance: number,
  currentPrice: number,
  riskPercentage: number = 0.02
): number {
  const maxRiskAmount = availableBalance * riskPercentage;
  return maxRiskAmount / currentPrice;
}