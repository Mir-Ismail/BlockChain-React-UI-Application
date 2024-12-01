import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgo: false, // Disable SVGO optimization if you run into issues with some SVGs
    }),
  ],
});
