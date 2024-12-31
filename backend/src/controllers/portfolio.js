import { logger } from '../utils/logger.js';
import { mockAssets, mockTransactions } from '../utils/mockData.js';

export async function getPortfolioData(req, res, next) {
  try {
    // TODO: Replace with real data from database
    res.json({
      assets: mockAssets,
      transactions: mockTransactions
    });
  } catch (error) {
    logger.error('Failed to fetch portfolio data:', error);
    next(error);
  }
}

export async function getTransactionHistory(req, res, next) {
  try {
    // TODO: Replace with real data from database
    res.json(mockTransactions);
  } catch (error) {
    logger.error('Failed to fetch transaction history:', error);
    next(error);
  }
}