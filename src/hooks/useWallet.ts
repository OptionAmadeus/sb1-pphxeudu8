import { useConnectWallet } from '@web3-onboard/react';
import { useCallback, useEffect } from 'react';
import { usePortfolioStore } from '../stores/portfolio';

export function useWallet() {
  const [{ wallet }] = useConnectWallet();
  const { setWalletAddress, clearPortfolio } = usePortfolioStore();

  const handleWalletChange = useCallback(() => {
    if (wallet?.accounts[0]?.address) {
      setWalletAddress(wallet.accounts[0].address);
    } else {
      clearPortfolio();
    }
  }, [wallet, setWalletAddress, clearPortfolio]);

  useEffect(() => {
    handleWalletChange();
  }, [handleWalletChange]);

  return {
    isConnected: !!wallet,
    address: wallet?.accounts[0]?.address
  };
}