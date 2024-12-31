import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  className?: string;
}

export function MetricCard({ label, value, icon, trend, className = '' }: MetricCardProps) {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : '';

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
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