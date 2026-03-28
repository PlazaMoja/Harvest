import { apiClient } from '../api-client';
import {
  YieldPredictionResponse,
  YieldPredictionRequest,
  PestDiseasePredictionResponse,
  PestDiseasePredictionRequest,
  RiskAssessmentResponse,
  RiskAssessmentRequest,
  AdaptiveRecommendationResponse,
  AdaptiveRecommendationRequest,
  CropSuitabilityResultResponse,
  CropSuitabilityResultRequest,
  MarketPredictionResponse,
  MarketPredictionRequest,
} from '../../types/api';
import { RiskLevel, OverallRiskLevel, RecommendationType } from '../../types/enums';

export const yieldPredictionsApi = {
  create: (data: YieldPredictionRequest) => apiClient.post<YieldPredictionResponse, YieldPredictionRequest>('/predictions/yield', data),
  getById: (id: number) => apiClient.get<YieldPredictionResponse>(`/predictions/yield/${id}`),
  getAll: () => apiClient.get<YieldPredictionResponse[]>('/predictions/yield'),
  update: (id: number, data: YieldPredictionRequest) => apiClient.put<YieldPredictionResponse, YieldPredictionRequest>(`/predictions/yield/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/predictions/yield/${id}`),
  getByFarm: (farmId: number) => apiClient.get<YieldPredictionResponse[]>(`/predictions/yield/farm/${farmId}`),
  getByCrop: (cropId: number) => apiClient.get<YieldPredictionResponse[]>(`/predictions/yield/crop/${cropId}`),
};

export const pestDiseasePredictionsApi = {
  create: (data: PestDiseasePredictionRequest) => apiClient.post<PestDiseasePredictionResponse, PestDiseasePredictionRequest>('/predictions/pest-disease', data),
  getById: (id: number) => apiClient.get<PestDiseasePredictionResponse>(`/predictions/pest-disease/${id}`),
  getAll: () => apiClient.get<PestDiseasePredictionResponse[]>('/predictions/pest-disease'),
  update: (id: number, data: PestDiseasePredictionRequest) => apiClient.put<PestDiseasePredictionResponse, PestDiseasePredictionRequest>(`/predictions/pest-disease/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/predictions/pest-disease/${id}`),
  getByFarm: (farmId: number) => apiClient.get<PestDiseasePredictionResponse[]>(`/predictions/pest-disease/farm/${farmId}`),
  getByRisk: (riskLevel: RiskLevel) => apiClient.get<PestDiseasePredictionResponse[]>(`/predictions/pest-disease/risk/${riskLevel}`),
};

export const riskAssessmentsApi = {
  create: (data: RiskAssessmentRequest) => apiClient.post<RiskAssessmentResponse, RiskAssessmentRequest>('/predictions/risk', data),
  getById: (id: number) => apiClient.get<RiskAssessmentResponse>(`/predictions/risk/${id}`),
  getAll: () => apiClient.get<RiskAssessmentResponse[]>('/predictions/risk'),
  update: (id: number, data: RiskAssessmentRequest) => apiClient.put<RiskAssessmentResponse, RiskAssessmentRequest>(`/predictions/risk/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/predictions/risk/${id}`),
  getByFarm: (farmId: number) => apiClient.get<RiskAssessmentResponse[]>(`/predictions/risk/farm/${farmId}`),
  getByLevel: (level: OverallRiskLevel) => apiClient.get<RiskAssessmentResponse[]>(`/predictions/risk/level/${level}`),
};

export const adaptiveRecommendationsApi = {
  create: (data: AdaptiveRecommendationRequest) => apiClient.post<AdaptiveRecommendationResponse, AdaptiveRecommendationRequest>('/predictions/adaptive-recommendations', data),
  getById: (id: number) => apiClient.get<AdaptiveRecommendationResponse>(`/predictions/adaptive-recommendations/${id}`),
  getAll: () => apiClient.get<AdaptiveRecommendationResponse[]>('/predictions/adaptive-recommendations'),
  update: (id: number, data: AdaptiveRecommendationRequest) => apiClient.put<AdaptiveRecommendationResponse, AdaptiveRecommendationRequest>(`/predictions/adaptive-recommendations/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/predictions/adaptive-recommendations/${id}`),
  getByFarm: (farmId: number) => apiClient.get<AdaptiveRecommendationResponse[]>(`/predictions/adaptive-recommendations/farm/${farmId}`),
  getByType: (type: RecommendationType) => apiClient.get<AdaptiveRecommendationResponse[]>(`/predictions/adaptive-recommendations/type/${type}`),
};

export const cropSuitabilityApi = {
  create: (data: CropSuitabilityResultRequest) => apiClient.post<CropSuitabilityResultResponse, CropSuitabilityResultRequest>('/predictions/crop-suitability', data),
  getById: (id: number) => apiClient.get<CropSuitabilityResultResponse>(`/predictions/crop-suitability/${id}`),
  getAll: () => apiClient.get<CropSuitabilityResultResponse[]>('/predictions/crop-suitability'),
  update: (id: number, data: CropSuitabilityResultRequest) => apiClient.put<CropSuitabilityResultResponse, CropSuitabilityResultRequest>(`/predictions/crop-suitability/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/predictions/crop-suitability/${id}`),
  getByFarm: (farmId: number) => apiClient.get<CropSuitabilityResultResponse[]>(`/predictions/crop-suitability/farm/${farmId}`),
  getLatestByFarm: (farmId: number) => apiClient.get<CropSuitabilityResultResponse>(`/predictions/crop-suitability/farm/${farmId}/latest`),
};

export const marketPredictionsApi = {
  create: (data: MarketPredictionRequest) => apiClient.post<MarketPredictionResponse, MarketPredictionRequest>('/predictions/market', data),
  getById: (id: number) => apiClient.get<MarketPredictionResponse>(`/predictions/market/${id}`),
  getAll: () => apiClient.get<MarketPredictionResponse[]>('/predictions/market'),
  update: (id: number, data: MarketPredictionRequest) => apiClient.put<MarketPredictionResponse, MarketPredictionRequest>(`/predictions/market/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/predictions/market/${id}`),
  getByCrop: (cropId: number) => apiClient.get<MarketPredictionResponse[]>(`/predictions/market/crop/${cropId}`),
  getByRegionAndDate: (region: string, date: string) => apiClient.get<MarketPredictionResponse[]>(`/predictions/market/region/${encodeURIComponent(region)}/date/${date}`),
};
