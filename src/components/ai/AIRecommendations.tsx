import React from 'react';
import { RecommendationList } from './RecommendationList';
import { RefreshButton } from './RefreshButton';
import { usePortfolioStore } from '@/stores/portfolio';

export function AIRecommendations() {
  const { recommendations, isLoading, getRecommendations } = usePortfolioStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Recommendations</h2>
        <RefreshButton onClick={getRecommendations} isLoading={isLoading} />
      </div>
      <RecommendationList recommendations={recommendations} />
    </div>
  );
}