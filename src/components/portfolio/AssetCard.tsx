import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Asset } from '@/types/portfolio';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const isPositive = asset.change24h >= 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="font-semibold">{asset.name}</p>
        <p className="text-sm text-gray-500">{asset.symbol}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatCurrency(asset.value)}</p>
        <div className="flex items-center gap-1 justify-end">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {formatPercentage(asset.change24h)}
          </span>
        </div>
      </div>
    </div>
  );
}