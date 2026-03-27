import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const mainEntry = resolve(__dirname, 'electron/main.ts');
const preloadEntry = resolve(__dirname, 'electron/preload.ts');

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-electron',
      lib: {
        entry: mainEntry
      },
      rollupOptions: {
        input: mainEntry
      }
    }
  },
  preload: {
    build: {
      outDir: 'dist-electron',
      lib: {
        entry: preloadEntry
      },
      rollupOptions: {
        input: preloadEntry
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [react()]
  }
});
