import React from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function PortfolioSummary() {
  const { stats, isConnected } = usePortfolioStore();

  if (!isConnected) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total Value</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {stats.totalChange24h >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-gray-600">24h Change</span>
          </div>
          <p className={`text-2xl font-bold ${
            stats.totalChange24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {formatPercentage(stats.totalChange24h)}
          </p>
        </div>
      </div>
    </div>
  );
}