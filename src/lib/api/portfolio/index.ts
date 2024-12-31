import { apiClient } from '../client';
import type { Asset, Transaction, TradeRecommendation } from '@/types/portfolio';
import type { ApiResponse } from '../types';

export const portfolioApi = {
  getAssets: () => 
    apiClient.get<ApiResponse<Asset[]>>('/portfolio/assets'),
    
  getTransactions: () => 
    apiClient.get<ApiResponse<Transaction[]>>('/portfolio/transactions'),
    
  getRecommendations: () => 
    apiClient.get<ApiResponse<TradeRecommendation[]>>('/portfolio/recommendations'),
};