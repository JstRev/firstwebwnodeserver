@echo off
setlocal enableextensions enabledelayedexpansion

cd /d "%~dp0"
set "ROOT=%~dp0.."

:: =================================================================
:: PERCORSO DEL BACKUP ESTERNO
:: =================================================================
set "BACKUP_DIR=Z:\INFO\.env_progettonode"

echo 🔄 Sincronizzazione file .env dalle variabili salvate nel backup...
echo.

if not exist "%BACKUP_DIR%" (
    echo [ERRORE] Directory backup non trovata: %BACKUP_DIR%
    echo Assicurati che la cartella esista e contenga i file .env.*
    goto end
)

call :copy_env ".env.auth" "%ROOT%\backend\auth-service\.env"
call :copy_env ".env.gateway" "%ROOT%\backend\gateway\.env"
call :copy_env ".env.weather" "%ROOT%\backend\service\.env"
call :copy_env ".env.frontend" "%ROOT%\frontend\.env"

echo.
echo 🏁 Operazione completata!
exit /b 0

:copy_env
set "SOURCE_FILE=%~1"
set "TARGET_FILE=%~2"
set "TARGET_DIR=%~dp2"

if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%" >nul 2>&1

if exist "%BACKUP_DIR%\%SOURCE_FILE%" (
    copy /Y "%BACKUP_DIR%\%SOURCE_FILE%" "%TARGET_FILE%" >nul
    echo [OK] %SOURCE_FILE% copiato in %TARGET_FILE%
) else (
    echo [INFO] %SOURCE_FILE% non presente nel backup.
)

for %%F in ("%TARGET_DIR%.env*") do (
    if /I not "%%~nxF"=="%~nx2" del /q "%%~fF" >nul 2>&1
)

exit /b 0

:end
endlocal