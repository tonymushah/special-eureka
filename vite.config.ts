import { defineConfig } from 'vite'
//import reactRefresh from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    //reactRefresh(),
    react()
  ],
  server: {
    port: 9305,
  },
  root: "./dist"
})