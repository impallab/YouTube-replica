import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/suggestion': {
        target: 'https://clients1.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/suggestion/, ''),
      },
    },
  },
  plugins: [react()],
})
