import { ApiService } from './api/ApiService';
import { API_CONFIG } from '../config/api';
import type { Asset, Transaction, TradeRecommendation } from '../types/portfolio';

export class PortfolioService extends ApiService {
  async getAssets(): Promise<Asset[]> {
    const response = await this.get<{ data: Asset[] }>(API_CONFIG.endpoints.portfolio.assets);
    return response.data;
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.get<{ data: Transaction[] }>(API_CONFIG.endpoints.portfolio.transactions);
    return response.data;
  }

  async getRecommendations(): Promise<TradeRecommendation[]> {
    const response = await this.get<{ data: TradeRecommendation[] }>(API_CONFIG.endpoints.portfolio.recommendations);
    return response.data;
  }
}

export const portfolioService = new PortfolioService();