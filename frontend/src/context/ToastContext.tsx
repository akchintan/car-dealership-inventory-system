import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Toast, { type ToastVariant } from '../components/ui/Toast'

interface ToastItem {
  id: number
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

const TOAST_DURATION_MS = 4000

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextToastId = useRef(0)
  const timeoutIds = useRef<number[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    const id = nextToastId.current
    nextToastId.current += 1
    setToasts((currentToasts) => [...currentToasts, { id, message, variant }])

    const timeoutId = window.setTimeout(() => dismiss(id), TOAST_DURATION_MS)
    timeoutIds.current.push(timeoutId)
  }, [dismiss])

  useEffect(() => () => {
    timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
  }, [])

  const contextValue: ToastContextValue = {
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    info: (message) => showToast(message, 'info'),
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
