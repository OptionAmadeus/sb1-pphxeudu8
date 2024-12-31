import type { PortfolioState } from './types';

export const initialState: PortfolioState = {
  assets: [],
  transactions: [],
  recommendations: [],
  performanceHistory: [], // Initialize empty array
  stats: {
    totalValue: 0,
    totalChange24h: 0,
    totalProfitLoss: 0,
    totalROI: 0,
    lastUpdated: new Date()
  },
  isConnected: false,
  walletAddress: null,
  isLoading: false,
  error: null
};