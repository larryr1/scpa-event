import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteBasicSslPlugin({
      name: "SCPA Event Admin Test Certificate",
      domains: ["*"]
    })
  ],
  server: {
    host: true,
    https: true,
    proxy: {
      '/api': {
        target: "http://localhost:8000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: "http://localhost:8000/auth",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      }
    }
  },
  base: "/admin/"
});
  