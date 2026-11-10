@echo off
title Installazione dipendenze Node.js

cd /d "%~dp0"
set "ROOT=%~dp0.."

echo.
echo ==============================
echo INSTALLAZIONE GATEWAY
echo ==============================
cd /d "%ROOT%\backend\gateway"
call npm install

echo.
echo ==============================
echo INSTALLAZIONE AUTH-SERVICE
echo ==============================
cd /d "%ROOT%\backend\auth-service"
call npm install

echo.
echo ==============================
echo INSTALLAZIONE SERVICE
echo ==============================
cd /d "%ROOT%\backend\service"
call npm install

echo.
echo ==============================
echo INSTALLAZIONE COMPLETATA
echo ==============================
echo.

pause

