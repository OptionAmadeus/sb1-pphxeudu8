import { coinbaseClient } from '@/lib/coinbase/client';
import type { Asset, Transaction, TradeRecommendation } from '@/types/portfolio';
import { validateTransaction } from '@/utils/validation';

export class TradingService {
  async executeRecommendation(recommendation: TradeRecommendation): Promise<Transaction> {
    try {
      const order = await coinbaseClient.placeOrder({
        side: recommendation.action,
        size: recommendation.amount.toString(),
        productId: recommendation.asset,
        type: 'market'
      });

      const transaction: Transaction = {
        id: order.id,
        type: order.side,
        asset: order.productId,
        amount: parseFloat(order.size),
        price: order.price ? parseFloat(order.price) : 0,
        timestamp: new Date(order.createdAt),
        status: order.status === 'done' ? 'completed' : 'pending'
      };

      if (!validateTransaction(transaction)) {
        throw new Error('Invalid transaction data received from Coinbase');
      }

      return transaction;
    } catch (error) {
      console.error('Failed to execute trade:', error);
      throw error;
    }
  }

  async getPortfolioBalance(): Promise<Asset[]> {
    try {
      const accounts = await coinbaseClient.getAccounts();
      
      return accounts.map(account => ({
        id: account.currency.toLowerCase(),
        symbol: account.currency,
        name: account.currency,
        balance: parseFloat(account.balance),
        price: 0, // Price needs to be fetched separately
        value: 0, // Value will be calculated after getting prices
        change24h: 0 // 24h change needs to be fetched separately
      }));
    } catch (error) {
      console.error('Failed to fetch balances:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const tradingService = new TradingService();