# Quick Start Guide - OilChain Platform

## 🚀 Get Running in 5 Minutes

### Prerequisites Check
- [ ] Node.js v16+ installed (`node --version`)
- [ ] MongoDB running (`mongod` in terminal)
- [ ] Port 5000 and 3000 available

### Terminal 1: Backend Server
```bash
cd oilseed-platform/server
npm install
npm run dev
# Server running at http://localhost:5000
```

### Terminal 2: Frontend Application
```bash
cd oilseed-platform/client
npm install
npm start
# App running at http://localhost:3000
```

### Terminal 3: MongoDB (if not running as service)
```bash
mongod
```

## 🔐 Test Login

1. Open http://localhost:3000 in browser
2. Click "Register" to create account
3. Fill form with any details
4. Login with same credentials

## 📊 Platform Features to Explore

### Dashboard Page
- Real-time metrics
- Market trends visualization
- Platform statistics

### Price Forecasting
- Select different oilseeds (Soybean, Groundnut, Mustard, Sunflower)
- View price trends and forecasts
- See market insights and recommendations

### Weather & Alerts
- View current weather conditions
- 3-day forecast
- Active weather alerts
- Farming recommendations

### Logistics Tracking
- Search tracking ID: `TRACK-1234567890-ABC123DEF`
- View shipment details
- Monitor environmental conditions (temp, humidity)
- See blockchain hash

### Marketplace
- Browse available oilseeds
- View pricing and seller ratings
- Contact sellers directly

### Warehouses
- Check storage facilities
- View capacity and utilization
- Book warehouse space

### Farmer Profile
- View farm details
- Check performance metrics
- Manage cropping plans

## 🎨 UI Highlights

The platform features:
- **Modern Gradient Design**: Purple, pink, and cyan color scheme
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Professional Components**: Cards, charts, forms, buttons
- **Real-time Updates**: Live data and status indicators
- **Smooth Animations**: Transitions and hover effects

## 📡 API Endpoints Quick Reference

```
Authentication:
POST /api/auth/register
POST /api/auth/login

Farmers:
GET /api/farmers/my-profile
POST /api/farmers/cropping-plan
GET /api/farmers/cropping-plans/:farmerId

Prices:
GET /api/prices/current
GET /api/prices/forecast/:oilseedType
GET /api/prices/trends/:oilseedType

Weather:
GET /api/weather/current/:location
GET /api/weather/alerts/:location
GET /api/weather/pest-advisory/:cropType

Logistics:
POST /api/logistics/create-shipment
GET /api/logistics/track/:trackingId

Warehouses:
GET /api/warehouses/list
POST /api/warehouses/register
POST /api/warehouses/:id/add-stock

Dashboard:
GET /api/dashboard/summary
GET /api/dashboard/market-trends
```

## 🔧 Development Tips

### Add New Route
1. Create controller in `server/controllers/`
2. Add route in `server/routes/`
3. Import in `server/server.js`

### Add New Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.js`
3. Link from navigation

### Modify Styling
- Global styles: `client/src/App.css`
- Component styles: Same folder as component
- Use consistent color palette: #667eea, #764ba2, #f093fb

## 📱 Testing Scenarios

### Scenario 1: Farmer Registration & Pricing
1. Register as farmer
2. Create cropping plan
3. Check price forecasts
4. View recommendations

### Scenario 2: Logistics & Tracking
1. Create transaction
2. Track shipment with ID
3. Monitor conditions
4. View blockchain hash

### Scenario 3: Weather & Alerts
1. Select location
2. View weather data
3. Check pest alerts
4. Get farming recommendations

## 🐛 Debugging

### Check Backend Logs
```bash
cd server && npm run dev
# Look for errors in console
```

### Check Frontend Console
- Open Chrome DevTools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for API calls

### MongoDB Connection Issues
```bash
# Test connection
mongo mongodb://localhost:27017/oilseed-platform

# Check collections
show collections
db.users.find().pretty()
```

## 📞 Support Resources

- **Full Documentation**: See `DOCUMENTATION.md`
- **Setup Instructions**: See `SETUP.md`
- **API Details**: See `DOCUMENTATION.md` → API Documentation
- **Database Schema**: See `DOCUMENTATION.md` → Database Schema

## 🎯 Next Steps

1. ✅ Get platform running
2. Explore all features
3. Review code structure
4. Customize branding/colors
5. Integrate real APIs (Weather, Blockchain)
6. Deploy to production
7. Add additional features

## 📊 Sample Data

The platform includes mock data for:
- Market prices and trends
- Weather information
- Logistics tracking
- Warehouse inventory
- Farmer statistics

All can be replaced with real data from APIs.

## 🚨 Important Notes

- Default PORT: 5000 (backend), 3000 (frontend)
- MongoDB: localhost:27017 (default)
- JWT tokens expire in 7 days
- Change JWT_SECRET in production
- Configure CORS for production domains

---

**Happy Exploring! 🌾** 

For detailed information, refer to full documentation files.
