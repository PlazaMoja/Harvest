import {
  Language,
  LiteracyLevel,
  SoilType,
  IrrigationMethod,
  CropCategory,
  FertilityLevel,
  WeatherDataType,
  RiskLevel,
  OverallRiskLevel,
  RecommendationType,
} from './enums';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  fieldErrors?: Record<string, string>;
  timestamp: string;
}

export interface FarmerResponse {
  farmerId: number;
  name: string;
  language: Language;
  literacyLevel?: LiteracyLevel;
  contactNumber?: string;
  location: string;
}

export interface FarmerRequest {
  name: string;
  language: Language;
  literacyLevel?: LiteracyLevel;
  contactNumber?: string;
  location: string;
}

export interface FarmResponse {
  farmId: number;
  farmer: FarmerResponse;
  location: string;
  sizeInHectares?: number;
  soilType?: SoilType;
  irrigationMethod?: IrrigationMethod;
  currentCrops?: string[];
  financialGoals?: string;
  notes?: string;
  images?: string[];
}

export interface FarmRequest {
  farmerId: number;
  location: string;
  sizeInHectares?: number;
  soilType?: SoilType;
  irrigationMethod?: IrrigationMethod;
  currentCrops?: string[];
  financialGoals?: string;
  notes?: string;
  images?: string[];
}

export interface CropResponse {
  cropId: number;
  name: string;
  category?: CropCategory;
  typicalYieldPerHectare?: number;
  growthDurationDays?: number;
}

export interface CropRequest {
  name: string;
  category?: CropCategory;
  typicalYieldPerHectare?: number;
  growthDurationDays?: number;
}

export interface SoilDataResponse {
  soilDataId: number;
  farm: FarmResponse;
  pH?: number;
  nitrogenLevel?: number;
  phosphorusLevel?: number;
  potassiumLevel?: number;
  organicCarbon?: number;
  sandContent?: number;
  siltContent?: number;
  clayContent?: number;
  fertilityLevel?: FertilityLevel;
  source: string;
  fetchedAt: string;
}

export interface SoilDataRequest {
  farmId: number;
  pH?: number;
  nitrogenLevel?: number;
  phosphorusLevel?: number;
  potassiumLevel?: number;
  organicCarbon?: number;
  sandContent?: number;
  siltContent?: number;
  clayContent?: number;
  fertilityLevel?: FertilityLevel;
  source: string;
}

export interface WeatherDataResponse {
  weatherDataId: number;
  farm: FarmResponse;
  temperatureCelsius?: number;
  rainfallMm?: number;
  humidityPercent?: number;
  windSpeedKmh?: number;
  forecastDate: string;
  dataType: WeatherDataType;
  source: string;
  fetchedAt: string;
}

export interface WeatherDataRequest {
  farmId: number;
  temperatureCelsius?: number;
  rainfallMm?: number;
  humidityPercent?: number;
  windSpeedKmh?: number;
  forecastDate: string;
  dataType: WeatherDataType;
  source: string;
}

export interface YieldPredictionResponse {
  predictionId: number;
  farm: FarmResponse;
  crop: CropResponse;
  expectedYieldTons: number;
  expectedProfitZAR?: number;
  generatedAt: string;
}

export interface YieldPredictionRequest {
  farmId: number;
  cropId: number;
  expectedYieldTons: number;
  expectedProfitZAR?: number;
}

export interface PestDiseasePredictionResponse {
  predictionId: number;
  farm: FarmResponse;
  crop: CropResponse;
  riskLevel: RiskLevel;
  pestOrDiseaseType: string;
  probability?: number;
  recommendedAction?: string;
  generatedAt: string;
}

export interface PestDiseasePredictionRequest {
  farmId: number;
  cropId: number;
  riskLevel: RiskLevel;
  pestOrDiseaseType: string;
  probability?: number;
  recommendedAction?: string;
}

export interface RiskAssessmentResponse {
  riskId: number;
  farm: FarmResponse;
  droughtProbability: number;
  pestProbability: number;
  marketVolatilityProbability: number;
  overallRiskLevel: OverallRiskLevel;
  generatedAt: string;
}

export interface RiskAssessmentRequest {
  farmId: number;
  droughtProbability: number;
  pestProbability: number;
  marketVolatilityProbability: number;
}

export interface AdaptiveRecommendationResponse {
  recommendationId: number;
  farm: FarmResponse;
  crop?: CropResponse;
  recommendationType: RecommendationType;
  reason: string;
  generatedAt: string;
}

export interface AdaptiveRecommendationRequest {
  farmId: number;
  cropId?: number;
  recommendationType: RecommendationType;
  reason: string;
}

export interface CropSuitabilityResultResponse {
  resultId: number;
  farm: FarmResponse;
  recommendedCrops: CropResponse[];
  generatedAt: string;
}

export interface CropSuitabilityResultRequest {
  farmId: number;
  recommendedCropIds: number[];
}

export interface MarketPredictionResponse {
  predictionId: number;
  crop: CropResponse;
  region: string;
  predictedPriceZAR: number;
  forecastDate: string;
  confidenceScore?: number;
  generatedAt: string;
}

export interface MarketPredictionRequest {
  cropId: number;
  region: string;
  predictedPriceZAR: number;
  forecastDate: string;
  confidenceScore?: number;
}

export interface FarmerFeedbackResponse {
  feedbackId: number;
  farm: FarmResponse;
  crop: CropResponse;
  actualYieldTons?: number;
  cropPerformanceRating: number;
  notes?: string;
  submittedAt: string;
}

export interface FarmerFeedbackRequest {
  farmId: number;
  cropId: number;
  actualYieldTons?: number;
  cropPerformanceRating: number;
  notes?: string;
}

export interface DashboardOutputResponse {
  outputId: number;
  farm: FarmResponse;
  recommendedCrops?: CropResponse[];
  predictedYieldTons?: number;
  expectedProfitZAR?: number;
  climateAlerts?: string[];
  pestWarnings?: string[];
  seasonalPlan?: string;
  generatedAt: string;
}

export interface DashboardOutputRequest {
  farmId: number;
  recommendedCropIds?: number[];
  predictedYieldTons?: number;
  expectedProfitZAR?: number;
  climateAlerts?: string[];
  pestWarnings?: string[];
  seasonalPlan?: string;
}
