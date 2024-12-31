import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { EmptyState } from '../ui/EmptyState';

export function AssetList() {
  const { assets } = usePortfolioStore();

  if (assets.length === 0) {
    return <EmptyState message="No assets found in your portfolio" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Assets</h2>
      <div className="space-y-4">
        {assets.map(asset => (
          <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold">{asset.name}</p>
              <p className="text-sm text-gray-500">{asset.symbol}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatCurrency(asset.value)}</p>
              <div className="flex items-center gap-1 justify-end">
                {asset.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {formatPercentage(asset.change24h)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}