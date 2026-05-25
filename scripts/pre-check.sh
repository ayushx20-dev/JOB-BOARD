#!/bin/bash

echo "🔍 Job Board - Vercel Deployment Pre-Check"
echo "==========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_mark="✅"
cross_mark="❌"
warning_mark="⚠️"

# 1. Check Git status
echo "📦 Checking Git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}${check_mark} Git repository found${NC}"
else
    echo -e "${RED}${cross_mark} Not a git repository${NC}"
    exit 1
fi

# 2. Check Node version
echo ""
echo "🔧 Checking Node version..."
node_version=$(node -v)
echo -e "${GREEN}${check_mark} Node ${node_version}${NC}"

# 3. Check pnpm
echo ""
echo "📦 Checking pnpm..."
if command -v pnpm &> /dev/null; then
    pnpm_version=$(pnpm -v)
    echo -e "${GREEN}${check_mark} pnpm ${pnpm_version}${NC}"
else
    echo -e "${RED}${cross_mark} pnpm not installed${NC}"
    echo "   Install with: npm install -g pnpm@10.9.0"
fi

# 4. Check required files
echo ""
echo "📄 Checking required files..."
files=(
    "package.json"
    "tsconfig.json"
    "vite.config.ts"
    "auth.ts"
    "drizzle.config.ts"
    ".env"
    ".gitignore"
    "vercel.json"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}${check_mark} $file${NC}"
    else
        echo -e "${RED}${cross_mark} $file missing${NC}"
    fi
done

# 5. Check environment variables
echo ""
echo "🔐 Checking environment variables..."
required_vars=("DATABASE_URL" "AUTH_SECRET" "GITHUB_ID" "GITHUB_SECRET")

for var in "${required_vars[@]}"; do
    if [ -z "$(grep "^$var=" .env)" ]; then
        echo -e "${YELLOW}${warning_mark} $var not found in .env${NC}"
    else
        echo -e "${GREEN}${check_mark} $var configured${NC}"
    fi
done

# 6. Check build
echo ""
echo "🏗️  Testing build..."
if pnpm run build > /dev/null 2>&1; then
    echo -e "${GREEN}${check_mark} Build successful${NC}"
else
    echo -e "${RED}${cross_mark} Build failed${NC}"
    echo "   Run: pnpm install && pnpm run build"
fi

# 7. Check TypeScript
echo ""
echo "📋 Checking TypeScript..."
if pnpm tsc --noEmit > /dev/null 2>&1; then
    echo -e "${GREEN}${check_mark} TypeScript check passed${NC}"
else
    echo -e "${YELLOW}${warning_mark} TypeScript errors found (may be OK)${NC}"
fi

echo ""
echo "==========================================="
echo "✨ Pre-deployment check complete!"
echo ""
echo "📝 Next steps:"
echo "1. Commit changes: git add . && git commit -m 'chore: prepare for Vercel deployment'"
echo "2. Push to main: git push origin main"
echo "3. Deploy: vercel --prod"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
