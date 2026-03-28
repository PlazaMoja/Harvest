import { apiClient } from '../api-client';
import { FarmResponse, FarmRequest } from '../../types/api';

export const farmsApi = {
  create: (data: FarmRequest) => apiClient.post<FarmResponse, FarmRequest>('/farms', data),
  getById: (id: number) => apiClient.get<FarmResponse>(`/farms/${id}`),
  getAll: () => apiClient.get<FarmResponse[]>('/farms'),
  update: (id: number, data: FarmRequest) => apiClient.put<FarmResponse, FarmRequest>(`/farms/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/farms/${id}`),
  getByFarmer: (farmerId: number) => apiClient.get<FarmResponse[]>(`/farms/farmer/${farmerId}`),
  getByLocation: (location: string) => apiClient.get<FarmResponse[]>(`/farms/location/${encodeURIComponent(location)}`),
};
