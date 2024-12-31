import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency, formatCryptoAmount } from '@/utils/formatters';
import { EmptyState } from '../ui/EmptyState';

export function ActivityHistory() {
  const { transactions } = usePortfolioStore();

  if (transactions.length === 0) {
    return <EmptyState message="No recent activity" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Activity History</h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {tx.type === 'buy' ? (
                <ArrowDownRight className="w-5 h-5 text-green-500" />
              ) : tx.type === 'sell' ? (
                <ArrowUpRight className="w-5 h-5 text-red-500" />
              ) : (
                <RefreshCw className="w-5 h-5 text-blue-500" />
              )}
              <div>
                <p className="font-medium">
                  {tx.type.toUpperCase()} {formatCryptoAmount(tx.amount)} {tx.asset}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(tx.amount * tx.price)}</p>
              <p className="text-sm text-gray-500">
                @ {formatCurrency(tx.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}