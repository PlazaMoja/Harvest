import { apiClient } from '../api-client';
import { FarmerResponse, FarmerRequest } from '../../types/api';
import { Language } from '../../types/enums';

export const farmersApi = {
  create: (data: FarmerRequest) => apiClient.post<FarmerResponse, FarmerRequest>('/farmers', data),
  getById: (id: number) => apiClient.get<FarmerResponse>(`/farmers/${id}`),
  getAll: () => apiClient.get<FarmerResponse[]>('/farmers'),
  update: (id: number, data: FarmerRequest) => apiClient.put<FarmerResponse, FarmerRequest>(`/farmers/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/farmers/${id}`),
  getByLanguage: (language: Language) => apiClient.get<FarmerResponse[]>(`/farmers/language/${language}`),
  getByLocation: (location: string) => apiClient.get<FarmerResponse[]>(`/farmers/location/${encodeURIComponent(location)}`),
};
