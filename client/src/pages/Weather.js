import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import './Pages.css';

function Weather() {
  const [location, setLocation] = useState('maharashtra');
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const locations = ['maharashtra', 'madhya-pradesh', 'rajasthan', 'karnataka'];

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const weatherResponse = await api.get(`/weather/current/${location}`);
      const alertsResponse = await api.get(`/weather/alerts/${location}`);
      setWeatherData(weatherResponse.data);
      setAlerts(alertsResponse.data.alerts);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Weather & Pest Advisory</h1>
        <p>Real-time weather data and AI-powered pest management recommendations</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Select Location:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!loading && weatherData && (
        <>
          <div className="weather-cards">
            <div className="weather-card">
              <div className="weather-icon">
                <Cloud size={40} />
              </div>
              <p className="weather-label">Temperature</p>
              <p className="weather-value">{weatherData.current.temp}°C</p>
              <p className="weather-condition">{weatherData.current.condition}</p>
            </div>

            <div className="weather-card">
              <div className="weather-icon humidity">
                <Droplets size={40} />
              </div>
              <p className="weather-label">Humidity</p>
              <p className="weather-value">{weatherData.current.humidity}%</p>
              <p className="weather-condition">Air Moisture</p>
            </div>

            <div className="weather-card">
              <div className="weather-icon wind">
                <Wind size={40} />
              </div>
              <p className="weather-label">Rainfall</p>
              <p className="weather-value">{weatherData.current.rainfall}mm</p>
              <p className="weather-condition">Last Month</p>
            </div>
          </div>

          <div className="forecast-section">
            <h2>3-Day Forecast</h2>
            <div className="forecast-grid">
              {weatherData.forecast.map((day, idx) => (
                <div key={idx} className="forecast-item">
                  <p className="forecast-day">{day.day}</p>
                  <p className="forecast-temp">{day.high}° / {day.low}°</p>
                  <p className="forecast-condition">{day.condition}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="alerts-section">
            <h2>Active Alerts</h2>
            {alerts.length > 0 ? (
              <div className="alerts-list">
                {alerts.map((alert, idx) => (
                  <div key={idx} className={`alert-item alert-${alert.severity}`}>
                    <AlertCircle size={20} />
                    <div className="alert-content">
                      <p className="alert-message">{alert.message}</p>
                      <p className="alert-location">{alert.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-alerts">No active weather alerts</p>
            )}
          </div>

          <div className="recommendations-section">
            <h2>Farming Recommendations</h2>
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <h3>Irrigation</h3>
                <p>Current humidity is {weatherData.current.humidity}%. Reduce irrigation frequency based on soil moisture.</p>
              </div>
              <div className="recommendation-card">
                <h3>Pest Management</h3>
                <p>Temperature and humidity levels are favorable for pest activity. Monitor crops closely.</p>
              </div>
              <div className="recommendation-card">
                <h3>Fertilizer Application</h3>
                <p>No rain expected in next 2 days. Good time for fertilizer application and pest control spraying.</p>
              </div>
              <div className="recommendation-card">
                <h3>Harvesting</h3>
                <p>Weather conditions are optimal for harvesting. Moisture levels are ideal for quality preservation.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {loading && <div className="loading">Loading weather data...</div>}
    </div>
  );
}

export default Weather;
