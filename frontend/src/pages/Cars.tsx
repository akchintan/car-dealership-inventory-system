import axios from 'axios'
import { useEffect, useState } from 'react'
import CarTable, { type Car, type CarSortField, type SortDirection } from '../components/CarTable'
import InventorySummary from '../components/InventorySummary'
import Card from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
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
  const { success } = useToast()
  const [cars, setCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<CarSortField>('brand')
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending')
  const [error, setError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deletingCarId, setDeletingCarId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const summarySearchTerm = searchTerm.trim()
  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(normalizedSearchTerm),
  )
  const sortedCars = [...filteredCars].sort((firstCar, secondCar) => {
    const comparison = sortField === 'brand'
      ? firstCar.brand.localeCompare(secondCar.brand)
      : firstCar[sortField] - secondCar[sortField]

    return sortDirection === 'ascending' ? comparison : -comparison
  })

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
    setDeletingCarId(car._id)

    try {
      await deleteCar<unknown>(car._id, token ?? undefined)
      setCars((currentCars) => currentCars.filter(({ _id }) => _id !== car._id))
      success(`${car.brand} ${car.model} was deleted from inventory.`)
    } catch (requestError) {
      const message = axios.isAxiosError<ApiErrorResponse>(requestError)
        ? (requestError.response?.data.message ?? 'Unable to delete the car.')
        : 'Unable to delete the car.'

      setDeleteError(message)
    } finally {
      setDeletingCarId(null)
    }
  }

  const handleSortChange = (field: CarSortField) => {
    if (field === sortField) {
      setSortDirection((currentDirection) =>
        currentDirection === 'ascending' ? 'descending' : 'ascending',
      )
      return
    }

    setSortField(field)
    setSortDirection('ascending')
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

      {!isLoading && !error && (
        <>
          {cars.length > 0 && (
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
          )}

          <InventorySummary
            totalCars={cars.length}
            filteredCars={filteredCars.length}
            searchTerm={summarySearchTerm}
            sortField={sortField}
            sortDirection={sortDirection}
          />

          <CarTable
            cars={sortedCars}
            onDelete={handleDelete}
            deletingCarId={deletingCarId}
            isSearching={normalizedSearchTerm.length > 0}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </>
      )}
    </section>
  )
}

export default Cars
