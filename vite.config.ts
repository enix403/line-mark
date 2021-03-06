import path from 'path';

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import legacy from '@vitejs/plugin-legacy'


export default defineConfig(({ mode }) => {
  const isDevelopment = mode == 'development';

  return {
    base: './',

    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },

    plugins: [
      tsconfigPaths({ loose: true }),
      react(),
      legacy()
    ],

    build: {
      outDir: './dist',
      assetsDir: '.',
      emptyOutDir: true,
      target: "modules",
      sourcemap: isDevelopment,
      minify: isDevelopment ? false : 'esbuild',
      chunkSizeWarningLimit: 1000
    },

    server: {
      port: 4200,
      strictPort: true,
      cors: true,
      fs: { strict: false }
    },

    optimizeDeps: {
      keepNames: false,
    },

    json: {
      namedExports: true
    },

    css: {
      modules: {
        generateScopedName: isDevelopment ?
          "[local]__mod_[hash:base64:4]" :
          "_[hash:base64:8]_[md5:contenthash:6]_",
      }
    },

    envDir: '.',
    envPrefix: 'VITE_'
  };
});
