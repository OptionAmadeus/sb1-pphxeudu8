import type { Asset } from '@/types/portfolio';

export function calculateTotalValue(assets: Asset[]): number {
  return assets.reduce((sum, asset) => sum + asset.value, 0);
}

export function calculateTotalChange(assets: Asset[]): number {
  const totalValue = calculateTotalValue(assets);
  return assets.reduce((acc, asset) => 
    acc + (asset.change24h * asset.value) / totalValue, 0);
}

export function calculateProfitLoss(assets: Asset[]): number {
  return assets.reduce((sum, asset) => sum + (asset.profitLoss || 0), 0);
}

export function calculateROI(assets: Asset[]): number {
  const totalCost = assets.reduce((sum, asset) => 
    sum + (asset.costBasis || 0) * asset.balance, 0);
  const profitLoss = calculateProfitLoss(assets);
  return totalCost ? (profitLoss / totalCost) * 100 : 0;
}