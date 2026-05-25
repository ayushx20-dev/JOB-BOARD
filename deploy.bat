@echo off
REM Heroku Deployment Script for Job Board (Batch/CMD)
REM This script automates the entire deployment process

setlocal enabledelayedexpansion

echo.
echo 🚀 Starting Heroku Deployment...
echo.

REM Check if heroku CLI is installed
heroku --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Heroku CLI not found. Please install it from:
    echo https://devcenter.heroku.com/articles/heroku-cli
    pause
    exit /b 1
)

REM Check if app name is provided
if "%1"=="" (
    echo ❌ Usage: deploy.bat ^<heroku-app-name^>
    echo.
    echo Example:
    echo   deploy.bat my-job-board-app
    echo.
    pause
    exit /b 1
)

set APP_NAME=%1

echo 📱 App Name: %APP_NAME%
echo.

REM Step 1: Create app if it doesn't exist
echo 1️⃣ Creating/Checking Heroku app...
heroku create %APP_NAME% 2>nul
if %errorlevel% equ 0 (
    echo    ✓ App created
) else (
    echo    ✓ App already exists
)
echo.

REM Step 2: Set container stack
echo 2️⃣ Setting container stack...
call heroku stack:set container -a %APP_NAME%
echo    ✓ Stack set to container
echo.

REM Step 3: Configure environment variables
echo 3️⃣ Configuring environment variables...
echo    Please provide the following values:
echo.

set /p DATABASE_URL="    DATABASE_URL: "
set /p AUTH_SECRET="    AUTH_SECRET: "
set /p GITHUB_ID="    GITHUB_ID: "
set /p GITHUB_SECRET="    GITHUB_SECRET: "

echo.
echo    Setting environment variables...

call heroku config:set ^
    DATABASE_URL="%DATABASE_URL%" ^
    AUTH_SECRET="%AUTH_SECRET%" ^
    GITHUB_ID="%GITHUB_ID%" ^
    GITHUB_SECRET="%GITHUB_SECRET%" ^
    NODE_ENV="production" ^
    -a %APP_NAME%

echo    ✓ Environment variables configured
echo.

REM Step 4: Deploy
echo 4️⃣ Deploying to Heroku...
echo    This may take a few minutes...
echo.

call git push heroku main

echo.
echo ✅ Deployment complete!
echo.
echo 🌐 Your app is live at: https://%APP_NAME%.herokuapp.com
echo.
echo Useful commands:
echo   heroku logs --tail -a %APP_NAME%          - View logs
echo   heroku config -a %APP_NAME%               - View config
echo   heroku open -a %APP_NAME%                 - Open app
echo   heroku ps -a %APP_NAME%                   - View dynos
echo.
pause
