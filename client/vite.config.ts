import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //root: '.',
  build: {
    outDir: '../client/dist', // 
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false

      } 
    }
  }
});
