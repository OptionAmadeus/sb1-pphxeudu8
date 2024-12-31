import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

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
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Asset</th>
                  <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Balance</th>
                  <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Value</th>
                  <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-right text-sm font-semibold text-gray-900">24h</th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">P/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {assets.map(asset => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="font-medium text-gray-900">{asset.name}</div>
                      <div className="text-gray-500">{asset.symbol}</div>
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                      {asset.balance.toFixed(8)}
                    </td>
                    <td className="hidden md:table-cell whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                      {formatCurrency(asset.price)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                      {formatCurrency(asset.value)}
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-right text-sm">
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
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm">
                      <span className={(asset.profitLoss || 0) >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {formatCurrency(asset.profitLoss || 0)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}