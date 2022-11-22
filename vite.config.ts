import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  clearScreen: false,
  
  plugins: [
    react()
  ],
  envPrefix: ['VITE_', 'TAURI_'],
  server: {
    port: 9305,
    strictPort: true
  },
  build: {
    // Tauri supports es2021
    target: ['es2021', 'chrome100', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  root: "./src"
})