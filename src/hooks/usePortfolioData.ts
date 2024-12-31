import { useCallback } from 'react';
import { usePortfolioStore } from '../stores/portfolio';
import { useAutoRefresh } from './useAutoRefresh';
import { API_CONFIG } from '../config/api';

export function usePortfolioData() {
  const { error, isLoading, refreshPortfolio, getRecommendations } = usePortfolioStore();

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshPortfolio(),
      getRecommendations()
    ]);
  }, [refreshPortfolio, getRecommendations]);

  // Set up auto-refresh for portfolio data
  useAutoRefresh({
    onRefresh: refreshPortfolio,
    interval: API_CONFIG.refreshIntervals.portfolio
  });

  // Set up auto-refresh for recommendations
  useAutoRefresh({
    onRefresh: getRecommendations,
    interval: API_CONFIG.refreshIntervals.recommendations
  });

  return { isLoading, error, refreshAll };
}