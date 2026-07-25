import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../lib/queryClient'
import { type CreateCarPayload, updateCar } from '../../services/api'

interface UpdateCarVariables {
  id: string
  car: CreateCarPayload
}

export function useUpdateCarMutation() {
  return useMutation<unknown, unknown, UpdateCarVariables>({
    mutationFn: ({ id, car }) => updateCar<unknown>(id, car),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['cars'] }),
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
      ])
    },
  })
}
