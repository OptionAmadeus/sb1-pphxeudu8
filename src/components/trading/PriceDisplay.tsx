import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCoinbasePrices } from '@/hooks/useCoinbasePrices';
import { formatCurrency } from '@/utils/formatters';

interface PriceDisplayProps {
  productId: string;
  showChange?: boolean;
}

export function PriceDisplay({ productId, showChange = true }: PriceDisplayProps) {
  const { prices, lastUpdate } = useCoinbasePrices([productId]);
  const price = prices[productId];

  if (!price) {
    return (
      <div className="animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{formatCurrency(price)}</span>
      {showChange && lastUpdate && (
        <div className="flex items-center text-sm">
          {price > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className="text-gray-500 text-xs">
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
}