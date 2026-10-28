@echo off
title Avvio Microservizi SkyFlow
cd /d "%~dp0"

rem Rilevamento interprete Python disponibile
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

if not defined PY_CMD set "PY_CMD=python"

echo ===================================================
echo AVVIO MICROSERVIZI
echo Interprete Python: %PY_CMD%
echo ===================================================
echo.

rem 1. Avvio Wanted Service (Python su porta 3002)
start "Wanted Service (FBI)" cmd /k "cd /d ""%~dp0backend\wanted_service"" && %PY_CMD% server.py"

rem 2. Avvio Main Service (Node.js su porta 3000)
start "Service (Backend)" cmd /k "cd /d ""%~dp0backend\service"" && node src\server.js"

rem 3. Avvio API Gateway (Node.js su porta 4000)
start "Gateway" cmd /k "cd /d ""%~dp0backend\gateway"" && node src\gateway.js"

echo.
echo Servizi avviati in finestre separate:
echo   - Wanted Service (FBI):  http://localhost:3002
echo   - Main Service:          http://localhost:3000
echo   - API Gateway:           http://localhost:4000/api/v1/
echo.
echo Puoi accedere all'applicazione tramite Gateway su:
echo   http://localhost:4000/api/v1/
echo.

pause
