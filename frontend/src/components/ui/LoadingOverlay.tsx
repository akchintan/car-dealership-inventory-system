import Card from './Card'
import Spinner from './Spinner'

interface LoadingOverlayProps {
  open: boolean
  message?: string
}

function LoadingOverlay({ open, message = 'Loading...' }: LoadingOverlayProps) {
  if (!open) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        zIndex: 1200,
        inset: 0,
        display: 'grid',
        padding: '24px',
        background: 'rgb(15 23 42 / 36%)',
        placeItems: 'center',
      }}
    >
      <Card style={{ display: 'flex', alignItems: 'center', gap: '12px', width: 'min(100%, 360px)', color: '#172033' }}>
        <Spinner size={20} />
        <span style={{ fontWeight: 700 }}>{message}</span>
      </Card>
    </div>
  )
}

export default LoadingOverlay
