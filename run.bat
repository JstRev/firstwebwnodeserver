@echo off
title SkyFlow Microservices Launcher
cd /d "%~dp0"

rem Detect Python interpreter
set "PY_CMD="

python --version >nul 2>&1
if not errorlevel 1 set "PY_CMD=python"

if not defined PY_CMD (
    py --version >nul 2>&1
    if not errorlevel 1 set "PY_CMD=py"
)

if not defined PY_CMD (
    if exist "C:\Program Files\Thonny\python.exe" set PY_CMD="C:\Program Files\Thonny\python.exe"
)

if not defined PY_CMD (
    for /d %%D in ("%LOCALAPPDATA%\Programs\Python\Python*") do (
        if exist "%%~fD\python.exe" set PY_CMD="%%~fD\python.exe"
    )
)

if not defined PY_CMD (
    for /d %%D in ("C:\Program Files\Python*") do (
        if exist "%%~fD\python.exe" set PY_CMD="%%~fD\python.exe"
    )
)

if not defined PY_CMD set "PY_CMD=python"

echo ===================================================
echo LAUNCHING SKYFLOW MICROSERVICES
echo Python Interpreter: %PY_CMD%
echo ===================================================
echo.

rem 1. Launch Wanted Service (Python on port 3002)
start "Wanted Service (FBI)" cmd /k "cd /d ""%~dp0backend\wanted_service"" && %PY_CMD% server.py"

rem 2. Launch Auth Service (Node.js on port 3001)
start "Auth Service" cmd /k "cd /d ""%~dp0backend\auth-service"" && node src\authserver.js"

rem 3. Launch Main Service (Node.js on port 3000)
start "Main Service" cmd /k "cd /d ""%~dp0backend\service"" && node src\server.js"

rem 4. Launch API Gateway (Node.js on port 4000)
start "API Gateway" cmd /k "cd /d ""%~dp0backend\gateway"" && node src\gateway.js"

echo.
echo Microservices active in dedicated windows:
echo   - Wanted Service (FBI):  http://localhost:3002
echo   - Auth Service:          http://localhost:3001
echo   - Main Service:          http://localhost:3000
echo   - Unified API Gateway:   http://localhost:4000/api/v1/
echo.
echo Access the full application through the Gateway:
echo   http://localhost:4000/api/v1/
echo.

pause
