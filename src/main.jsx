// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // App 컴포넌트 임포트
import { BrowserRouter } from 'react-router-dom' // ✨ BrowserRouter 임포트 추가 ✨

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✨ App 컴포넌트를 BrowserRouter로 감쌈 ✨ */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)