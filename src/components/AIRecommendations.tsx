import React from 'react';
import { Brain, RefreshCw } from 'lucide-react';
import { usePortfolioStore } from '../stores/portfolio';

export function AIRecommendations() {
  const { recommendations, isConnected, isLoading, getRecommendations } = usePortfolioStore();

  if (!isConnected) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Recommendations</h2>
        <button
          onClick={getRecommendations}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span className="font-semibold capitalize">{rec.action} {rec.asset}</span>
              </div>
              <p className="text-gray-600 mb-2">{rec.reason}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Amount: {rec.amount}</span>
                <span>Confidence: {(rec.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          No recommendations available. Click refresh to get new insights.
        </p>
      )}
    </div>
  );
}