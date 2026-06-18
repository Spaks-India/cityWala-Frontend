import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from "vite-plugin-remove-console";


export default defineConfig({
  plugins: [
    react(),
      removeConsole({
      includes: ["log", "warn", "error"],
      external: ["src/utils/logger.js"]
    })
  ],

  build: {
    minify: "esbuild",
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            const cookies = proxyRes.headers['set-cookie'];
            if (Array.isArray(cookies)) {
              proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
                cookie.replace(/;?\s*Domain=[^;]+/gi, '')
              );
            }
          });
        },
      },
    },
  },
})
