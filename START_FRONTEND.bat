@echo off
cd /d "c:\Users\LENOVO\Desktop\New folder (10)\oilseed-platform\client"
echo Starting React Frontend...
echo Port: 3000
echo API: http://localhost:5000/api
echo.
echo Waiting for compilation...
set HOST=127.0.0.1
set PORT=3000
set DANGEROUSLY_DISABLE_HOST_CHECK=true
npm start
pause
