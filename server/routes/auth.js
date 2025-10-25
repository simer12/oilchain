const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/helpers');

const router = express.Router();

// Mock users for demo mode
const mockUsers = {
  'farmer@demo.com': {
    _id: '507f1f77bcf86cd799439011',
    name: 'Demo Farmer',
    email: 'farmer@demo.com',
    password: '$2a$10$demo', // hashed password
    role: 'farmer',
    phone: '+91-9876543210',
    location: 'Karnataka'
  },
  'processor@demo.com': {
    _id: '507f1f77bcf86cd799439012',
    name: 'Demo Processor',
    email: 'processor@demo.com',
    password: '$2a$10$demo',
    role: 'processor',
    phone: '+91-9876543211',
    location: 'Maharashtra'
  }
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, location } = req.body;

    // Demo mode
    if (process.env.NODE_ENV === 'demo') {
      const token = generateToken('demo-' + Date.now(), role);
      return res.status(201).json({
        message: 'User registered successfully (Demo Mode)',
        token,
        user: { id: 'demo-' + Date.now(), name, email, role }
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      location
    });

    await user.save();

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Demo mode - accept any credentials
    if (process.env.NODE_ENV === 'demo') {
      const mockUser = mockUsers[email] || {
        _id: 'demo-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: password.includes('farmer') ? 'farmer' : 'processor'
      };
      const token = generateToken(mockUser._id, mockUser.role);
      return res.json({
        message: 'Login successful (Demo Mode)',
        token,
        user: { id: mockUser._id, name: mockUser.name, email: mockUser.email, role: mockUser.role }
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
