import { logger } from '../utils/logger.js';
import { mockRecommendations } from '../lib/mock/recommendations.js';

export async function getRecommendations(req, res, next) {
  try {
    // For now, return mock data instead of making OpenAI calls
    res.json(mockRecommendations);
  } catch (error) {
    logger.error('Failed to generate recommendations:', error);
    next(error);
  }
}