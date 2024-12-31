import React from 'react';
import { LineChart } from '@/components/charts/LineChart';
import { usePriceHistory } from '@/hooks/usePriceHistory';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface PriceHistoryChartProps {
  productId: string;
  height?: number;
}

export function PriceHistoryChart({ productId, height = 400 }: PriceHistoryChartProps) {
  const { data, isLoading, error } = usePriceHistory(productId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const chartData = data.map(point => ({
    timestamp: point.time.getTime(),
    value: point.close
  }));

  return (
    <LineChart
      data={chartData}
      height={height}
      valueFormatter={(value) => `$${value.toLocaleString()}`}
      dateFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
    />
  );
}