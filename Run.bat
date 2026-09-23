@echo off
title TEATRO Lasalliana Local Server

:: Navigate to the directory where this batch file is located
cd /d "%~dp0"

echo Starting Python Local Server on port 8000...
start "" python -m http.server 8000

:: Wait 2 seconds for the server to spin up properly
timeout /t 2 /nobreak >nul

echo Launching TEATRO Lasalliana Front Page...
start http://localhost:8000/index.html

exit