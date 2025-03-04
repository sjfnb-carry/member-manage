import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: { // 这里改为小写 server
  //   proxy: {
  //     '/users': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //     }
  //   }
  // }
})
