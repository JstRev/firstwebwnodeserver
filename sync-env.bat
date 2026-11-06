@echo off
setlocal enableextensions enabledelayedexpansion

:: =================================================================
:: PERCORSO DEL BACKUP ESTERNO
:: =================================================================
set "BACKUP_DIR=Z:\INFO\.env_progettonode"

echo 🔄 Sincronizzazione file .env nelle rispettive cartelle del progetto...
echo.

:: 1) Auth service
if exist "%BACKUP_DIR%\.env.auth" (
    copy /Y "%BACKUP_DIR%\.env.auth" ".\backend\auth-service\.env.auth" > nul
    echo [OK] .env.auth copiato in backend\auth-service
) else (
    echo [ERRORE] File non trovato: %BACKUP_DIR%\.env.auth
)

:: 2) Gateway
if exist "%BACKUP_DIR%\.env.gateway" (
    copy /Y "%BACKUP_DIR%\.env.gateway" ".\backend\gateway\.env.gateway" > nul
    echo [OK] .env.gateway copiato in backend\gateway
) else (
    echo [ERRORE] File non trovato: %BACKUP_DIR%\.env.gateway
)

:: 3) Backend service
if exist "%BACKUP_DIR%\.env.weather" (
    copy /Y "%BACKUP_DIR%\.env.weather" ".\backend\service\.env.weather" > nul
    echo [OK] .env.weather copiato in backend\service
) else (
    echo [ERRORE] File non trovato: %BACKUP_DIR%\.env.weather
)

:: 4) Frontend (opzionale, solo se lo usi davvero)
if exist "%BACKUP_DIR%\.env.frontend" (
    copy /Y "%BACKUP_DIR%\.env.frontend" ".\frontend\.env.frontend" > nul
    echo [OK] .env.frontend copiato in frontend
) else (
    echo [INFO] Nessun .env.frontend presente nel backup.
)

echo.
echo 🏁 Operazione completata!
endlocal