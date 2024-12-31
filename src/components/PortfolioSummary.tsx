import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePortfolioStore } from '../stores/portfolio';

export function PortfolioSummary() {
  const { stats, isConnected } = usePortfolioStore();

  if (!isConnected) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">24h Change</p>
          <div className="flex items-center gap-1">
            {stats.totalChange24h >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <p className={`text-2xl font-bold ${
              stats.totalChange24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stats.totalChange24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}