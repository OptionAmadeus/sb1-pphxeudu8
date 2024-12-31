import { create } from 'zustand';
import type { Asset, PortfolioStats, TradeRecommendation, Transaction } from '../types/portfolio';
import { fetchPortfolioData, fetchRecommendations } from '../services/api';
import { calculatePortfolioStats } from '../utils/portfolio';

interface PortfolioState {
  assets: Asset[];
  transactions: Transaction[];
  stats: PortfolioStats;
  recommendations: TradeRecommendation[];
  isLoading: boolean;
  error: string | null;
  
  refreshPortfolio: () => Promise<void>;
  getRecommendations: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: [],
  transactions: [],
  stats: {
    totalValue: 0,
    totalChange24h: 0,
    totalProfitLoss: 0,
    totalROI: 0,
    lastUpdated: new Date()
  },
  recommendations: [],
  isLoading: false,
  error: null,

  refreshPortfolio: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await fetchPortfolioData();
      set({ 
        assets: data.assets,
        transactions: data.transactions,
        stats: calculatePortfolioStats(data.assets)
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  getRecommendations: async () => {
    try {
      set({ isLoading: true, error: null });
      const recommendations = await fetchRecommendations();
      set({ recommendations });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  }
}));