import apiClient from './apiClient'

export interface CreateCarPayload {
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  status: 'available' | 'sold'
}

export async function getCars<T>(_token?: string): Promise<T> {
  const { data } = await apiClient.get<T>('/api/cars')

  return data
}

export async function createCar<T>(
  car: CreateCarPayload,
  _token?: string,
): Promise<T> {
  const { data } = await apiClient.post<T>('/api/cars', car)

  return data
}

export async function getCarById<T>(id: string, _token?: string): Promise<T> {
  const { data } = await apiClient.get<T>(`/api/cars/${id}`)

  return data
}

export async function updateCar<T>(
  id: string,
  car: CreateCarPayload,
  _token?: string,
): Promise<T> {
  const { data } = await apiClient.put<T>(`/api/cars/${id}`, car)

  return data
}

export async function deleteCar<T>(id: string, _token?: string): Promise<T> {
  const { data } = await apiClient.delete<T>(`/api/cars/${id}`)

  return data
}

export default apiClient
