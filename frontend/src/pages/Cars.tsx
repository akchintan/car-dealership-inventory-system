import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getCars } from '../services/api'

interface Car {
  _id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  status: string
}

interface CarsResponse {
  cars: Car[]
}

interface ApiErrorResponse {
  message?: string
}

const pageStyle = {
  width: 'min(100%, 1200px)',
  margin: '0 auto',
  padding: '48px 24px',
}

const cardStyle = {
  padding: '24px',
  background: '#ffffff',
  border: '1px solid #e4e9f0',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgb(15 23 42 / 7%)',
}

function Cars() {
  const { token } = useAuth()
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchCars = async () => {
      try {
        const data = await getCars<CarsResponse>(token ?? undefined)

        if (isMounted) {
          setCars(data.cars)
        }
      } catch (requestError) {
        if (isMounted) {
          const message = axios.isAxiosError<ApiErrorResponse>(requestError)
            ? (requestError.response?.data.message ?? 'Unable to load cars.')
            : 'Unable to load cars.'

          setError(message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchCars()

    return () => {
      isMounted = false
    }
  }, [token])

  return (
    <section style={pageStyle} aria-labelledby="cars-heading">
      <header style={{ marginBottom: '28px' }}>
        <p className="auth-eyebrow">Inventory</p>
        <h1 id="cars-heading" style={{ margin: 0, color: '#172033', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
          Available cars
        </h1>
      </header>

      {isLoading && (
        <div style={cardStyle} role="status">
          Loading cars...
        </div>
      )}

      {!isLoading && error && (
        <div style={{ ...cardStyle, color: '#b42318', background: '#fef3f2', borderColor: '#fecdca' }} role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && cars.length === 0 && (
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 8px', color: '#172033', fontSize: '1.15rem' }}>No cars in inventory</h2>
          <p style={{ margin: 0, color: '#667085', lineHeight: 1.5 }}>Cars added to the dealership will appear here.</p>
        </div>
      )}

      {!isLoading && !error && cars.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {cars.map((car) => (
            <article key={car._id} style={cardStyle}>
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
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Cars
