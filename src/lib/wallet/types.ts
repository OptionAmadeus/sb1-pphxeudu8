export interface WalletProvider {
  connect(): Promise<string>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<string[]>;
  isConnected(): Promise<boolean>;
}

export class WalletError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'WalletError';
  }
}