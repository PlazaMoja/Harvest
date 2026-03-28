import { apiClient } from '../api-client';
import { DashboardOutputResponse, DashboardOutputRequest } from '../../types/api';

export const dashboardApi = {
  create: (data: DashboardOutputRequest) => apiClient.post<DashboardOutputResponse, DashboardOutputRequest>('/dashboard-outputs', data),
  getById: (id: number) => apiClient.get<DashboardOutputResponse>(`/dashboard-outputs/${id}`),
  getAll: () => apiClient.get<DashboardOutputResponse[]>('/dashboard-outputs'),
  update: (id: number, data: DashboardOutputRequest) => apiClient.put<DashboardOutputResponse, DashboardOutputRequest>(`/dashboard-outputs/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/dashboard-outputs/${id}`),
  getByFarm: (farmId: number) => apiClient.get<DashboardOutputResponse[]>(`/dashboard-outputs/farm/${farmId}`),
  getLatestByFarm: (farmId: number) => apiClient.get<DashboardOutputResponse>(`/dashboard-outputs/farm/${farmId}/latest`),
};
