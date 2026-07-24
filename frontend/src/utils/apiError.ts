import axios from 'axios'

interface ApiErrorResponse {
  message?: unknown
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallbackMessage
  }

  const message = error.response?.data?.message

  return typeof message === 'string' ? message : fallbackMessage
}
