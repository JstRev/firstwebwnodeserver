@echo off
title Install SkyFlow Dependencies
cd /d "%~dp0"

echo.
echo ===================================================
echo 1. INSTALLING GATEWAY (Node.js)
echo ===================================================
cd /d "%~dp0backend\gateway"
call npm install

echo.
echo ===================================================
echo 2. INSTALLING AUTH SERVICE (Node.js)
echo ===================================================
cd /d "%~dp0backend\auth-service"
call npm install

echo.
echo ===================================================
echo 3. INSTALLING MAIN SERVICE (Node.js)
echo ===================================================
cd /d "%~dp0backend\service"
call npm install

echo.
echo ===================================================
echo 4. CHECKING WANTED SERVICE (Python)
echo ===================================================
echo The wanted_service is based on Python standard library modules.
echo No pip or external packages are required.

cd /d "%~dp0"

echo.
echo ===================================================
echo INSTALLATION COMPLETE
echo ===================================================
echo.

pause
