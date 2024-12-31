import React from 'react';
import { RecommendationCard } from './RecommendationCard';
import type { TradeRecommendation } from '@/types/portfolio';
import { EmptyState } from '../ui/EmptyState';

interface RecommendationListProps {
  recommendations: TradeRecommendation[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return <EmptyState message="No recommendations available" />;
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard key={index} recommendation={recommendation} />
      ))}
    </div>
  );
}