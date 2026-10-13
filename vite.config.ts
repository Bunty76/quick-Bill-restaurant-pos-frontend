import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env variables so we can use them in vite.config.ts itself
  const env = loadEnv(mode, process.cwd(), '');

  const BACKEND_URL =
    env.VITE_BACKEND_URL || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
          secure: BACKEND_URL.startsWith('https'), // true for Render, false for localhost
        },
      },
    },
  };
});
