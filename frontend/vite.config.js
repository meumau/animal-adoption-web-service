import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import process from 'node:process'

const apiProxyTarget = process.env.API_PROXY_TARGET || 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
})
