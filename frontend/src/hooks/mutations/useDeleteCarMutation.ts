import { useMutation } from '@tanstack/react-query'
import type { CarsResponse } from '../queries/useCarsQuery'
import type { DashboardResponse } from '../queries/useDashboardQuery'
import { queryClient } from '../../lib/queryClient'
import { deleteCar } from '../../services/api'

interface DeleteCarContext {
  previousCars: CarsResponse | undefined
  previousDashboard: DashboardResponse | undefined
}

interface InventoryResponse {
  cars: Array<{ _id: string }>
}

function removeCarFromCache<T extends InventoryResponse>(data: T | undefined, id: string): T | undefined {
  if (!data) return data

  return {
    ...data,
    cars: data.cars.filter((car) => car._id !== id),
  }
}

export function useDeleteCarMutation() {
  return useMutation<unknown, unknown, string, DeleteCarContext>({
    mutationFn: (id) => deleteCar<unknown>(id),
    onMutate: async (id) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['cars'] }),
        queryClient.cancelQueries({ queryKey: ['dashboard'] }),
      ])

      const previousCars = queryClient.getQueryData<CarsResponse>(['cars'])
      const previousDashboard = queryClient.getQueryData<DashboardResponse>(['dashboard'])

      queryClient.setQueryData<CarsResponse>(['cars'], (currentCars) => removeCarFromCache(currentCars, id))
      queryClient.setQueryData<DashboardResponse>(['dashboard'], (currentDashboard) => removeCarFromCache(currentDashboard, id))

      return { previousCars, previousDashboard }
    },
    onError: (_error, _id, context) => {
      if (!context) return

      queryClient.setQueryData(['cars'], context.previousCars)
      queryClient.setQueryData(['dashboard'], context.previousDashboard)
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['cars'] }),
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
      ])
    },
  })
}
