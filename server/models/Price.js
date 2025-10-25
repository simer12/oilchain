const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  oilseedType: { type: String, required: true }, // soybean, groundnut, mustard, etc.
  date: { type: Date, required: true },
  location: {
    state: String,
    district: String,
    market: String
  },
  mindiPrice: Number, // Minimum support price
  currentMarketPrice: Number,
  futurePrice: Number, // Predicted price
  forecastDate: Date,
  priceChange: Number, // percentage change
  volume: Number, // trading volume
  trend: { type: String, enum: ['up', 'down', 'stable'] },
  aiInsight: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Price', priceSchema);
