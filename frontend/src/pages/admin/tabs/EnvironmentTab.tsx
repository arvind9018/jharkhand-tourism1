// pages/admin/tabs/EnvironmentTab.tsx
import { useState, useEffect } from 'react'
import { EnvironmentalData } from "../../../services/authApi"
import { 
  getAllDestinationsWeather, 
  getEnvironmentalAlerts,
  type DestinationWeather,
  type EnvironmentalAlert 
} from "../../../services/weatherApi"

interface EnvironmentTabProps {
  environmentalData: EnvironmentalData | null
}

export const EnvironmentTab = ({ environmentalData }: EnvironmentTabProps) => {
  const [weatherData, setWeatherData] = useState<DestinationWeather[]>([])
  const [alerts, setAlerts] = useState<EnvironmentalAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [forecast, setForecast] = useState<any[]>([])

  useEffect(() => {
    loadWeatherData()
    loadAlerts()
  }, [])

  const loadWeatherData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getAllDestinationsWeather()
      if (response.success && response.data && response.data.length > 0) {
        setWeatherData(response.data)
      } else {
        const errorMsg = response.message || 'No real-time weather data available'
        setError(errorMsg)
        setWeatherData([])
        console.warn('Weather data warning:', errorMsg)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load weather data'
      setError(errorMsg)
      setWeatherData([])
      console.error('Error loading weather data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadAlerts = async () => {
    try {
      const response = await getEnvironmentalAlerts()
      if (response.success && response.data) {
        setAlerts(response.data)
      } else {
        console.warn('Alerts response:', response.message)
        setAlerts([])
      }
    } catch (err) {
      console.error('Error loading alerts:', err)
      setAlerts([])
    }
  }

  const getWeatherIcon = (iconCode: string) => {
    const icons: Record<string, string> = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return icons[iconCode] || '🌡️'
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-300'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Environmental Monitoring</h2>
      
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold text-red-800">Weather Data Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <p className="text-xs text-red-600 mt-2">Please ensure your OpenWeather API key is configured in the backend .env file.</p>
          </div>
        </div>
      )}
      
      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <span>⚠️</span> Environmental Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{alert.destination}</p>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <p className="text-xs mt-2 opacity-75">Type: {alert.type}</p>
                  </div>
                  <span className="text-xs">{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <span>🌡️</span> Real-Time Weather Conditions
          </h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : weatherData.length > 0 ? (
            <div className="space-y-4">
              {weatherData.slice(0, 5).map((item) => (
                <div key={item.destinationId} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-primary">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl">{getWeatherIcon(item.weather.icon)}</span>
                        <span className="text-xl font-bold">{Math.round(item.weather.temperature)}°C</span>
                        <span className="text-sm text-gray-500">{item.weather.description}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedDestination(item.destinationId)}
                      className="text-accent text-sm hover:underline"
                    >
                      Details →
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-gray-500">
                    <span>💧 {item.weather.humidity}%</span>
                    <span>💨 {item.weather.windSpeed} km/h</span>
                    <span>👁️ {item.weather.visibility / 1000} km</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No real-time weather data available</p>
              <p className="text-xs mt-2">Check API configuration or try again later</p>
            </div>
          )}
        </div>

        {/* Air Quality Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <span>🌫️</span> Air Quality Index
          </h3>
          <div className="space-y-4">
            {weatherData.length > 0 ? (
              weatherData.slice(0, 5).map((item) => {
                const aqiLevel = item.weather.airQuality?.level || 'MODERATE'
                const aqiIndex = item.weather.airQuality?.index || 'N/A'
                const pm25 = item.weather.airQuality?.components?.pm2_5
                return (
                  <div key={item.destinationId} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        aqiLevel === 'GOOD' ? 'bg-green-100 text-green-800' :
                        aqiLevel === 'FAIR' ? 'bg-blue-100 text-blue-800' :
                        aqiLevel === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                        aqiLevel === 'POOR' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        AQI: {aqiIndex}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {aqiLevel} • PM2.5: {pm25 ? pm25.toFixed(1) : 'N/A'} µg/m³
                    </p>
                  </div>
                )
              })
            ) : (
              <p className="text-gray-500 text-sm">No air quality data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Water Levels Card (Mock data - can be replaced with real API) */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <span>💧</span> Water Levels
        </h3>
        <div className="space-y-3">
          {environmentalData?.waterLevels.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.location}</p>
                <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  item.status === 'DANGER' ? 'text-red-600' :
                  item.status === 'RISING' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {item.level}m
                </p>
                <p className="text-xs">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Density Card (Mock data - can be replaced with real API) */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <span>👥</span> Visitor Density
        </h3>
        <div className="space-y-3">
          {environmentalData?.visitorDensity.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <span>{item.destination}</span>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  item.density === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                  item.density === 'HIGH' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.density}
                </span>
                <p className="text-xs mt-1">{item.currentVisitors}/{item.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}