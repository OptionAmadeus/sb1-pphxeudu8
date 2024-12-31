import React from 'react';
import { TableHeader } from './TableHeader';
import { AssetRow } from './AssetRow';
import { usePortfolioStore } from '../../../stores/portfolio';

export function PositionsTable() {
  const { assets } = usePortfolioStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Current Positions</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Asset</TableHeader>
                  <TableHeader align="right">Balance</TableHeader>
                  <TableHeader align="right">Price</TableHeader>
                  <TableHeader align="right">Value</TableHeader>
                  <TableHeader align="right">24h</TableHeader>
                  <TableHeader align="right">P/L</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {assets.map(asset => (
                  <AssetRow key={asset.id} asset={asset} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}