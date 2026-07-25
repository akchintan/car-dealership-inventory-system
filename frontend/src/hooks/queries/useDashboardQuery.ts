import { useQuery } from '@tanstack/react-query'
import { getCars } from '../../services/api'

export interface DashboardCar {
  _id: string
  price: number
  status: string
}

export interface DashboardResponse {
  cars: DashboardCar[]
}

export function useDashboardQuery() {
  return useQuery<DashboardResponse>({
    queryKey: ['dashboard'],
    queryFn: () => getCars<DashboardResponse>(),
  })
}
