import { describe, it, expect } from 'vitest';
import { analyzeTrade, calculateOrderSize } from '@/lib/coinbase/trading';

describe('Trading Analysis', () => {
  it('should recommend hold for small price movements', () => {
    const decision = analyzeTrade(100, 102, 0.05);
    expect(decision.action).toBe('hold');
  });

  it('should recommend buy for significant price drops', () => {
    const decision = analyzeTrade(90, 100, 0.05);
    expect(decision.action).toBe('buy');
    expect(decision.confidence).toBeGreaterThan(0.5);
  });

  it('should calculate appropriate order size based on risk', () => {
    const size = calculateOrderSize(10000, 50000, 0.02);
    expect(size).toBe(0.004); // 2% of $10000 / $50000 per BTC
  });
});