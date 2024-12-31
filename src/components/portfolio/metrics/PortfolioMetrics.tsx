import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

interface PortfolioMetricsProps {
  totalValue: number;
  change24h: number;
}

export function PortfolioMetrics({ totalValue, change24h }: PortfolioMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <MetricCard
        label="Total Value"
        value={formatCurrency(totalValue)}
        icon={<DollarSign className="w-5 h-5 text-blue-600" />}
      />
      <MetricCard
        label="24h Change"
        value={formatPercentage(change24h)}
        icon={change24h >= 0 
          ? <TrendingUp className="w-5 h-5 text-green-500" />
          : <TrendingDown className="w-5 h-5 text-red-500" />
        }
        trend={change24h >= 0 ? 'up' : 'down'}
      />
    </div>
  );
}