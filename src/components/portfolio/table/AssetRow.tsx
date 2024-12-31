import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TableCell } from './TableCell';
import type { Asset } from '../../../types/portfolio';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

interface AssetRowProps {
  asset: Asset;
}

export function AssetRow({ asset }: AssetRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <TableCell>
        <div>
          <div className="font-medium text-gray-900">{asset.name}</div>
          <div className="text-gray-500">{asset.symbol}</div>
        </div>
      </TableCell>
      <TableCell align="right">
        {asset.balance.toFixed(8)}
      </TableCell>
      <TableCell align="right">
        {formatCurrency(asset.price)}
      </TableCell>
      <TableCell align="right">
        {formatCurrency(asset.value)}
      </TableCell>
      <TableCell align="right">
        <div className="flex items-center justify-end gap-1">
          {asset.change24h >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
            {formatPercentage(asset.change24h)}
          </span>
        </div>
      </TableCell>
      <TableCell align="right">
        <span className={(asset.profitLoss || 0) >= 0 ? 'text-green-500' : 'text-red-500'}>
          {formatCurrency(asset.profitLoss || 0)}
        </span>
      </TableCell>
    </tr>
  );
}