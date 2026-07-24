import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export interface CreateCarPayload {
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  status: 'available' | 'sold'
}

export async function getCars<T>(token?: string): Promise<T> {
  const { data } = await api.get<T>('/api/cars', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return data
}

export async function createCar<T>(
  car: CreateCarPayload,
  token?: string,
): Promise<T> {
  const { data } = await api.post<T>('/api/cars', car, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return data
}

export async function getCarById<T>(id: string, token?: string): Promise<T> {
  const { data } = await api.get<T>(`/api/cars/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return data
}

export async function updateCar<T>(
  id: string,
  car: CreateCarPayload,
  token?: string,
): Promise<T> {
  const { data } = await api.put<T>(`/api/cars/${id}`, car, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return data
}

export async function deleteCar<T>(id: string, token?: string): Promise<T> {
  const { data } = await api.delete<T>(`/api/cars/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })

  return data
}

export default api
