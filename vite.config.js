// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // '/api'로 시작하는 모든 요청
        target: 'http://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true, // CORS 우회를 위해 호스트 헤더 변경
        rewrite: (path) => path.replace(/^\/api/, '') // '/api' 접두사 제거
      }
    }
  }
})