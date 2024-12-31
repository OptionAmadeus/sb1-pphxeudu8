export const mockAssets = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 1.25,
    price: 52000,
    value: 65000,
    change24h: 2.5,
    costBasis: 45000,
    profitLoss: 8750
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 15.5,
    price: 2800,
    value: 43400,
    change24h: 3.2,
    costBasis: 2400,
    profitLoss: 6200
  }
];

export const mockTransactions = [
  {
    id: 'tx1',
    type: 'buy',
    asset: 'BTC',
    amount: 0.5,
    price: 51000,
    timestamp: new Date(Date.now() - 86400000),
    status: 'completed'
  },
  {
    id: 'tx2',
    type: 'sell',
    asset: 'ETH',
    amount: 2.5,
    price: 2750,
    timestamp: new Date(Date.now() - 172800000),
    status: 'completed'
  }
];