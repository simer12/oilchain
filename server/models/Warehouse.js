const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: String,
    state: String,
    district: String
  },
  capacity: { type: Number, required: true }, // in quintals
  currentStock: { type: Number, default: 0 },
  storageType: { type: String, enum: ['cold', 'dry', 'climate-controlled'] },
  oilseedsStored: [
    {
      type: String,
      quantity: Number,
      storageDate: Date,
      expiryDate: Date
    }
  ],
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  operationalCost: Number, // per quintal per month
  utilization: Number, // percentage
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
