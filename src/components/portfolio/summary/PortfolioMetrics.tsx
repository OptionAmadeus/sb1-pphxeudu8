import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

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

interface MetricCardProps {
  label: string;
  value: string;
  icon: JSX.Element;
  trend?: 'up' | 'down';
}

function MetricCard({ label, value, icon, trend }: MetricCardProps) {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : '';

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <p className={`text-lg sm:text-2xl font-bold ${trendColor}`}>
        {value}
      </p>
    </div>
  );
}