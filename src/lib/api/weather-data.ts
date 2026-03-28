import { apiClient } from '../api-client';
import { WeatherDataResponse, WeatherDataRequest } from '../../types/api';

export const weatherDataApi = {
  create: (data: WeatherDataRequest) => apiClient.post<WeatherDataResponse, WeatherDataRequest>('/weather-data', data),
  getById: (id: number) => apiClient.get<WeatherDataResponse>(`/weather-data/${id}`),
  getAll: () => apiClient.get<WeatherDataResponse[]>('/weather-data'),
  update: (id: number, data: WeatherDataRequest) => apiClient.put<WeatherDataResponse, WeatherDataRequest>(`/weather-data/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/weather-data/${id}`),
  getByFarm: (farmId: number) => apiClient.get<WeatherDataResponse[]>(`/weather-data/farm/${farmId}`),
  getByDate: (date: string) => apiClient.get<WeatherDataResponse[]>(`/weather-data/date/${date}`),
  fetchForFarm: (farmId: number) => apiClient.post<WeatherDataResponse>(`/weather-data/fetch/${farmId}`),
};
