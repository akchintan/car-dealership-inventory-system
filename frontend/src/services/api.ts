import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export async function getCars<T>(token?: string): Promise<T> {
  const { data } = await api.get<T>('/api/cars', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return data
}

export default api
