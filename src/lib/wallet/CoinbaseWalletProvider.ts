import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import type { WalletProvider } from './types';
import { WalletError } from './types';
import { config } from '../../config/environment';

export class CoinbaseWalletProvider implements WalletProvider {
  private sdk: CoinbaseWalletSDK;
  private provider: any;

  constructor() {
    this.sdk = new CoinbaseWalletSDK({
      appName: config.coinbaseConfig.appName,
      appLogoUrl: config.coinbaseConfig.appLogoUrl,
      overrideIsMetaMask: false
    });
    
    this.provider = this.sdk.makeWeb3Provider(
      `https://mainnet.infura.io/v3/${config.infuraId}`
    );
  }

  // Rest of the implementation remains the same
}