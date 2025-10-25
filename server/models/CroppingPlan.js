const mongoose = require('mongoose');

const croppingPlanSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  season: { type: String, enum: ['rabi', 'kharif', 'zaid'], required: true },
  year: { type: Number, required: true },
  plannedCropVariety: String,
  plannedArea: Number, // hectares
  expectedYield: Number, // quintals
  aiRecommendation: String,
  weatherForecast: String,
  pestRiskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  irrigationSchedule: [
    {
      date: Date,
      quantity: Number,
      weatherBased: Boolean
    }
  ],
  fertilizerSchedule: [
    {
      date: Date,
      type: String,
      quantity: Number
    }
  ],
  status: { type: String, enum: ['planned', 'active', 'completed'], default: 'planned' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CroppingPlan', croppingPlanSchema);
