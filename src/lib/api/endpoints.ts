import { apiClient } from './client';
import type { Asset, Transaction, TradeRecommendation } from '@/types/portfolio';

export const portfolioApi = {
  getAssets: () => apiClient.get<Asset[]>('/portfolio/assets'),
  getTransactions: () => apiClient.get<Transaction[]>('/portfolio/transactions'),
  getRecommendations: () => apiClient.get<TradeRecommendation[]>('/portfolio/recommendations'),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/login', credentials),
  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post('/auth/register', data),
  logout: () => apiClient.post('/auth/logout'),
};