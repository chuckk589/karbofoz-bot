import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    https: true,
    host: true,
    proxy: {
      '/v1': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
      '^/[a-z].*/templates/': {
        target: 'http://localhost:3000/',
      },
      '^/[a-z].*/images/': {
        target: 'http://localhost:3000/',
      },
      '^/[a-z].*/.*.ttf': {
        target: 'http://localhost:3000/',
      },
      '/devices': {
        target: 'http://localhost:3000/',
      },
    },
  },
  plugins: [vue(), vuetify({ autoImport: true }), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../dist/public',
  },
});
