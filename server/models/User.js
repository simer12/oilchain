const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['farmer', 'fpo', 'processor', 'retailer', 'admin'], 
    required: true 
  },
  phone: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    state: String,
    district: String
  },
  profileComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
