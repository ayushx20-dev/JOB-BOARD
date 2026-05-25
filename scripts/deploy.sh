#!/bin/bash

# Vercel Deployment Script for Job Board
# This script automates the deployment process

set -e

echo "🚀 Job Board - Vercel Deployment Script"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Pre-flight checks
echo -e "${BLUE}Step 1: Running pre-flight checks...${NC}"
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI installed"
else
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Step 2: Verify local build
echo ""
echo -e "${BLUE}Step 2: Verifying local build...${NC}"
pnpm install
pnpm run build
echo "✅ Build successful"

# Step 3: Check git status
echo ""
echo -e "${BLUE}Step 3: Checking Git status...${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No uncommitted changes"
else
    echo "⚠️  You have uncommitted changes"
    echo "Commit them first or use: git add . && git commit -m 'chore: pre-deployment'"
fi

# Step 4: Deploy to Vercel
echo ""
echo -e "${BLUE}Step 4: Deploying to Vercel...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}✨ Deployment initiated!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - DATABASE_URL"
echo "   - AUTH_SECRET"
echo "   - GITHUB_ID"
echo "   - GITHUB_SECRET"
echo ""
echo "2. Update GitHub OAuth redirect URI:"
echo "   - Get your Vercel URL from the deployment"
echo "   - Update in GitHub OAuth App settings"
echo ""
echo "3. Monitor deployment:"
echo "   - Check Vercel dashboard for build status"
echo "   - Verify all functions deployed successfully"
echo ""
echo "📚 For more details, see DEPLOYMENT.md"
