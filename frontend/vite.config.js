import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const proxyConfig = {
  '/api': {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    secure: false,
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: proxyConfig
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    proxy: proxyConfig
  }
})
