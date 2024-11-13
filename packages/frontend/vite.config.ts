import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'; 
import path from "path"

// https://vite.dev/config/
export default defineConfig({ 
  plugins: [
   checker({ typescript: false }), react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',  // Custom file name for entry point
        // chunkFileNames: 'assets/index.js', // Custom file name for chunks
        assetFileNames: 'assets/index.css', // Custom file name for assets
      }
    }
  }
})
