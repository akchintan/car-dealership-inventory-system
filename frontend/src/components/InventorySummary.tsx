import Card from './ui/Card'

type SortField = 'brand' | 'year' | 'price' | 'mileage'
type SortDirection = 'ascending' | 'descending'

interface InventorySummaryProps {
  totalCars: number
  filteredCars: number
  searchTerm: string
  sortField: SortField
  sortDirection: SortDirection
}

const sortFieldLabels: Record<SortField, string> = {
  brand: 'Brand',
  year: 'Year',
  price: 'Price',
  mileage: 'Mileage',
}

function InventorySummary({
  totalCars,
  filteredCars,
  searchTerm,
  sortField,
  sortDirection,
}: InventorySummaryProps) {
  const isSearchActive = searchTerm.length > 0
  const vehicleSummary = isSearchActive
    ? `Showing ${filteredCars} of ${totalCars} vehicles`
    : `Showing ${totalCars} vehicles`
  const sortIndicator = sortDirection === 'ascending' ? '↑' : '↓'

  return (
    <Card style={{ marginBottom: '24px', padding: '18px 24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', alignItems: 'center' }}>
        <p style={{ flex: '1 1 180px', margin: 0, color: '#344054' }}>
          <strong style={{ color: '#172033' }}>{vehicleSummary}</strong>
        </p>
        <p style={{ flex: '1 1 180px', margin: 0, color: '#667085' }}>
          Search: <strong style={{ color: '#172033' }}>{isSearchActive ? searchTerm : 'All vehicles'}</strong>
        </p>
        <p style={{ flex: '1 1 180px', margin: 0, color: '#667085' }}>
          Sorted by: <strong style={{ color: '#172033' }}>{sortFieldLabels[sortField]} {sortIndicator}</strong>
        </p>
      </div>
    </Card>
  )
}

export default InventorySummary
