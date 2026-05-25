# Heroku Deployment Script for Job Board (PowerShell)
# This script automates the entire deployment process

param(
    [Parameter(Mandatory=$true)]
    [string]$AppName
)

Write-Host "🚀 Starting Heroku Deployment..." -ForegroundColor Green
Write-Host ""

# Check if heroku CLI is installed
try {
    heroku --version | Out-Null
} catch {
    Write-Host "❌ Heroku CLI not found. Please install it from: https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Red
    exit 1
}

Write-Host "📱 App Name: $AppName" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create app if it doesn't exist
Write-Host "1️⃣ Creating/Checking Heroku app..." -ForegroundColor Yellow
heroku create $AppName 2>$null
Write-Host "   ✓ App ready" -ForegroundColor Green
Write-Host ""

# Step 2: Set container stack
Write-Host "2️⃣ Setting container stack..." -ForegroundColor Yellow
heroku stack:set container -a $AppName
Write-Host "   ✓ Stack set to container" -ForegroundColor Green
Write-Host ""

# Step 3: Configure environment variables
Write-Host "3️⃣ Configuring environment variables..." -ForegroundColor Yellow
Write-Host "   Please provide the following values:" -ForegroundColor Cyan
Write-Host ""

$DATABASE_URL = Read-Host "   DATABASE_URL"
$AUTH_SECRET = Read-Host "   AUTH_SECRET"
$GITHUB_ID = Read-Host "   GITHUB_ID"
$GITHUB_SECRET = Read-Host "   GITHUB_SECRET"

Write-Host ""
Write-Host "   Setting environment variables..." -ForegroundColor Yellow

heroku config:set `
    DATABASE_URL="$DATABASE_URL" `
    AUTH_SECRET="$AUTH_SECRET" `
    GITHUB_ID="$GITHUB_ID" `
    GITHUB_SECRET="$GITHUB_SECRET" `
    NODE_ENV="production" `
    -a $AppName

Write-Host "   ✓ Environment variables configured" -ForegroundColor Green
Write-Host ""

# Step 4: Deploy
Write-Host "4️⃣ Deploying to Heroku..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Cyan
Write-Host ""

git push heroku main

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your app is live at: https://$AppName.herokuapp.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Magenta
Write-Host "  heroku logs --tail -a $AppName          # View logs"
Write-Host "  heroku config -a $AppName               # View config"
Write-Host "  heroku open -a $AppName                 # Open app"
Write-Host "  heroku ps -a $AppName                   # View dynos"
