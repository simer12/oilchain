const express = require('express');
const Price = require('../models/Price');
const { authMiddleware } = require('../middleware/auth');
const { predictPrice } = require('../utils/aiEngine');

const router = express.Router();

// Mock price data
const mockPrices = [
  { oilseedType: 'Soybean', currentMarketPrice: 5200, minPrice: 4900, date: new Date() },
  { oilseedType: 'Mustard', currentMarketPrice: 6100, minPrice: 5800, date: new Date() },
  { oilseedType: 'Sunflower', currentMarketPrice: 5850, minPrice: 5600, date: new Date() },
  { oilseedType: 'Groundnut', currentMarketPrice: 6450, minPrice: 6200, date: new Date() }
];

router.get('/current', async (req, res) => {
  try {
    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      return res.json(mockPrices);
    }

    const { oilseedType, location } = req.query;
    
    const filter = {};
    if (oilseedType) filter.oilseedType = oilseedType;
    if (location) filter['location.state'] = location;

    const prices = await Price.find(filter).sort({ date: -1 }).limit(100);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/forecast/:oilseedType', async (req, res) => {
  try {
    const { oilseedType } = req.params;
    
    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      const mockPrice = mockPrices.find(p => p.oilseedType === oilseedType) || mockPrices[0];
      return res.json({
        oilseedType,
        currentPrice: mockPrice.currentMarketPrice,
        forecastedPrice: Math.round(mockPrice.currentMarketPrice * 1.05),
        trend: 'up',
        forecast30Days: Math.round(mockPrice.currentMarketPrice * 1.05),
        forecast90Days: Math.round(mockPrice.currentMarketPrice * 1.08),
        confidence: 0.85
      });
    }

    const historicalPrices = await Price.find({ oilseedType })
      .sort({ date: -1 })
      .limit(30);

    const priceValues = historicalPrices.map(p => p.currentMarketPrice);
    
    // Determine trend
    const trend = priceValues[0] > priceValues[priceValues.length - 1] ? 'down' : 'up';
    
    const forecastedPrice = predictPrice(priceValues, trend);

    res.json({
      oilseedType,
      currentPrice: priceValues[0],
      forecastedPrice,
      trend,
      forecast30Days: forecastedPrice,
      forecast90Days: Math.round(forecastedPrice * 0.98),
      confidence: 0.85
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trends/:oilseedType', async (req, res) => {
  try {
    const { oilseedType } = req.params;
    
    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      const mockPrice = mockPrices.find(p => p.oilseedType === oilseedType) || mockPrices[0];
      return res.json({
        oilseedType,
        period: '30 days',
        dataPoints: 30,
        prices: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          price: mockPrice.currentMarketPrice + Math.random() * 200 - 100,
          location: 'Market'
        }))
      });
    }

    const days = req.query.days || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const prices = await Price.find({
      oilseedType,
      date: { $gte: cutoffDate }
    }).sort({ date: 1 });

    res.json({
      oilseedType,
      period: `${days} days`,
      dataPoints: prices.length,
      prices: prices.map(p => ({
        date: p.date,
        price: p.currentMarketPrice,
        location: p.location.market
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { oilseedType, currentMarketPrice, location } = req.body;

    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      return res.status(201).json({
        message: 'Price added (Demo Mode)',
        price: { oilseedType, currentMarketPrice, date: new Date() }
      });
    }

    const price = new Price({
      oilseedType,
      date: new Date(),
      location,
      currentMarketPrice,
      mindiPrice: currentMarketPrice * 0.95
    });

    await price.save();
    res.status(201).json({ message: 'Price added', price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
