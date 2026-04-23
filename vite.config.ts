import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ↓ この一行を追加してください（URLの末尾に合わせる設定です）
  base: '/keiri-note/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'figma:foundry-client-api'
      ]
    }
  }
})
