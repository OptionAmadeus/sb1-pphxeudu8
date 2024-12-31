import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency, formatCryptoAmount } from '@/utils/formatters';

export function TradeHistory() {
  const { transactions } = usePortfolioStore();

  if (!transactions.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No trading history available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {tx.type === 'buy' ? (
              <ArrowDownRight className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="font-medium">
                {tx.type.toUpperCase()} {formatCryptoAmount(tx.amount)} {tx.asset}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {new Date(tx.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {formatCurrency(tx.amount * tx.price)}
            </p>
            <p className="text-sm text-gray-500">
              @ {formatCurrency(tx.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}