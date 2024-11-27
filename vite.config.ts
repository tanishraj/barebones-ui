import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfig from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfig()],
});
