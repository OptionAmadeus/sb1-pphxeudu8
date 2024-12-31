import type { Asset, PortfolioStats } from '../types/portfolio';

export function calculatePortfolioStats(assets: Asset[]): PortfolioStats {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalProfitLoss = assets.reduce((sum, asset) => sum + (asset.profitLoss || 0), 0);
  const totalCost = assets.reduce((sum, asset) => sum + (asset.costBasis || 0) * asset.balance, 0);
  
  return {
    totalValue,
    totalChange24h: assets.reduce((acc, asset) => acc + (asset.change24h * asset.value) / totalValue, 0),
    totalProfitLoss,
    totalROI: totalCost ? (totalProfitLoss / totalCost) * 100 : 0,
    lastUpdated: new Date()
  };
}