const express = require('express');
const Logistics = require('../models/Logistics');
const { authMiddleware } = require('../middleware/auth');
const { generateTrackingId, calculateDistance } = require('../utils/helpers');
const { calculateCO2Emissions } = require('../utils/aiEngine');

const router = express.Router();

router.post('/create-shipment', authMiddleware, async (req, res) => {
  try {
    const { transactionId, origin, destination } = req.body;

    const trackingId = generateTrackingId();
    const distance = calculateDistance(
      origin.coordinates.latitude,
      origin.coordinates.longitude,
      destination.coordinates.latitude,
      destination.coordinates.longitude
    );

    const co2 = calculateCO2Emissions(distance, 'truck');

    const logistics = new Logistics({
      trackingId,
      transactionId,
      origin,
      destination,
      currentLocation: origin.coordinates,
      status: 'pending',
      routeOptimization: {
        distance: Math.round(distance * 100) / 100,
        estimatedTime: Math.round(distance / 60),
        fuelCost: Math.round(distance * 2.5),
        co2Emissions: co2
      },
      temperature: 25,
      humidity: 60
    });

    await logistics.save();
    res.status(201).json({ message: 'Shipment created', logistics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/track/:trackingId', async (req, res) => {
  try {
    const shipment = await Logistics.findOne({ trackingId: req.params.trackingId })
      .populate('destination.warehouseId');

    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-shipments', authMiddleware, async (req, res) => {
  try {
    const shipments = await Logistics.find()
      .populate('transactionId')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update-location/:trackingId', authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude, address } = req.body;

    const shipment = await Logistics.findOneAndUpdate(
      { trackingId: req.params.trackingId },
      {
        currentLocation: {
          latitude,
          longitude,
          address,
          timestamp: new Date()
        }
      },
      { new: true }
    );

    res.json({ message: 'Location updated', shipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update-status/:trackingId', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const shipment = await Logistics.findOneAndUpdate(
      { trackingId: req.params.trackingId },
      { status },
      { new: true }
    );

    res.json({ message: 'Status updated', shipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
