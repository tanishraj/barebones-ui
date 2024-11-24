import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'backbones-ui',
      formats: ['es', 'cjs'],
      fileName: 'backbones-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
