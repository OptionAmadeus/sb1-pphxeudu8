import React from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { RecommendationCard } from './RecommendationCard';
import { RefreshButton } from './RefreshButton';

export function RecommendationList() {
  const { recommendations, isLoading, getRecommendations } = usePortfolioStore();

  return (
    <div>
      <div className="flex justify-end mb-4">
        <RefreshButton onClick={getRecommendations} isLoading={isLoading} />
      </div>
      
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <RecommendationCard key={index} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
}