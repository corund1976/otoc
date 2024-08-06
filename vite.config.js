import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteJsconfigPaths from 'vite-jsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command, mode }) => ({
  build: {
    minify: mode === 'production' ? 'terser' : false,
    outDir: 'build',
    sourcemap: command === 'serve' ? 'inline' : false,
    chunkSizeWarningLimit: 2000,
  },
  base: './',
  plugins: [
    react(),
    viteJsconfigPaths(),
    svgr({ include: "**/*.svg?react", }),
  ],
  server: {
    open: true,
    port: 8000,
  },
}))