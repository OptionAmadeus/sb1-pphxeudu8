/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_INFURA_ID: string
  readonly VITE_COINBASE_APP_NAME: string
  readonly VITE_COINBASE_APP_LOGO_URL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_MOCK_DATA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}