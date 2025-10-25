import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import api from '../utils/api';
import './Pages.css';

function PriceForecasting() {
  const [selectedOilseed, setSelectedOilseed] = useState('soybean');
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const oilseeds = ['soybean', 'groundnut', 'mustard', 'sunflower'];

  useEffect(() => {
    fetchPriceData();
  }, [selectedOilseed]);

  const fetchPriceData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/prices/forecast/${selectedOilseed}`);
      setPriceData(response.data);
    } catch (error) {
      console.error('Error fetching price data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockChartData = [
    { date: '1 Jun', actual: 45000, forecast: 45200 },
    { date: '2 Jun', actual: 45100, forecast: 45300 },
    { date: '3 Jun', actual: 45300, forecast: 45500 },
    { date: '4 Jun', actual: 45200, forecast: 45600 },
    { date: '5 Jun', actual: 45500, forecast: 45800 },
    { date: '6 Jun', actual: 45700, forecast: 46000 },
    { date: '7 Jun', actual: 45900, forecast: 46200 },
  ];

  const mockForecast30Days = [
    { day: '1-7 Jun', price: 45500 },
    { day: '8-14 Jun', price: 46200 },
    { day: '15-21 Jun', price: 46800 },
    { day: '22-30 Jun', price: 47100 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Price Forecasting & Market Trends</h1>
        <p>AI-powered price predictions for oilseeds across markets</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Select Oilseed:</label>
          <div className="oilseed-buttons">
            {oilseeds.map((oilseed) => (
              <button
                key={oilseed}
                className={`oilseed-btn ${selectedOilseed === oilseed ? 'active' : ''}`}
                onClick={() => setSelectedOilseed(oilseed)}
              >
                {oilseed.charAt(0).toUpperCase() + oilseed.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!loading && priceData && (
        <>
          <div className="forecast-cards">
            <div className="forecast-card">
              <p className="card-label">Current Market Price</p>
              <p className="card-value">₹{priceData.currentPrice?.toLocaleString() || '45,500'}</p>
            </div>

            <div className="forecast-card">
              <p className="card-label">30-Day Forecast</p>
              <p className="card-value">₹{priceData.forecast30Days?.toLocaleString() || '46,200'}</p>
              <div className={`trend ${priceData.trend === 'up' ? 'positive' : 'negative'}`}>
                {priceData.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{priceData.trend === 'up' ? '+' : '-'}₹{Math.abs(priceData.forecast30Days - priceData.currentPrice)}</span>
              </div>
            </div>

            <div className="forecast-card">
              <p className="card-label">90-Day Forecast</p>
              <p className="card-value">₹{priceData.forecast90Days?.toLocaleString() || '45,400'}</p>
              <p className="confidence">Confidence: {(priceData.confidence * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="chart-section">
            <h2>Price Trend Analysis</h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f093fb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f093fb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#667eea"
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  name="Actual Price"
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#f093fb"
                  fillOpacity={1}
                  fill="url(#colorForecast)"
                  name="Forecasted Price"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h2>30-Day Price Forecast Breakdown</h2>
            <div className="forecast-breakdown">
              {mockForecast30Days.map((item, idx) => (
                <div key={idx} className="breakdown-item">
                  <p className="breakdown-label">{item.day}</p>
                  <div className="price-bar">
                    <div className="price-fill" style={{ width: `${(item.price / 47500) * 100}%` }}></div>
                  </div>
                  <p className="breakdown-value">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="insights-section">
            <h2>Market Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Market Trend</h3>
                <p>Prices showing an upward trend over the next month due to seasonal demand.</p>
              </div>
              <div className="insight-card">
                <h3>Recommendation</h3>
                <p>Good time to harvest and sell. Prices expected to remain favorable through June.</p>
              </div>
              <div className="insight-card">
                <h3>Risk Assessment</h3>
                <p>Weather patterns indicate stable conditions. Low risk of price volatility.</p>
              </div>
              <div className="insight-card">
                <h3>Market Opportunity</h3>
                <p>Strong international demand expected. Consider bulk transactions for better margins.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {loading && <div className="loading">Loading price data...</div>}
    </div>
  );
}

export default PriceForecasting;
