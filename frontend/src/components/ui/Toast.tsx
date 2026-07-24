export type ToastVariant = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  variant: ToastVariant
  onDismiss: () => void
}

function Toast({ message, variant, onDismiss }: ToastProps) {
  return (
    <div className={`toast toast--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      <span>{message}</span>
      <button className="toast__dismiss" type="button" onClick={onDismiss} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  )
}

export default Toast
