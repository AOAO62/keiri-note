import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // ここが重要：見つからない部品を「外部のもの」として扱う設定です
      external: [
        'figma:foundry-client-api'
      ]
    }
  }
})
