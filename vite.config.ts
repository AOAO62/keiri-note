import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/keiri-note/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['figma:foundry-client-api']
    }
  },
  // ↓ これを追加：プログラムの中で使われていてもエラーにしない設定
  define: {
    'process.env': {}
  }
})
