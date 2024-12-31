import React from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { PortfolioSummary } from './PortfolioSummary';
import { AssetList } from './AssetList';
import { ActivityHistory } from './ActivityHistory';
import { PerformanceChart } from './PerformanceChart';
import { WalletConnect } from '../WalletConnect';

export function PortfolioOverview() {
  const { isConnected } = usePortfolioStore();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Connect your Coinbase wallet to view your portfolio, track performance, and get AI-powered recommendations.
        </p>
        <WalletConnect />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PortfolioSummary />
      <PerformanceChart />
      <AssetList />
      <ActivityHistory />
    </div>
  );
}