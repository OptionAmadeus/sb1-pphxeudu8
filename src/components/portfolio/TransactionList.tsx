import React from 'react';
import { TransactionItem } from './TransactionItem';
import type { Transaction } from '@/types/portfolio';
import { EmptyState } from '../ui/EmptyState';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return <EmptyState message="No transactions found" />;
  }

  return (
    <div className="space-y-4">
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}