import React, { useEffect } from 'react';
import { PortfolioOverview } from '../portfolio/PortfolioOverview';
import { usePortfolioStore } from '../../stores/portfolio';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export function AppMain() {
  const { isLoading, error, refreshPortfolio } = usePortfolioStore();

  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PortfolioOverview />
    </main>
  );
}