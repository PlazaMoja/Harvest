import { apiClient } from '../api-client';
import { CropResponse, CropRequest } from '../../types/api';
import { CropCategory } from '../../types/enums';

export const cropsApi = {
  create: (data: CropRequest) => apiClient.post<CropResponse, CropRequest>('/crops', data),
  getById: (id: number) => apiClient.get<CropResponse>(`/crops/${id}`),
  getAll: () => apiClient.get<CropResponse[]>('/crops'),
  update: (id: number, data: CropRequest) => apiClient.put<CropResponse, CropRequest>(`/crops/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/crops/${id}`),
  getByName: (name: string) => apiClient.get<CropResponse>(`/crops/name/${encodeURIComponent(name)}`),
  getByCategory: (category: CropCategory) => apiClient.get<CropResponse[]>(`/crops/category/${category}`),
};
