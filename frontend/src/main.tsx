import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { LoadingProvider } from './context/LoadingContext.tsx'
import { ToastProvider } from './context/ToastContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
