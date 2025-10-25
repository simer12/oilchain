const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmName: String,
  farmSize: { type: Number, default: 0 }, // in hectares
  soilType: String,
  waterResources: [String],
  cropVariety: [String],
  certification: String,
  bankAccount: String,
  upiId: String,
  aadharNumber: String,
  kscsId: String,
  performance: {
    totalYieldProduced: { type: Number, default: 0 },
    qualityRating: { type: Number, default: 0 },
    paymentHistory: { type: Number, default: 100 },
    loyaltyScore: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
