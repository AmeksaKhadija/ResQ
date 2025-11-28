@echo off
echo ========================================
echo    RESQ - DEMARRAGE RAPIDE
echo ========================================
echo.
echo Demarrage du serveur JSON...
start cmd /k "cd /d "%~dp0" && npm run server"
timeout /t 3 /nobreak >nul
echo.
echo Demarrage de l'application React...
npm run dev
