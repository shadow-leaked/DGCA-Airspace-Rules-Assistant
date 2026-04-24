import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/chat': 'http://localhost:8000',
      '/index': 'http://localhost:8000',
    }
  },
  build: {
    outDir: '../web/dist',
    emptyOutDir: true
  }
})
