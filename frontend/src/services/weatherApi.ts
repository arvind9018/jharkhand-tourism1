// frontend/src/services/weatherApi.ts
import { api } from './api';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  windSpeed: number;
  visibility: number;
  airQuality: {
    index: number;
    level: string;
    components: {
      pm2_5: number;
      pm10: number;
      no2: number;
      so2: number;
      co: number;
      o3: number;
    };
  } | null;
}

export interface DestinationWeather {
  destinationId: string;
  name: string;
  weather: WeatherData;
}

export interface EnvironmentalAlert {
  destination: string;
  type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  timestamp: string;
}

export const getAllDestinationsWeather = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No auth token, skipping weather fetch');
      return { success: true, data: [] };
    }
    
    const response = await api.get('/weather/all');
    return response.data;
  } catch (error: any) {
    console.warn('Weather fetch warning:', error.response?.status, error.message);
    // Return empty data instead of error to prevent UI breaking
    return { success: true, data: [] };
  }
};

export const getEnvironmentalAlerts = async () => {
  try {
    const response = await api.get('/weather/alerts');
    return response.data;
  } catch (error: any) {
    console.warn('Alerts fetch warning:', error.message);
    return { success: true, data: [] };
  }
};

export const getDestinationWeather = async (destinationId: string) => {
  try {
    const response = await api.get(`/weather/destination/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination weather:', error);
    return { success: true, data: null };
  }
};

export const getAirQuality = async (lat: number, lon: number) => {
  try {
    const response = await api.get(`/weather/air-quality?lat=${lat}&lon=${lon}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    return { success: true, data: null };
  }
};