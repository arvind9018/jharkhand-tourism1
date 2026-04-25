// backend/services/weather.service.js
import axios from 'axios';

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    this.isConfigured = this.apiKey && this.apiKey.length > 10 && this.apiKey !== 'your_actual_32_char_api_key_here';
    
    if (!this.isConfigured) {
      console.log('⚠️ OpenWeatherMap API key not configured. Using mock weather data.');
    } else {
      console.log('✅ OpenWeatherMap API configured');
    }
  }

  async getCurrentWeather(lat, lon) {
    // If API not configured, return mock data
    if (!this.isConfigured) {
      return this.getMockWeatherData(lat, lon);
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        },
        timeout: 8000
      });
      
      return {
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        windSpeed: response.data.wind.speed,
        visibility: response.data.visibility || 10000,
        airQuality: await this.getAirQuality(lat, lon)
      };
    } catch (error) {
      console.log(`Weather API error, using mock data: ${error.message}`);
      return this.getMockWeatherData(lat, lon);
    }
  }

  getMockWeatherData(lat, lon) {
    // Generate realistic mock data based on time of day
    const hour = new Date().getHours();
    const isDay = hour > 6 && hour < 18;
    
    // Different weather based on destination name (using lat as seed)
    const destType = Math.abs(Math.sin(lat)) * 5;
    
    let temp, description, icon;
    if (destType < 1) {
      temp = 22 + Math.sin(lat) * 3;
      description = isDay ? 'Sunny' : 'Clear';
      icon = isDay ? '01d' : '01n';
    } else if (destType < 2) {
      temp = 24 + Math.cos(lon) * 4;
      description = isDay ? 'Partly cloudy' : 'Partly cloudy';
      icon = isDay ? '02d' : '02n';
    } else if (destType < 3) {
      temp = 20 + Math.sin(lat) * 5;
      description = 'Light rain';
      icon = '10d';
    } else {
      temp = 18 + Math.cos(lon) * 6;
      description = 'Cloudy';
      icon = '03d';
    }
    
    return {
      temperature: Math.round(temp * 10) / 10,
      feelsLike: Math.round((temp - 2) * 10) / 10,
      humidity: 55 + Math.floor(Math.sin(lat) * 30),
      pressure: 1012 + Math.floor(Math.cos(lon) * 10),
      description: description,
      icon: icon,
      windSpeed: 8 + Math.floor(Math.sin(lat) * 10),
      visibility: 10000,
      airQuality: {
        index: 2,
        level: 'FAIR',
        components: {
          pm2_5: 35.2,
          pm10: 48.5,
          no2: 22.1,
          so2: 8.3,
          co: 280.5,
          o3: 45.2
        }
      }
    };
  }

  async getAirQuality(lat, lon) {
    if (!this.isConfigured) {
      return {
        index: 2,
        level: 'FAIR',
        components: {
          pm2_5: 35.2,
          pm10: 48.5,
          no2: 22.1,
          so2: 8.3,
          co: 280.5,
          o3: 45.2
        }
      };
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: this.apiKey
        },
        timeout: 5000
      });
      
      const aqi = response.data.list[0].main.aqi;
      const components = response.data.list[0].components;
      
      return {
        index: aqi,
        level: this.getAQILevel(aqi),
        components: {
          pm2_5: components.pm2_5 || 0,
          pm10: components.pm10 || 0,
          no2: components.no2 || 0,
          so2: components.so2 || 0,
          co: components.co || 0,
          o3: components.o3 || 0
        }
      };
    } catch (error) {
      console.error('Air Quality API error:', error.message);
      return null;
    }
  }

  async getDestinationsWeather(destinations) {
    const weatherData = [];
    
    for (const dest of destinations) {
      try {
        if (dest.location?.coordinates?.lat && dest.location?.coordinates?.lng) {
          const weather = await this.getCurrentWeather(
            dest.location.coordinates.lat, 
            dest.location.coordinates.lng
          );
          weatherData.push({
            destinationId: dest._id,
            name: dest.name,
            weather
          });
        } else {
          // Add mock data for destinations without coordinates
          weatherData.push({
            destinationId: dest._id,
            name: dest.name,
            weather: this.getMockWeatherData(23.5, 85.3)
          });
        }
      } catch (error) {
        console.error(`Failed to fetch weather for ${dest.name}:`, error.message);
        // Still add mock data to avoid breaking the UI
        weatherData.push({
          destinationId: dest._id,
          name: dest.name,
          weather: this.getMockWeatherData(23.5, 85.3)
        });
      }
    }
    
    return weatherData;
  }

  async getEnvironmentalAlerts() {
    // Return mock alerts
    return [
      {
        destination: 'Netarhat',
        type: 'WEATHER_ADVISORY',
        severity: 'LOW',
        message: 'Pleasant weather expected throughout the day. Good for sightseeing.',
        timestamp: new Date()
      },
      {
        destination: 'Hundru Falls',
        type: 'WATER_LEVEL',
        severity: 'MEDIUM',
        message: 'Water levels are normal. Safe for visitors.',
        timestamp: new Date()
      },
      {
        destination: 'Betla National Park',
        type: 'WILDLIFE',
        severity: 'LOW',
        message: 'Wildlife sightings common during morning hours.',
        timestamp: new Date()
      }
    ];
  }

  getAQILevel(aqi) {
    switch(aqi) {
      case 1: return 'GOOD';
      case 2: return 'FAIR';
      case 3: return 'MODERATE';
      case 4: return 'POOR';
      case 5: return 'VERY_POOR';
      default: return 'MODERATE';
    }
  }
}

const weatherService = new WeatherService();
export default weatherService;