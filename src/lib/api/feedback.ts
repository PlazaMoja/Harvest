import { apiClient } from '../api-client';
import { FarmerFeedbackResponse, FarmerFeedbackRequest } from '../../types/api';

export const feedbackApi = {
  create: (data: FarmerFeedbackRequest) => apiClient.post<FarmerFeedbackResponse, FarmerFeedbackRequest>('/feedback', data),
  getById: (id: number) => apiClient.get<FarmerFeedbackResponse>(`/feedback/${id}`),
  getAll: () => apiClient.get<FarmerFeedbackResponse[]>('/feedback'),
  update: (id: number, data: FarmerFeedbackRequest) => apiClient.put<FarmerFeedbackResponse, FarmerFeedbackRequest>(`/feedback/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/feedback/${id}`),
  getByFarm: (farmId: number) => apiClient.get<FarmerFeedbackResponse[]>(`/feedback/farm/${farmId}`),
  getByCrop: (cropId: number) => apiClient.get<FarmerFeedbackResponse[]>(`/feedback/crop/${cropId}`),
};
