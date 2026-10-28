@echo off
title Rimozione dipendenze e cache
cd /d "%~dp0"

echo.
echo ===================================================
echo RIMOZIONE GATEWAY (node_modules)
echo ===================================================
if exist "%~dp0backend\gateway\node_modules" (
    rmdir /s /q "%~dp0backend\gateway\node_modules"
    echo node_modules di Gateway rimosso con successo.
) else (
    echo Nessuna cartella node_modules trovata in Gateway.
)

echo.
echo ===================================================
echo RIMOZIONE SERVICE (node_modules)
echo ===================================================
if exist "%~dp0backend\service\node_modules" (
    rmdir /s /q "%~dp0backend\service\node_modules"
    echo node_modules di Service rimosso con successo.
) else (
    echo Nessuna cartella node_modules trovata in Service.
)

echo.
echo ===================================================
echo PULIZIA WANTED SERVICE (Cache Python)
echo ===================================================
if exist "%~dp0backend\wanted_service\utils\__pycache__" (
    rmdir /s /q "%~dp0backend\wanted_service\utils\__pycache__"
    echo Cache utils Python rimossa.
)
if exist "%~dp0backend\wanted_service\__pycache__" (
    rmdir /s /q "%~dp0backend\wanted_service\__pycache__"
    echo Cache Python rimossa.
)
if exist "%~dp0backend\wanted_service\package-lock.json" (
    del /f /q "%~dp0backend\wanted_service\package-lock.json"
)

echo.
echo ===================================================
echo RIMOZIONE COMPLETATA
echo ===================================================
echo.

pause
