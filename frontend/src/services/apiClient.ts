import axios, { type AxiosError } from 'axios'

export const AUTH_TOKEN_STORAGE_KEY = 'authToken'
export const API_UNAUTHORIZED_EVENT = 'api:unauthorized'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

function getStoredToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)?.trim()
  } catch {
    return null
  }
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // A refresh-token flow can be added here without changing page-level requests.
      window.dispatchEvent(new Event(API_UNAUTHORIZED_EVENT))
    }

    return Promise.reject(error)
  },
)

export default apiClient
