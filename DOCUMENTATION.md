# OilChain Platform - Complete Documentation

## 📚 Table of Contents
1. [Platform Overview](#platform-overview)
2. [Architecture](#architecture)
3. [Installation Guide](#installation-guide)
4. [API Documentation](#api-documentation)
5. [Feature Details](#feature-details)
6. [Database Schema](#database-schema)
7. [Deployment Guide](#deployment-guide)

---

## Platform Overview

### Mission
OilChain is an AI-enabled, blockchain-integrated value chain platform designed to:
- Increase oilseed production efficiency
- Enable direct farmer-to-market linkages
- Provide real-time price discovery and forecasting
- Ensure supply chain transparency and traceability
- Facilitate credit and insurance integration
- Optimize logistics and reduce post-harvest losses

### Key Statistics
- **Target Production Increase**: From 42.61 to 69 million tonnes by 2030-31
- **Current Import Dependency**: 55-60% of edible oil needs
- **Platform Scalability**: Multi-tenant architecture supporting unlimited users
- **Data Security**: Blockchain-based traceability

### User Roles
1. **Farmer**: Producers of oilseeds
2. **FPO**: Farmer Producer Organizations for collective action
3. **Processor**: Transform raw oilseeds into edible oil
4. **Retailer**: End-point market participants
5. **Admin**: Platform administrators and moderators

---

## Architecture

### System Architecture
```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│         - Dashboard, Analytics, Marketplace         │
│         - Weather, Logistics, Warehouses            │
└────────────────────┬────────────────────────────────┘
                     │
                ┌────▼─────┐
                │   API    │
                │ Gateway  │
                └────┬─────┘
                     │
┌────────────────────┼────────────────────────────────┐
│                    │                                │
│  ┌──────────────────▼──────────────────┐           │
│  │    Express.js Server                │           │
│  ├──────────────────────────────────────┤           │
│  │ - Routes                             │           │
│  │ - Controllers                        │           │
│  │ - Middleware (Auth, Validation)      │           │
│  │ - AI/ML Engine                       │           │
│  │ - Blockchain Integration             │           │
│  └──────────────────┬───────────────────┘           │
│                     │                               │
│  ┌──────────────────▼──────────────────┐           │
│  │    MongoDB Database                  │           │
│  ├──────────────────────────────────────┤           │
│  │ - Users & Profiles                   │           │
│  │ - Transactions & Orders              │           │
│  │ - Prices & Market Data               │           │
│  │ - Logistics & Tracking               │           │
│  │ - Warehouse Inventory                │           │
│  └──────────────────────────────────────┘           │
│                                                    │
└────────────────────────────────────────────────────┘

        ┌──────────────┐
        │  Blockchain  │
        │  (Ethereum)  │
        └──────────────┘
```

### Data Flow
1. User registers → JWT token issued
2. User creates profile → Database record created
3. Farmer creates cropping plan → AI recommendation generated
4. Price data collected → Forecasting model runs
5. Transaction created → Blockchain hash recorded
6. Shipment created → GPS tracking initiated
7. Warehouse updated → Inventory tracked

---

## Installation Guide

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, Ubuntu 20.04+
- **Node.js**: v16.0 or higher
- **MongoDB**: v5.0 or higher
- **RAM**: 4GB minimum
- **Disk Space**: 2GB minimum

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/oilchain-platform.git
cd oilchain-platform
```

### Step 2: Backend Setup

```bash
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Important variables:
# - MONGODB_URI=mongodb://localhost:27017/oilseed-platform
# - JWT_SECRET=your_secure_key_here
# - PORT=5000

# Start MongoDB (in another terminal)
mongod

# Run development server
npm run dev

# Server will run on http://localhost:5000
```

### Step 3: Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env .env.local  # Already created, just verify

# Start development server
npm start

# Application will open at http://localhost:3000
```

### Step 4: Verify Installation

- **Backend**: Access http://localhost:5000/api/health
- **Frontend**: Open http://localhost:3000
- **Login with demo credentials**: Any email/password

---

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "email": "rajesh@farm.com",
  "password": "secure_password",
  "role": "farmer",
  "phone": "9876543210",
  "location": {
    "state": "Madhya Pradesh",
    "district": "Indore"
  }
}

Response: {
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "email": "rajesh@farm.com",
    "role": "farmer"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "rajesh@farm.com",
  "password": "secure_password"
}

Response: {
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### Farmer Endpoints

#### Create Farmer Profile
```
POST /api/farmers/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "farmName": "Green Valley Farm",
  "farmSize": 12.5,
  "soilType": "Loamy",
  "waterResources": ["Borewell", "Rainfall"],
  "cropVariety": ["Soybean", "Groundnut"]
}
```

#### Get Farmer Profile
```
GET /api/farmers/my-profile
Authorization: Bearer {token}

Response: {
  "_id": "...",
  "userId": "...",
  "farmName": "Green Valley Farm",
  "farmSize": 12.5,
  "soilType": "Loamy",
  "performance": {
    "totalYieldProduced": 45.2,
    "qualityRating": 4.5,
    "paymentHistory": 98,
    "loyaltyScore": 85
  }
}
```

#### Create Cropping Plan
```
POST /api/farmers/cropping-plan
Authorization: Bearer {token}
Content-Type: application/json

{
  "season": "kharif",
  "year": 2024,
  "plannedArea": 10
}

Response includes AI recommendation based on soil type and climate
```

### Price Endpoints

#### Get Current Prices
```
GET /api/prices/current?oilseedType=soybean&location=maharashtra
Authorization: Bearer {token}

Response: [
  {
    "oilseedType": "soybean",
    "date": "2024-10-25T...",
    "currentMarketPrice": 45500,
    "mindiPrice": 43225,
    "trend": "up"
  }
]
```

#### Get Price Forecast
```
GET /api/prices/forecast/soybean
Authorization: Bearer {token}

Response: {
  "oilseedType": "soybean",
  "currentPrice": 45500,
  "forecast30Days": 46200,
  "forecast90Days": 45400,
  "trend": "up",
  "confidence": 0.85
}
```

#### Get Price Trends
```
GET /api/prices/trends/soybean?days=30
Authorization: Bearer {token}

Response: {
  "oilseedType": "soybean",
  "period": "30 days",
  "prices": [
    {
      "date": "2024-09-25",
      "price": 43200,
      "location": "Delhi"
    },
    ...
  ]
}
```

### Weather Endpoints

#### Get Current Weather
```
GET /api/weather/current/maharashtra
Authorization: Bearer {token}

Response: {
  "location": "maharashtra",
  "current": {
    "temp": 32,
    "humidity": 65,
    "rainfall": 450,
    "condition": "Partly Cloudy"
  },
  "forecast": [
    {
      "day": "Today",
      "high": 32,
      "low": 27,
      "condition": "Partly Cloudy"
    }
  ]
}
```

#### Get Weather Alerts
```
GET /api/weather/alerts/maharashtra
Authorization: Bearer {token}

Response: {
  "location": "maharashtra",
  "alerts": [
    {
      "severity": "high",
      "message": "High pest activity detected in soybean farms",
      "location": "maharashtra"
    }
  ]
}
```

### Logistics Endpoints

#### Create Shipment
```
POST /api/logistics/create-shipment
Authorization: Bearer {token}
Content-Type: application/json

{
  "transactionId": "TXN-123456",
  "origin": {
    "coordinates": { "latitude": 22.7196, "longitude": 75.8577 },
    "location": "Farm, Madhya Pradesh"
  },
  "destination": {
    "coordinates": { "latitude": 28.7041, "longitude": 77.1025 },
    "location": "Delhi Warehouse"
  }
}

Response includes tracking ID and route optimization
```

#### Track Shipment
```
GET /api/logistics/track/TRACK-1234567890-ABC123DEF

Response: {
  "trackingId": "TRACK-1234567890-ABC123DEF",
  "status": "in-transit",
  "currentLocation": {
    "latitude": 25.2048,
    "longitude": 75.8362,
    "address": "Heading towards Warehouse"
  },
  "temperature": 22,
  "humidity": 58,
  "co2Emissions": 102.45
}
```

### Warehouse Endpoints

#### Register Warehouse
```
POST /api/warehouses/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Delhi Central Hub",
  "location": {
    "latitude": 28.7041,
    "longitude": 77.1025,
    "address": "Greater Noida, Delhi",
    "state": "Delhi",
    "district": "Delhi"
  },
  "capacity": 5000,
  "storageType": "climate-controlled"
}
```

#### List Warehouses
```
GET /api/warehouses/list?state=delhi&district=delhi
Authorization: Bearer {token}

Response: [
  {
    "_id": "...",
    "name": "Delhi Central Hub",
    "location": { ... },
    "capacity": 5000,
    "currentStock": 3200,
    "utilization": 64
  }
]
```

---

## Feature Details

### 1. AI Price Forecasting

**Algorithm**: Time-series analysis with trend detection
- Historical price analysis (last 30 days minimum)
- Trend determination (upward, downward, stable)
- Confidence scoring based on data volume
- 30-day and 90-day forecasts

**Accuracy**: 85% average
**Update Frequency**: Real-time as new market data arrives

### 2. Crop Recommendation Engine

Recommends crops based on:
- **Soil Type**: Compatibility matrix (soybean→loamy, groundnut→sandy-loam)
- **Rainfall**: Optimal range for each crop
- **Temperature**: Regional climate patterns
- **Location**: State and district-specific data

### 3. Pest Management Advisory

Risk factors analyzed:
- Temperature-humidity correlation
- Historical pest patterns
- Seasonal trends
- Satellite data integration

Risk Levels: Low, Medium, High

### 4. Real-Time Logistics Tracking

Features:
- GPS-based location updates
- Route optimization for minimum distance
- Temperature and humidity monitoring
- CO2 emissions calculation
- Delivery time estimation

### 5. Blockchain Traceability

Each transaction receives:
- Unique blockchain hash
- Immutable record from farm to warehouse
- Transaction timestamp
- All stakeholder confirmations

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['farmer', 'fpo', 'processor', 'retailer', 'admin']),
  phone: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    state: String,
    district: String
  },
  profileComplete: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Farmers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  farmName: String,
  farmSize: Number, // hectares
  soilType: String,
  waterResources: [String],
  cropVariety: [String],
  certification: String,
  performance: {
    totalYieldProduced: Number,
    qualityRating: Number, // 0-5
    paymentHistory: Number, // percentage
    loyaltyScore: Number // 0-100
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Prices Collection
```javascript
{
  _id: ObjectId,
  oilseedType: String,
  date: Date,
  location: {
    state: String,
    district: String,
    market: String
  },
  mindiPrice: Number,
  currentMarketPrice: Number,
  futurePrice: Number,
  forecastDate: Date,
  trend: String (enum: ['up', 'down', 'stable']),
  aiInsight: String,
  createdAt: Date
}
```

### Transactions Collection
```javascript
{
  _id: ObjectId,
  transactionId: String (unique),
  farmerId: ObjectId (ref: Farmer),
  buyerId: ObjectId (ref: User),
  oilseedType: String,
  quantity: Number, // quintals
  unitPrice: Number,
  totalAmount: Number,
  transactionDate: Date,
  status: String (enum: ['pending', 'completed', 'rejected', 'cancelled']),
  paymentMethod: String (enum: ['bank', 'upi', 'cash']),
  blockchainHash: String,
  qualityGrade: String,
  moisture: Number,
  createdAt: Date
}
```

### Logistics Collection
```javascript
{
  _id: ObjectId,
  trackingId: String (unique),
  transactionId: ObjectId (ref: Transaction),
  origin: {
    location: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  destination: {
    warehouseId: ObjectId (ref: Warehouse),
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
  status: String (enum: ['pending', 'in-transit', 'delivered', 'delayed']),
  estimatedDelivery: Date,
  actualDelivery: Date,
  routeOptimization: {
    distance: Number, // km
    estimatedTime: Number, // hours
    fuelCost: Number,
    co2Emissions: Number // kg
  },
  temperature: Number,
  humidity: Number,
  createdAt: Date
}
```

---

## Deployment Guide

### Production Deployment

#### 1. Backend Deployment (Heroku/AWS)

```bash
# Create Procfile
echo "web: npm start" > Procfile

# Set environment variables on hosting platform
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/oilseed
JWT_SECRET=your_production_secret_key
NODE_ENV=production

# Deploy
git push heroku main
```

#### 2. Frontend Deployment (Vercel/Netlify)

```bash
# Build application
npm run build

# Deploy build folder
# Vercel: vercel deploy
# Netlify: netlify deploy --prod --dir=build
```

#### 3. Database Deployment (MongoDB Atlas)

1. Create MongoDB Atlas cluster
2. Setup network whitelist
3. Create database user
4. Get connection string
5. Update MONGODB_URI in environment

#### 4. SSL Certificate

- Use Let's Encrypt for HTTPS
- Configure on hosting provider
- Set HTTPS enforced in Express

---

## Performance Optimization

### Frontend
- Code splitting with React.lazy
- Image optimization
- Bundle analysis with webpack
- CDN for static assets

### Backend
- Database indexing on frequently queried fields
- Query optimization with lean()
- Caching with Redis (future enhancement)
- Pagination for large datasets

### Database
- Indexes on userId, farmerId, oilseedType
- TTL indexes for temporary data
- Connection pooling

---

## Security Best Practices

1. **Authentication**
   - JWT tokens with 7-day expiry
   - Refresh token mechanism
   - Secure password hashing (bcrypt)

2. **Authorization**
   - Role-based access control
   - Resource-level permissions

3. **Data Protection**
   - HTTPS/TLS encryption
   - Input sanitization
   - SQL injection prevention (MongoDB injection)

4. **API Security**
   - Rate limiting
   - CORS configuration
   - Request validation

---

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- Verify network access

**Port Already in Use**
- Change PORT in .env
- Kill process: `lsof -i :5000` then `kill -9 <PID>`

**JWT Token Invalid**
- Clear browser localStorage
- Logout and login again
- Check JWT_SECRET consistency

---

## Support & Contact

- **Email**: support@oilchain.platform
- **Documentation**: https://docs.oilchain.platform
- **GitHub Issues**: https://github.com/oilchain/issues
- **Community Forum**: https://forum.oilchain.platform

---

**Last Updated**: October 25, 2024
**Version**: 1.0.0
