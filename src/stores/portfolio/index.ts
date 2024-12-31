import { create } from 'zustand';
import { initialState } from './slice';
import { createPortfolioActions } from './actions';
import type { PortfolioStore } from './types';

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  ...initialState,
  ...createPortfolioActions(set),
}));