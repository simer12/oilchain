const express = require('express');
const Farmer = require('../models/Farmer');
const CroppingPlan = require('../models/CroppingPlan');
const { authMiddleware } = require('../middleware/auth');
const { recommendCrop } = require('../utils/aiEngine');

const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { farmName, farmSize, soilType, waterResources, cropVariety } = req.body;

    const farmer = new Farmer({
      userId: req.user.userId,
      farmName,
      farmSize,
      soilType,
      waterResources,
      cropVariety
    });

    await farmer.save();
    res.status(201).json({ message: 'Farmer profile created', farmer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile/:id', authMiddleware, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ error: 'Farmer not found' });
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-profile', authMiddleware, async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ userId: req.user.userId });
    if (!farmer) return res.status(404).json({ error: 'Farmer profile not found' });
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/cropping-plan', authMiddleware, async (req, res) => {
  try {
    const { season, year, plannedArea } = req.body;
    
    const farmer = await Farmer.findOne({ userId: req.user.userId });
    if (!farmer) return res.status(404).json({ error: 'Farmer not found' });

    const recommendedCrop = recommendCrop(
      farmer.soilType,
      farmer.rainfall || 600,
      farmer.temperature || 25,
      farmer.location
    );

    const croppingPlan = new CroppingPlan({
      farmerId: farmer._id,
      season,
      year,
      plannedArea,
      plannedCropVariety: recommendedCrop,
      aiRecommendation: `Based on your soil type (${farmer.soilType}), we recommend planting ${recommendedCrop}`,
      status: 'planned'
    });

    await croppingPlan.save();
    res.status(201).json({ message: 'Cropping plan created', croppingPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/cropping-plans/:farmerId', authMiddleware, async (req, res) => {
  try {
    const plans = await CroppingPlan.find({ farmerId: req.params.farmerId });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/performance/:farmerId', authMiddleware, async (req, res) => {
  try {
    const { totalYieldProduced, qualityRating, paymentHistory, loyaltyScore } = req.body;

    const farmer = await Farmer.findByIdAndUpdate(
      req.params.farmerId,
      {
        performance: {
          totalYieldProduced: totalYieldProduced || 0,
          qualityRating: qualityRating || 0,
          paymentHistory: paymentHistory || 100,
          loyaltyScore: loyaltyScore || 0
        }
      },
      { new: true }
    );

    res.json({ message: 'Performance updated', farmer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
