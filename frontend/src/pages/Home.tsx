import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCars } from '../services/api'

interface DashboardCar {
  _id: string
  price: number
  status: string
}

interface CarsResponse {
  cars: DashboardCar[]
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

function Home() {
  const { token } = useAuth()
  const [cars, setCars] = useState<DashboardCar[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchInventory = async () => {
      try {
        const data = await getCars<CarsResponse>(token ?? undefined)

        if (isMounted) {
          setCars(data.cars)
        }
      } catch (requestError) {
        if (isMounted) {
          const message = axios.isAxiosError<ApiErrorResponse>(requestError)
            ? (requestError.response?.data.message ?? 'Unable to load dashboard data.')
            : 'Unable to load dashboard data.'

          setError(message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchInventory()

    return () => {
      isMounted = false
    }
  }, [token])

  const availableCars = cars.filter(
    ({ status }) => status.toLowerCase() === 'available',
  ).length
  const soldCars = cars.filter(
    ({ status }) => status.toLowerCase() === 'sold',
  ).length
  const averagePrice = cars.length > 0
    ? cars.reduce((total, car) => total + car.price, 0) / cars.length
    : 0

  const statistics = [
    { label: 'Total Cars', value: cars.length },
    { label: 'Available Cars', value: availableCars },
    { label: 'Sold Cars', value: soldCars },
    {
      label: 'Average Price',
      value: new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(averagePrice),
    },
  ]

  return (
    <section style={pageStyle} aria-labelledby="dashboard-heading">
      <header style={{ marginBottom: '36px' }}>
        <p className="auth-eyebrow">Overview</p>
        <h1 id="dashboard-heading" style={{ margin: 0, color: '#172033', fontSize: 'clamp(2rem, 5vw, 2.75rem)', letterSpacing: '-0.035em' }}>
          Dealer Dashboard
        </h1>
        <p style={{ maxWidth: '620px', margin: '12px 0 0', color: '#667085', fontSize: '1.05rem', lineHeight: 1.55 }}>
          Welcome back. Here is a quick view of your dealership inventory.
        </p>
      </header>

      <section aria-labelledby="quick-actions-heading" style={{ marginBottom: '40px' }}>
        <h2 id="quick-actions-heading" style={{ margin: '0 0 16px', color: '#172033', fontSize: '1.2rem' }}>Quick actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <article style={cardStyle}>
            <span aria-hidden="true" style={{ display: 'inline-grid', width: '42px', height: '42px', marginBottom: '16px', placeItems: 'center', background: '#fff7ed', borderRadius: '10px', fontSize: '1.35rem' }}>+</span>
            <h3 style={{ margin: 0, color: '#172033', fontSize: '1.15rem' }}>Add Vehicle</h3>
            <p style={{ margin: '8px 0 20px', color: '#667085', lineHeight: 1.5 }}>Add a new vehicle to your dealership inventory.</p>
            <Link to="/add-car" style={{ display: 'inline-block', padding: '10px 14px', color: '#ffffff', background: '#c2410c', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>Add vehicle</Link>
          </article>

          <article style={cardStyle}>
            <span aria-hidden="true" style={{ display: 'inline-grid', width: '42px', height: '42px', marginBottom: '16px', placeItems: 'center', background: '#eff6ff', borderRadius: '10px', fontSize: '1.35rem' }}>▦</span>
            <h3 style={{ margin: 0, color: '#172033', fontSize: '1.15rem' }}>View Inventory</h3>
            <p style={{ margin: '8px 0 20px', color: '#667085', lineHeight: 1.5 }}>Review, update, and manage your listed vehicles.</p>
            <Link to="/cars" style={{ display: 'inline-block', padding: '10px 14px', color: '#ffffff', background: '#c2410c', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>View inventory</Link>
          </article>
        </div>
      </section>

      <section aria-labelledby="inventory-stats-heading">
        <h2 id="inventory-stats-heading" style={{ margin: '0 0 16px', color: '#172033', fontSize: '1.2rem' }}>Inventory summary</h2>

        {isLoading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px' }} aria-label="Loading inventory statistics">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} style={{ ...cardStyle, minHeight: '122px', background: 'linear-gradient(90deg, #f8fafc 25%, #eef2f6 50%, #f8fafc 75%)' }} />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div style={{ ...cardStyle, color: '#b42318', background: '#fef3f2', borderColor: '#fecdca' }} role="alert">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px' }}>
            {statistics.map((statistic) => (
              <article key={statistic.label} style={cardStyle}>
                <p style={{ margin: 0, color: '#667085', fontSize: '0.9rem', fontWeight: 650 }}>{statistic.label}</p>
                <p style={{ margin: '10px 0 0', color: '#172033', fontSize: '1.8rem', fontWeight: 750, letterSpacing: '-0.035em' }}>{statistic.value}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}

export default Home
