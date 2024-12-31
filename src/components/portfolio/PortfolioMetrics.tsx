import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface MetricProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  type?: 'currency' | 'percentage';
}

function Metric({ label, value, icon, type = 'currency' }: MetricProps) {
  const formattedValue = type === 'currency' 
    ? formatCurrency(value)
    : formatPercentage(value);

  const isPositive = value >= 0;
  const valueColor = type === 'percentage'
    ? isPositive ? 'text-green-500' : 'text-red-500'
    : 'text-gray-900';

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <p className={`text-lg sm:text-2xl font-bold ${valueColor}`}>
        {formattedValue}
      </p>
    </div>
  );
}

interface PortfolioMetricsProps {
  totalValue: number;
  change24h: number;
}

export function PortfolioMetrics({ totalValue, change24h }: PortfolioMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Metric
        label="Total Value"
        value={totalValue}
        icon={<DollarSign className="w-5 h-5 text-blue-600" />}
        type="currency"
      />
      <Metric
        label="24h Change"
        value={change24h}
        icon={change24h >= 0 
          ? <TrendingUp className="w-5 h-5 text-green-500" />
          : <TrendingDown className="w-5 h-5 text-red-500" />
        }
        type="percentage"
      />
    </div>
  );
}