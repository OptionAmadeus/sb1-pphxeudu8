import { useCallback } from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { CACHE_CONFIG } from '@/config/constants';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';

export function usePortfolioData() {
  const { error, isLoading, refreshPortfolio, getRecommendations } = usePortfolioStore();

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshPortfolio(),
      getRecommendations()
    ]);
  }, [refreshPortfolio, getRecommendations]);

  useAutoRefresh({
    onRefresh: refreshPortfolio,
    interval: CACHE_CONFIG.portfolioTTL
  });

  useAutoRefresh({
    onRefresh: getRecommendations,
    interval: CACHE_CONFIG.marketDataTTL
  });

  return { isLoading, error, refreshAll };
}