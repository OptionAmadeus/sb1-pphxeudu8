import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (timestamp: number) => string;
}

export function LineChart({
  data,
  height = 400,
  valueFormatter = (value) => `$${value.toLocaleString()}`,
  dateFormatter = (timestamp) => new Date(timestamp).toLocaleDateString()
}: LineChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={dateFormatter}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => [valueFormatter(value), 'Value']}
            labelFormatter={(timestamp: number) => dateFormatter(timestamp)}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}