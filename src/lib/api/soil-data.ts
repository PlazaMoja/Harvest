import { apiClient } from '../api-client';
import { SoilDataResponse, SoilDataRequest } from '../../types/api';

export const soilDataApi = {
  create: (data: SoilDataRequest) => apiClient.post<SoilDataResponse, SoilDataRequest>('/soil-data', data),
  getById: (id: number) => apiClient.get<SoilDataResponse>(`/soil-data/${id}`),
  getAll: () => apiClient.get<SoilDataResponse[]>('/soil-data'),
  update: (id: number, data: SoilDataRequest) => apiClient.put<SoilDataResponse, SoilDataRequest>(`/soil-data/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/soil-data/${id}`),
  getByFarm: (farmId: number) => apiClient.get<SoilDataResponse[]>(`/soil-data/farm/${farmId}`),
  getBySource: (source: string) => apiClient.get<SoilDataResponse[]>(`/soil-data/source/${encodeURIComponent(source)}`),
  fetchForFarm: (farmId: number) => apiClient.post<SoilDataResponse>(`/soil-data/fetch/${farmId}`),
};
