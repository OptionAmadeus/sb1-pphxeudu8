export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL,
  timeout: 10000,
  retryAttempts: 3,
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout'
    },
    portfolio: {
      assets: '/portfolio/assets',
      transactions: '/portfolio/transactions',
      recommendations: '/portfolio/recommendations'
    }
  }
} as const;