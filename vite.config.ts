/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig({
  plugins: [
    react(),
    devServer({
      entry: './src/server/index.ts',
      adapter: cloudflareAdapter,
    }),
  ],
  root: '.',
  build: {
    outDir: 'dist',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/unit/setup.ts',
    include: ['./tests/unit/**/*.test.ts'],
  },
})
