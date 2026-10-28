@echo off
title Installazione dipendenze progetto
cd /d "%~dp0"

echo.
echo ===================================================
echo INSTALLAZIONE GATEWAY (Node.js)
echo ===================================================
cd /d "%~dp0backend\gateway"
call npm install

echo.
echo ===================================================
echo INSTALLAZIONE SERVICE (Node.js)
echo ===================================================
cd /d "%~dp0backend\service"
call npm install

echo.
echo ===================================================
echo VERIFICA WANTED SERVICE (Python)
echo ===================================================
echo Il servizio wanted_service e basato su Python e utilizza librerie standard.
echo Non richiede pacchetti npm o dipendenze esterne pip.

cd /d "%~dp0"

echo.
echo ===================================================
echo INSTALLAZIONE COMPLETATA
echo ===================================================
echo.

pause
