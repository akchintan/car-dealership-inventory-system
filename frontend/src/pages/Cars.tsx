import { useEffect, useState } from 'react'
import CarTable, { type Car, type CarSortField, type SortDirection } from '../components/CarTable'
import InventorySummary from '../components/InventorySummary'
import Pagination from '../components/Pagination'
import StatusFilter from '../components/StatusFilter'
import Card from '../components/ui/Card'
import ConfirmationModal from '../components/ui/ConfirmationModal'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useLoading } from '../context/LoadingContext'
import useDebounce from '../hooks/useDebounce'
import useAsync from '../hooks/useAsync'
import { deleteCar, getCars } from '../services/api'
import { getApiErrorMessage } from '../utils/apiError'

interface CarsResponse {
  cars: Car[]
}

const pageStyle = {
  width: 'min(100%, 1200px)',
  margin: '0 auto',
  padding: '48px 24px',
}

const ITEMS_PER_PAGE = 8

function Cars() {
  const { token } = useAuth()
  const { success } = useToast()
  const { showLoading, hideLoading } = useLoading()
  const [cars, setCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<CarSortField>('brand')
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending')
  const [deleteError, setDeleteError] = useState('')
  const [deletingCarId, setDeletingCarId] = useState<string | null>(null)
  const [carPendingDeletion, setCarPendingDeletion] = useState<Car | null>(null)
  const { data: carsResponse, loading, error, execute } = useAsync<CarsResponse>()

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const normalizedSearchTerm = debouncedSearchTerm.trim().toLowerCase()
  const summarySearchTerm = debouncedSearchTerm.trim()
  const searchFilteredCars = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(normalizedSearchTerm),
  )
  const statusFilteredCars = searchFilteredCars.filter((car) =>
    statusFilter === 'all' || car.status.toLowerCase() === statusFilter,
  )
  const sortedCars = [...statusFilteredCars].sort((firstCar, secondCar) => {
    const comparison = sortField === 'brand'
      ? firstCar.brand.localeCompare(secondCar.brand)
      : firstCar[sortField] - secondCar[sortField]

    return sortDirection === 'ascending' ? comparison : -comparison
  })
  const totalPages = Math.max(1, Math.ceil(sortedCars.length / ITEMS_PER_PAGE))
  const activePage = Math.min(currentPage, totalPages)
  const pageStartIndex = (activePage - 1) * ITEMS_PER_PAGE
  const paginatedCars = sortedCars.slice(pageStartIndex, pageStartIndex + ITEMS_PER_PAGE)
  const firstVisibleCar = sortedCars.length === 0 ? 0 : pageStartIndex + 1
  const lastVisibleCar = pageStartIndex + paginatedCars.length

  useEffect(() => {
    void execute(() => getCars<CarsResponse>(token ?? undefined))
  }, [execute, token])

  useEffect(() => {
    if (carsResponse) {
      setCars(carsResponse.cars)
    }
  }, [carsResponse])

  const isLoading = loading || (carsResponse === null && error === null)
  const errorMessage = error ? getApiErrorMessage(error, 'Unable to load cars.') : ''

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const handleDelete = (car: Car) => {
    setCarPendingDeletion(car)
  }

  const handleConfirmDelete = async () => {
    if (!carPendingDeletion) return

    const car = carPendingDeletion
    setDeleteError('')
    setDeletingCarId(car._id)
    showLoading('Deleting car...')

    try {
      await deleteCar<unknown>(car._id, token ?? undefined)
      setCars((currentCars) => currentCars.filter(({ _id }) => _id !== car._id))
      success(`${car.brand} ${car.model} was deleted from inventory.`)
    } catch (requestError) {
      setDeleteError(getApiErrorMessage(requestError, 'Unable to delete the car.'))
    } finally {
      setDeletingCarId(null)
      setCarPendingDeletion(null)
      hideLoading()
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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
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

      {!isLoading && errorMessage && (
        <Card style={{ color: '#b42318', background: '#fef3f2', borderColor: '#fecdca' }} role="alert">
          {errorMessage}
        </Card>
      )}

      {!isLoading && !errorMessage && deleteError && (
        <p className="form-message form-message--error" role="alert" style={{ marginBottom: '20px' }}>
          {deleteError}
        </p>
      )}

      {!isLoading && !errorMessage && (
        <>
          {cars.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
              <div className="form-field" style={{ flex: '1 1 280px' }}>
                <label htmlFor="car-search">Search inventory</label>
                <input
                  id="car-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search by brand or model"
                />
              </div>
              <StatusFilter value={statusFilter} onChange={handleStatusFilterChange} />
            </div>
          )}

          <InventorySummary
            totalCars={sortedCars.length}
            firstVisibleCar={firstVisibleCar}
            lastVisibleCar={lastVisibleCar}
            searchTerm={summarySearchTerm}
            statusFilter={statusFilter}
            sortField={sortField}
            sortDirection={sortDirection}
          />

          <CarTable
            cars={paginatedCars}
            onDelete={handleDelete}
            deletingCarId={deletingCarId}
            isSearching={normalizedSearchTerm.length > 0}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />

          {sortedCars.length > 0 && (
            <Pagination
              currentPage={activePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          <ConfirmationModal
            open={carPendingDeletion !== null}
            title="Delete vehicle?"
            message={carPendingDeletion
              ? `Delete ${carPendingDeletion.brand} ${carPendingDeletion.model} from inventory? This cannot be undone.`
              : ''}
            confirmLabel={deletingCarId ? 'Deleting...' : 'Delete'}
            cancelLabel="Cancel"
            loading={deletingCarId !== null}
            onConfirm={handleConfirmDelete}
            onCancel={() => setCarPendingDeletion(null)}
          />
        </>
      )}
    </section>
  )
}

export default Cars
