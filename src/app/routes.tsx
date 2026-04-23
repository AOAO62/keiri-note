import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ↓ ここが GitHub のリポジトリ名と完全に一致している必要があります
  base: '/keiri-note/', 
  plugins: [react()],
  resolve: {
    alias: {
      // appフォルダへのショートカットを作成
      '@': '/src',
    },
  },
})
