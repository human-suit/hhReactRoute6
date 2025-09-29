import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/hhReactRoute6/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities/model'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/app/App.test.tsx',
  },
});
