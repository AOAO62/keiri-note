import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ↓ ここを英語の名前に固定します
  base: '/keiri-note/', 
  plugins: [react()],
})
