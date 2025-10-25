const mongoose = require('mongoose');

const logisticsSchema = new mongoose.Schema({
  trackingId: { type: String, unique: true, required: true },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  origin: {
    location: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  destination: {
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    coordinates: { latitude: Number, longitude: Number }
  },
  carrier: String,
  vehicleNumber: String,
  currentLocation: {
    latitude: Number,
    longitude: Number,
    address: String,
    timestamp: Date
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-transit', 'delivered', 'delayed'], 
    default: 'pending' 
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  routeOptimization: {
    distance: Number, // km
    estimatedTime: Number, // hours
    fuelCost: Number,
    co2Emissions: Number // kg
  },
  temperature: Number, // for cold chain
  humidity: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logistics', logisticsSchema);
