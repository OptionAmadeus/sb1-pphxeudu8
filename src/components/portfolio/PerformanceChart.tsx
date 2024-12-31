import React from 'react';
import { LineChart } from '../charts/LineChart';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency } from '@/utils/formatters';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export function PerformanceChart() {
  const { performanceHistory, stats } = usePortfolioStore();

  if (!performanceHistory?.length) {
    return <EmptyState message="No performance data available" />;
  }

  const chartData = performanceHistory.map(point => ({
    timestamp: point.timestamp,
    value: point.totalValue
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Value */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Total Value</span>
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalValue)}
            </div>
          </div>

          {/* 24h Change */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Percent className="w-4 h-4" />
              <span className="text-sm">24h Change</span>
            </div>
            <div className="flex items-center gap-2">
              {stats.totalChange24h >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span className={`text-2xl font-bold ${
                stats.totalChange24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {stats.totalChange24h.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Total P/L */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Total P/L</span>
            </div>
            <div className={`text-2xl font-bold ${
              stats.totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {formatCurrency(stats.totalProfitLoss)}
            </div>
          </div>

          {/* ROI */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Percent className="w-4 h-4" />
              <span className="text-sm">ROI</span>
            </div>
            <div className={`text-2xl font-bold ${
              stats.totalROI >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stats.totalROI.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <LineChart
          data={chartData}
          valueFormatter={formatCurrency}
          dateFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
        />
      </div>

      <div className="mt-4 text-sm text-gray-500 text-right">
        Last updated: {stats.lastUpdated.toLocaleString()}
      </div>
    </div>
  );
}