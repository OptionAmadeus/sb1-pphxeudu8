import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolioStore } from '@/stores/portfolio';

export function PerformanceChart() {
  const { stats } = usePortfolioStore();
  
  // Mock performance data - replace with real data in production
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    value: stats.totalValue * (1 + Math.sin(i / 5) * 0.1)
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
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