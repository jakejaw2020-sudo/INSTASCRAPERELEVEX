import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const mainEntry = resolve(__dirname, 'electron/main.ts');
const preloadEntry = resolve(__dirname, 'electron/preload.ts');
const rendererEntry = resolve(__dirname, 'index.html');

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-electron/main',
      rollupOptions: {
        input: {
          index: mainEntry
        },
        output: {
          format: 'cjs',
          entryFileNames: 'index.js'
        }
      }
    }
  },
  preload: {
    build: {
      outDir: 'dist-electron/preload',
      lib: {
        entry: preloadEntry,
        formats: ['cjs'],
        fileName: () => 'index.js'
      },
      rollupOptions: {
        input: {
          index: preloadEntry
        },
        output: {
          format: 'cjs',
          entryFileNames: 'index.js'
        }
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: rendererEntry
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
