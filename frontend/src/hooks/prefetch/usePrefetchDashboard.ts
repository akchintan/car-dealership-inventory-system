import { useQueryClient } from '@tanstack/react-query'
import { getCars } from '../../services/api'
import type { DashboardResponse } from '../queries/useDashboardQuery'

export function usePrefetchDashboard() {
  const queryClient = useQueryClient()

  return () => queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: () => getCars<DashboardResponse>(),
  })
}
