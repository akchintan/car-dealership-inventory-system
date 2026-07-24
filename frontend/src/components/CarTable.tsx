import { Link } from 'react-router-dom'
import Card from './ui/Card'
import EmptyState from './ui/EmptyState'
import StatusBadge from './ui/StatusBadge'

export interface Car {
  _id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  status: string
}

interface CarTableProps {
  cars: Car[]
  onDelete: (car: Car) => void
  deletingCarId: string | null
  isSearching: boolean
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat()

const headerCellStyle = {
  padding: '14px 16px',
  color: '#667085',
  background: '#f8fafc',
  borderBottom: '1px solid #e4e9f0',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textAlign: 'left' as const,
  textTransform: 'uppercase' as const,
  whiteSpace: 'nowrap' as const,
}

const cellStyle = {
  padding: '16px',
  color: '#344054',
  borderBottom: '1px solid #eef2f6',
  whiteSpace: 'nowrap' as const,
}

function CarTable({ cars, onDelete, deletingCarId, isSearching }: CarTableProps) {
  if (cars.length === 0) {
    return (
      <Card>
        <EmptyState
          title={isSearching ? 'No matching vehicles found.' : 'No cars in inventory'}
          description={isSearching
            ? 'Try searching for a different brand or model.'
            : 'Cars added to the dealership will appear here.'}
        />
      </Card>
    )
  }

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '820px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th scope="col" style={headerCellStyle}>Brand</th>
              <th scope="col" style={headerCellStyle}>Model</th>
              <th scope="col" style={headerCellStyle}>Year</th>
              <th scope="col" style={headerCellStyle}>Price</th>
              <th scope="col" style={headerCellStyle}>Mileage</th>
              <th scope="col" style={headerCellStyle}>Status</th>
              <th scope="col" style={headerCellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => {
              const isDeleting = deletingCarId === car._id
              const isDeleteDisabled = deletingCarId !== null

              return (
                <tr key={car._id}>
                  <td style={{ ...cellStyle, fontWeight: 700, color: '#172033' }}>{car.brand}</td>
                  <td style={cellStyle}>{car.model}</td>
                  <td style={cellStyle}>{car.year}</td>
                  <td style={{ ...cellStyle, fontWeight: 700 }}>{currencyFormatter.format(car.price)}</td>
                  <td style={cellStyle}>{numberFormatter.format(car.mileage)} km</td>
                  <td style={cellStyle}><StatusBadge status={car.status} /></td>
                  <td style={cellStyle}>
                    <div style={{ display: 'flex', gap: '10px' }}>
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
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default CarTable
