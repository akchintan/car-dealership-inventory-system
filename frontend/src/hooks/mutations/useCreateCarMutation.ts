import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../lib/queryClient'
import { createCar, type CreateCarPayload } from '../../services/api'

export function useCreateCarMutation() {
  return useMutation<unknown, unknown, CreateCarPayload>({
    mutationFn: (car) => createCar<unknown>(car),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['cars'] }),
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
      ])
    },
  })
}
