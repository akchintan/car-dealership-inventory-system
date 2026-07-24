export interface CsvCar {
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  status: string
}

const headers = ['Brand', 'Model', 'Year', 'Price', 'Mileage', 'Status']

function escapeCsvValue(value: string | number) {
  const stringValue = String(value)
  return `"${stringValue.replace(/"/g, '""')}"`
}

function getExportDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function exportCarsToCsv(cars: readonly CsvCar[]) {
  const rows = cars.map((car) => [
    car.brand,
    car.model,
    car.year,
    car.price,
    car.mileage,
    car.status,
  ].map(escapeCsvValue).join(','))
  const csv = `\uFEFF${headers.map(escapeCsvValue).join(',')}\n${rows.join('\n')}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = downloadUrl
  link.download = `inventory-${getExportDate()}.csv`
  link.style.display = 'none'
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(downloadUrl)
}
