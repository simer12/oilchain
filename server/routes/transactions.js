const express = require('express');
const Transaction = require('../models/Transaction');
const Farmer = require('../models/Farmer');
const { authMiddleware } = require('../middleware/auth');
const { generateTransactionId } = require('../utils/helpers');

const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { farmerId, buyerId, oilseedType, quantity, unitPrice } = req.body;

    const transactionId = generateTransactionId();
    const totalAmount = quantity * unitPrice;

    const transaction = new Transaction({
      transactionId,
      farmerId,
      buyerId: buyerId || req.user.userId,
      oilseedType,
      quantity,
      unitPrice,
      totalAmount,
      status: 'pending'
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { farmerId: req.user.userId },
        { buyerId: req.user.userId }
      ]
    }).populate('farmerId buyerId').sort({ transactionDate: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:transactionId', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ transactionId: req.params.transactionId })
      .populate('farmerId buyerId');

    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:transactionId/complete', authMiddleware, async (req, res) => {
  try {
    const { qualityGrade, moisture, blockchainHash } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { transactionId: req.params.transactionId },
      {
        status: 'completed',
        qualityGrade,
        moisture,
        blockchainHash
      },
      { new: true }
    );

    res.json({ message: 'Transaction completed', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analytics/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const completedTransactions = await Transaction.countDocuments({ status: 'completed' });
    const totalValue = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalTransactions,
      completedTransactions,
      totalValue: totalValue[0]?.total || 0,
      successRate: Math.round((completedTransactions / totalTransactions) * 100)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
