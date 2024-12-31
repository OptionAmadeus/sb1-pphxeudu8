declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    VITE_API_URL: string
    VITE_INFURA_ID: string
    VITE_COINBASE_APP_NAME: string
    VITE_COINBASE_APP_LOGO_URL: string
    VITE_ENABLE_ANALYTICS: string
    VITE_ENABLE_MOCK_DATA: string
  }
}