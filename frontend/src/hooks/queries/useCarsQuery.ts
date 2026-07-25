import { useQuery } from '@tanstack/react-query'
import type { Car } from '../../components/CarTable'
import { getCars } from '../../services/api'

export interface CarsResponse {
  cars: Car[]
}

export function useCarsQuery() {
  return useQuery<CarsResponse>({
    queryKey: ['cars'],
    queryFn: () => getCars<CarsResponse>(),
  })
}
