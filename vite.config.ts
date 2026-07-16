import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        // Библиотека графиков — в отдельный чанк, чтобы её кэшировали
        // независимо от кода приложения.
        advancedChunks: {
          groups: [{ name: 'charts', test: /recharts|d3-/ }],
        },
      },
    },
  },
})
