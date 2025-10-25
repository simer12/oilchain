const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let mongoConnected = false;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    mongoConnected = true;
  })
  .catch(err => {
    console.log('⚠️  MongoDB connection error - running in demo mode');
    console.log('To enable database: Install MongoDB and run "mongod" in another terminal');
    mongoConnected = false;
  });

// Mock data for demo mode
app.use((req, res, next) => {
  if (!mongoConnected) {
    res.locals.demoMode = true;
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/farmers', require('./routes/farmers'));
app.use('/api/prices', require('./routes/prices'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/logistics', require('./routes/logistics'));
app.use('/api/warehouses', require('./routes/warehouses'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/transactions', require('./routes/transactions'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
