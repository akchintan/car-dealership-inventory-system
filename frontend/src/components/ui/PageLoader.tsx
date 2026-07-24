import Card from './Card'
import Spinner from './Spinner'

function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: 'grid',
        minHeight: 'calc(100vh - 73px)',
        padding: '24px',
        placeItems: 'center',
      }}
    >
      <Card style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#172033' }}>
        <Spinner size={20} />
        <span>Loading page...</span>
      </Card>
    </div>
  )
}

export default PageLoader
