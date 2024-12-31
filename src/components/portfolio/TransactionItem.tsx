import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import type { Transaction } from '@/types/portfolio';
import { formatCurrency, formatCryptoAmount } from '@/utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'buy':
        return <ArrowDownRight className="w-5 h-5 text-green-500" />;
      case 'sell':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <p className="font-medium">
            {transaction.type.toUpperCase()} {formatCryptoAmount(transaction.amount)} {transaction.asset}
          </p>
          <p className="text-sm text-gray-500">
            {transaction.timestamp.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(transaction.amount * transaction.price)}</p>
        <p className="text-sm text-gray-500">
          @ {formatCurrency(transaction.price)}
        </p>
      </div>
    </div>
  );
}