import { init } from '@web3-onboard/react';
import coinbaseWallet from '@web3-onboard/coinbase';
import { config } from '../../config/environment';

const coinbaseWalletModule = coinbaseWallet();

export const initOnboard = init({
  wallets: [coinbaseWalletModule],
  chains: [{
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${config.infuraId}`
  }],
  appMetadata: {
    name: 'AI Crypto Portfolio',
    icon: '<svg>...</svg>', // Add your app icon SVG here
    description: 'AI-powered crypto portfolio management'
  }
});