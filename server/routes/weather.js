const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Mock weather data
const mockWeatherData = {
  'maharashtra': { temp: 32, humidity: 65, rainfall: 450, condition: 'Partly Cloudy' },
  'madhya-pradesh': { temp: 28, humidity: 58, rainfall: 600, condition: 'Clear' },
  'rajasthan': { temp: 35, humidity: 40, rainfall: 300, condition: 'Clear' },
  'karnataka': { temp: 30, humidity: 70, rainfall: 550, condition: 'Sunny' }
};

const mockAlerts = [
  { severity: 'high', message: 'High pest activity detected in soybean farms', location: 'madhya-pradesh' },
  { severity: 'medium', message: 'Water stress conditions expected', location: 'rajasthan' },
  { severity: 'low', message: 'Fungal disease risk moderate', location: 'maharashtra' }
];

router.get('/current/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const weather = mockWeatherData[location.toLowerCase()] || mockWeatherData['maharashtra'];

    res.json({
      location,
      current: weather,
      forecast: [
        { day: 'Today', high: weather.temp, low: weather.temp - 5, condition: weather.condition },
        { day: 'Tomorrow', high: weather.temp + 2, low: weather.temp - 3, condition: 'Partly Cloudy' },
        { day: '+2 Days', high: weather.temp + 1, low: weather.temp - 4, condition: 'Clear' }
      ],
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/alerts/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const locationAlerts = mockAlerts.filter(a => a.location === location.toLowerCase());

    res.json({
      location,
      alerts: locationAlerts.length > 0 ? locationAlerts : mockAlerts.slice(0, 2),
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/pest-advisory/:cropType', async (req, res) => {
  try {
    const { cropType } = req.params;
    
    const advisories = {
      'soybean': {
        pests: ['leaf beetles', 'stem flies', 'spider mites'],
        management: 'Regular monitoring, use of bio-pesticides recommended',
        riskLevel: 'medium'
      },
      'groundnut': {
        pests: ['leaf miners', 'pod borers', 'thrips'],
        management: 'Crop rotation, use of resistant varieties',
        riskLevel: 'high'
      },
      'mustard': {
        pests: ['sawflies', 'stem borers', 'cabbage aphids'],
        management: 'Regular spraying, cultural practices',
        riskLevel: 'low'
      }
    };

    const advisory = advisories[cropType] || advisories['soybean'];
    
    res.json({
      cropType,
      ...advisory,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/satellite-data/:location', authMiddleware, async (req, res) => {
  try {
    const { location } = req.params;
    
    res.json({
      location,
      ndvi: 0.65, // Normalized Difference Vegetation Index
      moisture: 42,
      soilHealth: 'Good',
      anomalies: 'None detected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
