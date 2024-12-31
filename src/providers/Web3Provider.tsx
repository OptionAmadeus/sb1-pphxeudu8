import React from 'react';
import { Web3OnboardProvider } from '@web3-onboard/react';
import { initOnboard } from '../lib/wallet/onboard';

const web3Onboard = initOnboard;

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
}