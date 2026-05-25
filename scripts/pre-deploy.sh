#!/bin/bash
# Pre-deployment script for Vercel

echo "🔍 Pre-deployment checks..."

# Check Node version
node_version=$(node -v)
echo "✅ Node version: $node_version"

# Install pnpm if not present
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@10.9.0
fi

echo "✅ Pre-deployment checks complete!"
