import Button from './Button'
import Card from './Card'

interface ErrorFallbackProps {
  error: Error
  onRetry: () => void
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <section
      role="alert"
      aria-labelledby="error-fallback-title"
      style={{
        display: 'grid',
        minHeight: 'calc(100vh - 73px)',
        padding: '24px',
        placeItems: 'center',
      }}
    >
      <Card style={{ width: 'min(100%, 560px)' }}>
        <h1 id="error-fallback-title" style={{ margin: 0, color: '#172033', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
          Something went wrong
        </h1>
        <p style={{ margin: '12px 0 20px', color: '#667085', lineHeight: 1.5 }}>
          We could not display this part of the application. Please try again.
        </p>
        <details style={{ marginBottom: '20px', color: '#475467' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Technical details</summary>
          <pre style={{ overflowX: 'auto', margin: '12px 0 0', padding: '12px', color: '#b42318', background: '#fef3f2', borderRadius: '8px', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
            {error.message || 'Unknown error'}
          </pre>
        </details>
        <Button type="button" onClick={onRetry}>Try again</Button>
      </Card>
    </section>
  )
}

export default ErrorFallback
