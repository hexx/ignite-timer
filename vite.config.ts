/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import devServer from '@hono/vite-dev-server'
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devServer({
      entry: './src/server/index.ts',
      adapter: cloudflareAdapter,
    }),
  ],
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client'),
    },
  },
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
