import { Link } from 'react-router-dom'

export interface Car {
  _id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  status: string
}

interface CarCardProps {
  car: Car
  onDelete: (car: Car) => void
  isDeleting: boolean
  isDeleteDisabled: boolean
}

const cardStyle = {
  padding: '24px',
  background: '#ffffff',
  border: '1px solid #e4e9f0',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgb(15 23 42 / 7%)',
}

function CarCard({ car, onDelete, isDeleting, isDeleteDisabled }: CarCardProps) {
  return (
    <article style={cardStyle}>
      <p className="auth-eyebrow" style={{ marginBottom: '8px' }}>{car.brand}</p>
      <h2 style={{ margin: 0, color: '#172033', fontSize: '1.3rem' }}>{car.model}</h2>
      <p style={{ margin: '8px 0 20px', color: '#667085' }}>{car.year}</p>

      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 16px', margin: 0, color: '#344054' }}>
        <dt style={{ color: '#667085' }}>Price</dt>
        <dd style={{ margin: 0, fontWeight: 700 }}>{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(car.price)}</dd>
        <dt style={{ color: '#667085' }}>Mileage</dt>
        <dd style={{ margin: 0 }}>{new Intl.NumberFormat().format(car.mileage)} km</dd>
        <dt style={{ color: '#667085' }}>Status</dt>
        <dd style={{ margin: 0, fontWeight: 700, textTransform: 'capitalize' }}>{car.status}</dd>
      </dl>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}>
        <Link
          to={`/cars/${car._id}/edit`}
          style={{ padding: '10px 14px', color: '#ffffff', background: '#c2410c', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(car)}
          disabled={isDeleteDisabled}
          style={{ padding: '10px 14px', color: '#b42318', background: '#ffffff', border: '1px solid #fecdca', borderRadius: '8px', cursor: isDeleteDisabled ? 'wait' : 'pointer', fontWeight: 700, opacity: isDeleteDisabled && !isDeleting ? 0.65 : 1 }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  )
}

export default CarCard
