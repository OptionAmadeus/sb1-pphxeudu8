import type { TradeRecommendation } from '@/types/portfolio';
import { mockRecommendations } from '@/lib/mock/recommendations';

export class RecommendationsService {
  async getRecommendations(): Promise<TradeRecommendation[]> {
    // In production, this would make an API call to the backend
    // For now, return mock data
    return mockRecommendations;
  }
}

export const recommendationsService = new RecommendationsService();