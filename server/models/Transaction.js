const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  oilseedType: String,
  quantity: Number, // in quintals
  unitPrice: Number,
  totalAmount: Number,
  transactionDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'rejected', 'cancelled'], 
    default: 'pending' 
  },
  paymentMethod: { type: String, enum: ['bank', 'upi', 'cash'] },
  blockchainHash: String, // For traceability
  qualityGrade: String, // A, B, C
  moisture: Number, // percentage
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
