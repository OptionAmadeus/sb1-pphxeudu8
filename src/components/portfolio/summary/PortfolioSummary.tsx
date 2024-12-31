import { usePortfolioStore } from '@/stores/portfolio';
import { PortfolioMetrics } from './PortfolioMetrics';

export function PortfolioSummary() {
  const { stats } = usePortfolioStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
      <PortfolioMetrics 
        totalValue={stats.totalValue} 
        change24h={stats.totalChange24h} 
      />
    </div>
  );
}