@echo off
setlocal

cd /d "%~dp0"
set "ROOT=%~dp0.."

start "Auth Service" cmd /k "cd /d ""%ROOT%\backend\auth-service"" && node src\authserver.js"

start "Service" cmd /k "cd /d ""%ROOT%\backend\service"" && node src\server.js"

start "Gateway" cmd /k "cd /d ""%ROOT%\backend\gateway"" && node src\gateway.js"

if exist "%ROOT%\backend\wanted_service\server.py" (
    start "Wanted Service" cmd /k "cd /d ""%ROOT%\backend\wanted_service"" && python server.py"
)

pause
endlocal

