import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useCoinbaseTrading } from '@/hooks/useCoinbaseTrading';
import { PriceDisplay } from './PriceDisplay';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { TradeRecommendation } from '@/types/portfolio';

interface TradingPanelProps {
  productId: string;
  recommendation?: TradeRecommendation;
}

export function TradingPanel({ productId, recommendation }: TradingPanelProps) {
  const { executeTrade, isExecuting, error } = useCoinbaseTrading();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTrade = async () => {
    if (!recommendation) return;
    
    try {
      const result = await executeTrade(recommendation);
      if (result) {
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3000);
      }
    } catch (err) {
      console.error('Trade execution failed:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Trading Panel</h2>
        <PriceDisplay productId={productId} />
      </div>

      {error && <ErrorMessage message={error.message} />}

      {recommendation && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            {recommendation.action === 'buy' ? (
              <ArrowDownRight className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium capitalize">{recommendation.action}</span>
          </div>
          
          <p className="text-gray-600 mb-4">{recommendation.reason}</p>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Amount: {recommendation.amount} {productId.split('-')[0]}
            </span>
            <span className="text-sm text-gray-500">
              Confidence: {(recommendation.confidence * 100).toFixed(0)}%
            </span>
          </div>

          <button
            onClick={handleTrade}
            disabled={isExecuting}
            className={`
              w-full py-2 px-4 rounded-lg font-medium
              ${recommendation.action === 'buy'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isExecuting ? (
              <LoadingSpinner size="sm" />
            ) : (
              `Execute ${recommendation.action.toUpperCase()}`
            )}
          </button>
        </div>
      )}

      {showConfirmation && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          Trade executed successfully!
        </div>
      )}
    </div>
  );
}