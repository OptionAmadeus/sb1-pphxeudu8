import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'recharts'],
          web3: ['@web3-onboard/core', '@web3-onboard/coinbase', '@web3-onboard/react']
        }
      }
    }
  }
});