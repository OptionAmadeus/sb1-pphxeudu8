import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import type { Asset } from '@/types/portfolio';

export class CoinbaseService {
  private provider: any;

  constructor() {
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: import.meta.env.VITE_COINBASE_APP_NAME || 'Self AI',
      appLogoUrl: import.meta.env.VITE_COINBASE_APP_LOGO_URL,
      darkMode: false,
      overrideIsMetaMask: false
    });

    this.provider = coinbaseWallet.makeWeb3Provider(
      `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`,
      1
    );
  }

  async connect(): Promise<string> {
    try {
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts'
      });
      return accounts[0];
    } catch (error) {
      throw new Error('Failed to connect wallet: ' + (error as Error).message);
    }
  }

  async disconnect(): Promise<void> {
    await this.provider.disconnect();
  }

  async getAssets(): Promise<Asset[]> {
    // Implementation would fetch real data from Coinbase API
    // This is a mock implementation
    return [
      {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        balance: 0.5,
        price: 50000,
        value: 25000,
        change24h: 2.5
      }
    ];
  }
}