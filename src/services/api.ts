import type { Asset, Transaction, TradeRecommendation } from '../types/portfolio';
import { mockAssets, mockTransactions, mockRecommendations } from '../lib/mock/portfolioData';

// In a real implementation, these would make actual API calls
// For now, we're using mock data

export async function fetchPortfolioData(): Promise<{ 
  assets: Asset[]; 
  transactions: Transaction[]; 
}> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    assets: mockAssets,
    transactions: mockTransactions
  };
}

export async function fetchRecommendations(): Promise<TradeRecommendation[]> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockRecommendations;
}