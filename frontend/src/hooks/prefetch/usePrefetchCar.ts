import { useQueryClient } from '@tanstack/react-query'
import { getCarById, type CreateCarPayload } from '../../services/api'

interface PrefetchedCar extends CreateCarPayload {
  _id: string
}

interface CarResponse {
  car: PrefetchedCar
}

export function usePrefetchCar() {
  const queryClient = useQueryClient()

  return (id: string) => queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById<CarResponse>(id),
  })
}
