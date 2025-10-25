const express = require('express');
const Warehouse = require('../models/Warehouse');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { name, location, capacity, storageType } = req.body;

    const warehouse = new Warehouse({
      name,
      location,
      capacity,
      storageType,
      managerId: req.user.userId
    });

    await warehouse.save();
    res.status(201).json({ message: 'Warehouse registered', warehouse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const { state, district } = req.query;
    
    const filter = {};
    if (state) filter['location.state'] = state;
    if (district) filter['location.district'] = district;

    const warehouses = await Warehouse.find(filter).populate('managerId', 'name phone');
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id).populate('managerId');
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/add-stock', authMiddleware, async (req, res) => {
  try {
    const { oilseedType, quantity, expiryDate } = req.body;

    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          oilseedsStored: {
            type: oilseedType,
            quantity,
            storageDate: new Date(),
            expiryDate
          }
        },
        $inc: { currentStock: quantity }
      },
      { new: true }
    );

    // Update utilization
    const utilization = Math.round((warehouse.currentStock / warehouse.capacity) * 100);
    warehouse.utilization = utilization;
    await warehouse.save();

    res.json({ message: 'Stock added', warehouse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/utilization', async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });

    const utilization = Math.round((warehouse.currentStock / warehouse.capacity) * 100);
    const availableSpace = warehouse.capacity - warehouse.currentStock;

    res.json({
      warehouseName: warehouse.name,
      totalCapacity: warehouse.capacity,
      currentStock: warehouse.currentStock,
      availableSpace,
      utilizationPercentage: utilization,
      status: utilization > 90 ? 'Full' : utilization > 70 ? 'High' : 'Normal'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
