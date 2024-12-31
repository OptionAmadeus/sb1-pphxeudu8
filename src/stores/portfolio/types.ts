import type { Asset, Transaction, TradeRecommendation } from '@/types/portfolio';

export interface PortfolioState {
  assets: Asset[];
  transactions: Transaction[];
  recommendations: TradeRecommendation[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  performanceHistory: Array<{ timestamp: number; totalValue: number }>;
  walletAddress: string | null;
}

export interface PortfolioActions {
  refreshPortfolio: () => Promise<void>;
  getRecommendations: () => Promise<void>;
  setWalletAddress: (address: string) => void;
  clearPortfolio: () => void;
}

export type PortfolioStore = PortfolioState & PortfolioActions;