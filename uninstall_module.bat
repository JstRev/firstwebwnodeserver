@echo off
title Clean SkyFlow Dependencies and Cache
cd /d "%~dp0"

echo.
echo ===================================================
echo REMOVING GATEWAY DEPENDENCIES
echo ===================================================
if exist "%~dp0backend\gateway\node_modules" (
    rmdir /s /q "%~dp0backend\gateway\node_modules"
    echo Gateway node_modules removed.
) else (
    echo No Gateway node_modules found.
)

echo.
echo ===================================================
echo REMOVING AUTH SERVICE DEPENDENCIES
echo ===================================================
if exist "%~dp0backend\auth-service\node_modules" (
    rmdir /s /q "%~dp0backend\auth-service\node_modules"
    echo Auth Service node_modules removed.
) else (
    echo No Auth Service node_modules found.
)

echo.
echo ===================================================
echo REMOVING MAIN SERVICE DEPENDENCIES
echo ===================================================
if exist "%~dp0backend\service\node_modules" (
    rmdir /s /q "%~dp0backend\service\node_modules"
    echo Main Service node_modules removed.
) else (
    echo No Main Service node_modules found.
)

echo.
echo ===================================================
echo CLEANING WANTED SERVICE (Python Cache)
echo ===================================================
if exist "%~dp0backend\wanted_service\utils\__pycache__" (
    rmdir /s /q "%~dp0backend\wanted_service\utils\__pycache__"
    echo Python utils cache removed.
)
if exist "%~dp0backend\wanted_service\__pycache__" (
    rmdir /s /q "%~dp0backend\wanted_service\__pycache__"
    echo Python cache removed.
)
if exist "%~dp0backend\wanted_service\package-lock.json" (
    del /f /q "%~dp0backend\wanted_service\package-lock.json"
)

echo.
echo ===================================================
echo CLEANUP COMPLETED
echo ===================================================
echo.

pause
