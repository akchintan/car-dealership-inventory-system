import axios from 'axios'
import { useEffect, useState } from 'react'
import CarCard, { type Car } from '../components/CarCard'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { deleteCar, getCars } from '../services/api'

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

function Cars() {
  const { token } = useAuth()
  const [cars, setCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [deletingCarId, setDeletingCarId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(normalizedSearchTerm),
  )

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

  const handleDelete = async (car: Car) => {
    const isConfirmed = window.confirm(
      `Delete ${car.brand} ${car.model} from inventory? This cannot be undone.`,
    )

    if (!isConfirmed) return

    setDeleteError('')
    setSuccessMessage('')
    setDeletingCarId(car._id)

    try {
      await deleteCar<unknown>(car._id, token ?? undefined)
      setCars((currentCars) => currentCars.filter(({ _id }) => _id !== car._id))
      setSuccessMessage(`${car.brand} ${car.model} was deleted from inventory.`)
    } catch (requestError) {
      const message = axios.isAxiosError<ApiErrorResponse>(requestError)
        ? (requestError.response?.data.message ?? 'Unable to delete the car.')
        : 'Unable to delete the car.'

      setDeleteError(message)
    } finally {
      setDeletingCarId(null)
    }
  }

  return (
    <section style={pageStyle} aria-labelledby="cars-heading">
      <header style={{ marginBottom: '28px' }}>
        <p className="auth-eyebrow">Inventory</p>
        <h1 id="cars-heading" style={{ margin: 0, color: '#172033', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
          Available cars
        </h1>
      </header>

      {isLoading && (
        <Card role="status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Spinner />
            Loading cars...
          </div>
        </Card>
      )}

      {!isLoading && error && (
        <Card style={{ color: '#b42318', background: '#fef3f2', borderColor: '#fecdca' }} role="alert">
          {error}
        </Card>
      )}

      {!isLoading && !error && deleteError && (
        <p className="form-message form-message--error" role="alert" style={{ marginBottom: '20px' }}>
          {deleteError}
        </p>
      )}

      {!isLoading && !error && successMessage && (
        <p className="form-message form-message--success" role="status" style={{ marginBottom: '20px' }}>
          {successMessage}
        </p>
      )}

      {!isLoading && !error && cars.length === 0 && (
        <Card>
          <EmptyState
            title="No cars in inventory"
            description="Cars added to the dealership will appear here."
          />
        </Card>
      )}

      {!isLoading && !error && cars.length > 0 && (
        <>
          <div className="form-field" style={{ width: 'min(100%, 420px)', marginBottom: '24px' }}>
            <label htmlFor="car-search">Search inventory</label>
            <input
              id="car-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by brand or model"
            />
          </div>

          {filteredCars.length === 0 ? (
            <Card>
              <EmptyState
                title="No matching vehicles found."
                description="Try searching for a different brand or model."
              />
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {filteredCars.map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  onDelete={handleDelete}
                  isDeleting={deletingCarId === car._id}
                  isDeleteDisabled={deletingCarId !== null}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Cars
