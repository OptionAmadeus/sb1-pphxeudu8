import { ApiService } from './api/ApiService';
import { API_CONFIG } from '../config/api';
import type { TradeRecommendation } from '../types/portfolio';

export class AIService extends ApiService {
  async getRecommendations(): Promise<TradeRecommendation[]> {
    const response = await this.get<{ data: TradeRecommendation[] }>(
      API_CONFIG.endpoints.portfolio.recommendations
    );
    return response.data;
  }
}

export const aiService = new AIService();