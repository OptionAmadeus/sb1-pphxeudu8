import { ApiService } from '../api/ApiService';
import { API_CONFIG } from '@/config/api';
import type { Asset, Transaction, TradeRecommendation } from '@/types/portfolio';

export class PortfolioService extends ApiService {
  async getAssets(): Promise<Asset[]> {
    return this.get(API_CONFIG.endpoints.portfolio.assets);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.get(API_CONFIG.endpoints.portfolio.transactions);
  }

  async getRecommendations(): Promise<TradeRecommendation[]> {
    return this.get(API_CONFIG.endpoints.portfolio.recommendations);
  }
}

export const portfolioService = new PortfolioService();