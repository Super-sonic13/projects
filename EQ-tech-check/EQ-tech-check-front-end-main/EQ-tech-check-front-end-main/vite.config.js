import { defineConfig } from 'vite';
import path from 'path';  // Import the path module

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for the src directory
    },
  },
  root: 'src',
  build: {
    outDir: '../dist',
    sourcemap: true,
    minify: false,
  },
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      strict: false,
    },
  },
});
