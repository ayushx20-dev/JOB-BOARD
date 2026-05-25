#!/bin/bash

# Heroku Deployment Script for Job Board
# This script automates the entire deployment process

set -e  # Exit on error

echo "🚀 Starting Heroku Deployment..."
echo ""

# Check if heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if app name is provided
if [ -z "$1" ]; then
    echo "❌ Usage: ./deploy.sh <heroku-app-name>"
    echo ""
    echo "Example:"
    echo "  ./deploy.sh my-job-board-app"
    exit 1
fi

APP_NAME=$1

echo "📱 App Name: $APP_NAME"
echo ""

# Step 1: Create app if it doesn't exist
echo "1️⃣ Creating/Checking Heroku app..."
heroku create $APP_NAME 2>/dev/null || echo "   ✓ App already exists"
echo ""

# Step 2: Set container stack
echo "2️⃣ Setting container stack..."
heroku stack:set container -a $APP_NAME
echo "   ✓ Stack set to container"
echo ""

# Step 3: Configure environment variables
echo "3️⃣ Configuring environment variables..."
echo "   Please provide the following values:"
echo ""

read -p "   DATABASE_URL: " DATABASE_URL
read -p "   AUTH_SECRET: " AUTH_SECRET
read -p "   GITHUB_ID: " GITHUB_ID
read -p "   GITHUB_SECRET: " GITHUB_SECRET

heroku config:set \
    DATABASE_URL="$DATABASE_URL" \
    AUTH_SECRET="$AUTH_SECRET" \
    GITHUB_ID="$GITHUB_ID" \
    GITHUB_SECRET="$GITHUB_SECRET" \
    NODE_ENV="production" \
    -a $APP_NAME

echo "   ✓ Environment variables configured"
echo ""

# Step 4: Deploy
echo "4️⃣ Deploying to Heroku..."
echo "   This may take a few minutes..."
git push heroku main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your app is live at: https://$APP_NAME.herokuapp.com"
echo ""
echo "📝 View logs: heroku logs --tail -a $APP_NAME"
echo "🔧 View config: heroku config -a $APP_NAME"
echo "⚡ Open app: heroku open -a $APP_NAME"
