const express = require('express');
const Transaction = require('../models/Transaction');
const Farmer = require('../models/Farmer');
const Warehouse = require('../models/Warehouse');
const Price = require('../models/Price');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Mock data for demo mode
const mockDashboardData = {
  metrics: {
    totalFarmers: 2847,
    activeTransactions: 156,
    totalWarehouses: 34,
    averagePrice: 5840,
    timestamp: new Date()
  },
  trends: [
    { _id: 'Soybean', avgPrice: 5200, minPrice: 4900, maxPrice: 5400 },
    { _id: 'Mustard', avgPrice: 6100, minPrice: 5800, maxPrice: 6300 },
    { _id: 'Sunflower', avgPrice: 5850, minPrice: 5600, maxPrice: 6000 },
    { _id: 'Groundnut', avgPrice: 6450, minPrice: 6200, maxPrice: 6700 }
  ],
  farmerStats: {
    averageYield: 2.45,
    averageQuality: 7.8,
    averageLoyalty: 8.2
  }
};

router.get('/summary', authMiddleware, async (req, res) => {
  try {
    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      return res.json({ metrics: mockDashboardData.metrics });
    }

    const totalFarmers = await Farmer.countDocuments();
    const activeTransactions = await Transaction.countDocuments({ status: 'pending' });
    const totalWarehouses = await Warehouse.countDocuments();
    
    const priceData = await Price.find().sort({ date: -1 }).limit(1);
    const avgPrice = priceData[0]?.currentMarketPrice || 0;

    res.json({
      metrics: {
        totalFarmers,
        activeTransactions,
        totalWarehouses,
        averagePrice: avgPrice,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/market-trends', async (req, res) => {
  try {
    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      return res.json({ trends: mockDashboardData.trends });
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const trends = await Price.find({ date: { $gte: sevenDaysAgo } })
      .group({
        _id: '$oilseedType',
        avgPrice: { $avg: '$currentMarketPrice' },
        minPrice: { $min: '$currentMarketPrice' },
        maxPrice: { $max: '$currentMarketPrice' }
      });

    res.json({ trends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/farmer-statistics', authMiddleware, async (req, res) => {
  try {
    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      return res.json(mockDashboardData.farmerStats);
    }

    const farmers = await Farmer.find().select('performance').limit(100);
    
    const stats = {
      averageYield: farmers.reduce((sum, f) => sum + (f.performance.totalYieldProduced || 0), 0) / farmers.length,
      averageQuality: farmers.reduce((sum, f) => sum + (f.performance.qualityRating || 0), 0) / farmers.length,
      averageLoyalty: farmers.reduce((sum, f) => sum + (f.performance.loyaltyScore || 0), 0) / farmers.length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
