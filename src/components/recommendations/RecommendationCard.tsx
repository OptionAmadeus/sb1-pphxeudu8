import React from 'react';
import { Brain } from 'lucide-react';
import type { TradeRecommendation } from '@/types/portfolio';

interface RecommendationCardProps {
  recommendation: TradeRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-purple-500" />
        <span className="font-semibold capitalize">
          {recommendation.action} {recommendation.asset}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-2">{recommendation.reason}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Amount: {recommendation.amount}</span>
        <span>Confidence: {(recommendation.confidence * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}