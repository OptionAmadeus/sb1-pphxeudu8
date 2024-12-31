import type { Asset, Transaction } from '@/types/portfolio';

export function validateAsset(asset: Asset): boolean {
  return (
    typeof asset.balance === 'number' &&
    typeof asset.price === 'number' &&
    typeof asset.value === 'number' &&
    asset.balance >= 0 &&
    asset.price >= 0 &&
    asset.value >= 0
  );
}

export function validateTransaction(transaction: Transaction): boolean {
  return (
    typeof transaction.amount === 'number' &&
    typeof transaction.price === 'number' &&
    transaction.amount > 0 &&
    transaction.price >= 0 &&
    ['buy', 'sell', 'transfer'].includes(transaction.type)
  );
}