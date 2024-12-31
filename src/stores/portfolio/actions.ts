import { coinbaseClient } from '@/lib/coinbase/client';
import { calculatePortfolioStats } from '@/utils/portfolio';
import type { PortfolioState, PortfolioActions } from './types';

export const createPortfolioActions = (set: (fn: (state: PortfolioState) => Partial<PortfolioState>) => void): PortfolioActions => ({
  refreshPortfolio: async () => {
    try {
      set(state => ({ ...state, isLoading: true, error: null }));
      
      // Get real balances from Coinbase
      const accounts = await coinbaseClient.getAccounts();
      const assets = accounts.map(account => ({
        id: account.currency.toLowerCase(),
        symbol: account.currency,
        name: account.currency,
        balance: parseFloat(account.balance),
        price: parseFloat(account.price || '0'),
        value: parseFloat(account.balance) * parseFloat(account.price || '0'),
        change24h: parseFloat(account.change24h || '0')
      }));

      // Calculate portfolio stats
      const stats = calculatePortfolioStats(assets);
      
      set(state => ({
        ...state,
        assets,
        isLoading: false,
        stats,
        lastUpdated: new Date()
      }));
    } catch (error) {
      set(state => ({
        ...state,
        error: (error as Error).message,
        isLoading: false
      }));
    }
  },

  getRecommendations: async () => {
    try {
      set(state => ({ ...state, isLoading: true, error: null }));
      const recommendations = await coinbaseClient.getRecommendations();
      set(state => ({ ...state, recommendations, isLoading: false }));
    } catch (error) {
      set(state => ({
        ...state,
        error: (error as Error).message,
        isLoading: false
      }));
    }
  },

  setWalletAddress: (address: string) => {
    set(state => ({
      ...state,
      walletAddress: address,
      isConnected: true
    }));
  },

  clearPortfolio: () => {
    set(state => ({
      ...state,
      assets: [],
      transactions: [],
      recommendations: [],
      performanceHistory: [],
      walletAddress: null,
      isConnected: false
    }));
  }
});