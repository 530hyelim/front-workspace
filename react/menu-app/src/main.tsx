import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient(); // 전역 캐시 저장소

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    {/* 모든 컴포넌트에 queryClient를 제공하는 컴포넌트 */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </>
  // </StrictMode>,
)