# 🚀 Localhost Setup - Complete Guide

## ✅ Current Status

### Backend (Port 5000)
- **Status**: ✅ **RUNNING**
- **Mode**: Demo Mode (No MongoDB needed)
- **URL**: http://localhost:5000
- **Health**: http://localhost:5000/api/health

### Frontend (Port 3000)
- **Status**: 🔄 Starting up...
- **URL**: http://localhost:3000
- **Expected**: Ready in 30-60 seconds

---

## 🛠️ Troubleshooting - Why Localhost Isn't Working

### Issue 1: React App Not Starting
**Solution A**: Clear npm cache and reinstall
```powershell
cd client
npm cache clean --force
rm -r node_modules
rm package-lock.json
npm install
npm start
```

**Solution B**: Kill all Node processes and restart
```powershell
taskkill /IM node.exe /F
# Wait 3 seconds
cd server && node server.js &  # Start backend
cd client && npm start          # Start frontend
```

### Issue 2: Port Already in Use
```powershell
# Check which process is using port 3000
netstat -ano | findstr ":3000"

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Then restart: npm start
```

### Issue 3: MongoDB Connection Error
✅ **Already Fixed!** The app now runs in **Demo Mode** without MongoDB

### Issue 4: Module Not Found Errors
```powershell
# Install missing dependencies
npm install recharts lucide-react react-hot-toast

# Clear cache and rebuild
npm cache clean --force
npm install
npm start
```

---

## 📋 What to Do Now

### Option 1: Wait for React to Start
```
⏳ React takes 30-60 seconds to compile
🔄 Watch the terminal for "webpack compiled successfully"
✅ Then open: http://localhost:3000
```

### Option 2: Try Accessing Now
```
Backend API: http://localhost:5000/api/health
Frontend: http://localhost:3000
```

### Option 3: Restart Everything
```powershell
# In PowerShell Terminal 1 (Backend)
cd c:\Users\LENOVO\Desktop\New folder (10)\oilseed-platform\server
node server.js

# In PowerShell Terminal 2 (Frontend)
cd c:\Users\LENOVO\Desktop\New folder (10)\oilseed-platform\client
npm start
```

---

## 🔍 How to Check If It's Working

### 1. Check Backend
```powershell
# In any PowerShell terminal
curl http://localhost:5000/api/health

# You should see:
# {"status":"OK","timestamp":"2025-10-25T..."}
```

### 2. Check Ports Are Listening
```powershell
netstat -ano | findstr ":3000"  # Frontend
netstat -ano | findstr ":5000"  # Backend
```

### 3. Check Node Processes
```powershell
Get-Process node | Select-Object ProcessName, Id
```

---

## 🎯 Quick Start URLs

Once both are running:

| Feature | URL |
|---------|-----|
| **Login** | http://localhost:3000/login |
| **Register** | http://localhost:3000/register |
| **Dashboard** | http://localhost:3000/dashboard |
| **API Health** | http://localhost:5000/api/health |
| **API Prices** | http://localhost:5000/api/prices/current |

---

## 📝 Demo Credentials (After Registration)

You can login with ANY credentials:
- **Email**: farmer@demo.com  
- **Password**: anything
- **Role**: Select from dropdown

The app will accept any credentials in demo mode!

---

## 🆘 Still Not Working?

### Complete Reset
```powershell
# 1. Kill all Node processes
taskkill /IM node.exe /F

# 2. Clean npm caches
cd client
npm cache clean --force
cd ../server
npm cache clean --force

# 3. Clean node_modules
cd ../client
rm -r node_modules -Force
rm package-lock.json
cd ../server
rm -r node_modules -Force
rm package-lock.json

# 4. Reinstall fresh
cd ../client
npm install
cd ../server
npm install

# 5. Start servers
# Terminal 1:
cd ../server && node server.js

# Terminal 2:
cd ../client && npm start
```

### Check for Errors
```powershell
# Check if ports are in use
netstat -ano | findstr ":3000\|:5000"

# If ports show "LISTENING" - servers are running!
# If no output - something crashed

# Check recent logs
$logs = Get-EventLog -LogName Application -Newest 20 -ErrorAction SilentlyContinue
$logs | Select-Object TimeGenerated, Message
```

---

## 🚀 Once Everything is Running

1. **Open** http://localhost:3000
2. **Click** "Register" or "Login"
3. **Use any email/password** (demo mode accepts all)
4. **Select your role** (Farmer, Processor, etc.)
5. **Explore all features!**

---

## 📊 Testing the Backend API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Prices
```bash
curl http://localhost:5000/api/prices/current
```

### Get Forecasts
```bash
curl http://localhost:5000/api/prices/forecast/Soybean
```

---

## 💡 Pro Tips

1. **Use 2 terminals**: One for backend, one for frontend
2. **Don't close terminals**: Closing stops the servers
3. **Use Ctrl+C** to stop (gracefully)
4. **Wait for "compiled successfully"** before opening browser
5. **Refresh browser** if you see errors
6. **Check console errors** (F12 in browser)

---

## ✅ Success Indicators

### Backend ✅
- See: `Server running on port 5000`
- See: `⚠️  MongoDB connection error - running in demo mode`
- See: `To enable database: Install MongoDB...`

### Frontend ✅
- See: `webpack compiled successfully`
- See: `Compiled successfully`
- Browser opens automatically or visit http://localhost:3000

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| **Start Backend** | `cd server && node server.js` |
| **Start Frontend** | `cd client && npm start` |
| **Kill All Node** | `taskkill /IM node.exe /F` |
| **Check Ports** | `netstat -ano \| findstr ":3000\|:5000"` |
| **Clear NPM Cache** | `npm cache clean --force` |
| **Full Reset** | `npm install` in both folders |

---

## 🎉 Expected Timeline

| Time | Event |
|------|-------|
| 0s | Commands executed |
| 2-3s | Backend starts on port 5000 |
| 5-10s | React starts compiling |
| 30-60s | React compilation completes |
| 60s+ | Visit http://localhost:3000 |

---

*Last Updated: October 25, 2025*  
**Status**: ✅ Backend Running in Demo Mode

