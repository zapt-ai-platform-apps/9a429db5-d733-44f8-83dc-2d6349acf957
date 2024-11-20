import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  optimizeDeps: {
    include: ['@vercel/analytics', '@sentry/browser'],
    exclude: ['drizzle-orm', '@neondatabase/serverless']
  }
});