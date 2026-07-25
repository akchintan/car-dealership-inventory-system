import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../lib/queryClient'
import { deleteCar } from '../../services/api'

export function useDeleteCarMutation() {
  return useMutation<unknown, unknown, string>({
    mutationFn: (id) => deleteCar<unknown>(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['cars'] }),
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
      ])
    },
  })
}
