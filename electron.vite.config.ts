import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const mainEntry = resolve(__dirname, 'electron/main.ts');
const preloadEntry = resolve(__dirname, 'electron/preload.ts');
const rendererEntry = 'index.html';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-electron/main',
      rollupOptions: {
        input: {
          index: mainEntry
        }
      }
    }
  },
  preload: {
    build: {
      outDir: 'dist-electron/preload',
      rollupOptions: {
        input: {
          index: preloadEntry
        }
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: rendererEntry
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [react()]
  }
});
