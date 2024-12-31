import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolioStore } from '../stores/portfolio';

export function PerformanceChart() {
  const { performanceHistory, isConnected } = usePortfolioStore();

  if (!isConnected) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
              labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            />
            <Line 
              type="monotone" 
              dataKey="totalValue" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}