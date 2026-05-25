# 🚀 READY TO DEPLOY - COPY & PASTE COMMANDS

## ⚡ Super Quick Deployment (3 Steps)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel@latest
```

### Step 2: Login & Deploy
```bash
vercel login
vercel --prod
```

### Step 3: Add Environment Variables
In the Vercel dashboard (https://vercel.com/dashboard), add these:
- `DATABASE_URL` - Already in your .env
- `AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `GITHUB_ID` - From GitHub OAuth App
- `GITHUB_SECRET` - From GitHub OAuth App

Then redeploy:
```bash
vercel --prod
```

---

## 📋 Detailed Command Reference

### Pre-Deployment Checks
```bash
# Verify everything locally
pnpm install
pnpm run build

# Check for errors
pnpm tsc --noEmit

# Run pre-check script
bash scripts/pre-check.sh
```

### Deployment
```bash
# Option 1: CLI deployment (fastest)
npm install -g vercel@latest
vercel login
vercel --prod

# Option 2: Environment variables via CLI
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET

# Redeploy with env vars
vercel --prod
```

### Verification
```bash
# View deployment logs
vercel logs --prod

# View live logs
vercel logs --prod --tail

# Check current environment variables
vercel env ls

# View deployment details
vercel inspect --prod
```

### Debugging
```bash
# Check project settings
vercel projects ls

# View deployment history
vercel deployments ls

# Rollback to previous deployment
vercel rollback

# Clear build cache
vercel build --cwd=. --prod --skip-build
```

---

## 🔑 Environment Variables Setup

### Generate AUTH_SECRET
```bash
openssl rand -base64 32
# Copy the output and paste in Vercel dashboard
```

### Get GitHub OAuth Credentials
1. Go to: https://github.com/settings/developers
2. Click "OAuth Apps"
3. Create new OAuth App
4. Set "Authorization callback URL" to (after you get Vercel URL):
   ```
   https://your-domain.vercel.app/api/auth/callback/github
   ```
5. Copy Client ID and Client Secret

### Environment Variables Table

| Variable | Where to Get | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Already in .env | `postgresql://...` |
| `AUTH_SECRET` | Run `openssl rand -base64 32` | `abc123xyz...` |
| `GITHUB_ID` | GitHub OAuth App | `Ov23liUK...` |
| `GITHUB_SECRET` | GitHub OAuth App | `23414c35e2d...` |

---

## ✨ Post-Deployment

### Update GitHub OAuth
```bash
# After deployment, get your Vercel URL and update GitHub OAuth:
# https://github.com/settings/developers
# OAuth Apps → Your App → Edit
# Authorization callback URL: https://your-vercel-url.vercel.app/api/auth/callback/github
```

### Test Deployment
```bash
# Open in browser
open https://your-project.vercel.app

# Or test via curl
curl https://your-project.vercel.app

# Test API endpoint
curl https://your-project.vercel.app/api/auth/signin
```

### Monitor Deployment
```bash
# Realtime logs
vercel logs --prod --follow

# View specific deployment
vercel inspect <deployment-id>

# Check performance
vercel analytics --prod
```

---

## 🎯 Full Deployment Workflow (Copy Entire Section)

```bash
# 1. Install Vercel CLI
npm install -g vercel@latest

# 2. Generate AUTH_SECRET (save the output)
AUTH_SECRET=$(openssl rand -base64 32)
echo "Your AUTH_SECRET: $AUTH_SECRET"

# 3. Verify local build works
pnpm install
pnpm run build

# 4. Commit changes
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin main

# 5. Login to Vercel
vercel login

# 6. Deploy to production
vercel --prod

# Note: You'll be prompted to link to a project.
# Choose "Create and deploy new project" if first time

# 7. Get your deployment URL from the output
# It will look like: https://job-board.vercel.app

# 8. Add environment variables via CLI
vercel env add DATABASE_URL
# Paste your DATABASE_URL from .env

vercel env add AUTH_SECRET
# Paste the AUTH_SECRET you generated

vercel env add GITHUB_ID
# Paste your GitHub OAuth App ID

vercel env add GITHUB_SECRET
# Paste your GitHub OAuth App Secret

# 9. Redeploy with environment variables
vercel --prod

# 10. Check deployment status
vercel logs --prod

# 11. Open your site
open https://your-project.vercel.app
```

---

## 🚨 Common Issues Quick Fixes

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules .next dist
pnpm install
pnpm run build
```

### Environment Variables Not Working
```bash
# Verify they're set
vercel env ls

# Redeploy after changes
vercel --prod
```

### Database Connection Issues
```bash
# Test connection locally
psql $DATABASE_URL

# Check Neon pooler settings
# Your DATABASE_URL should have ?sslmode=require
```

### Auth Redirect Not Working
```bash
# Verify GitHub OAuth callback URL matches exactly:
# https://your-project.vercel.app/api/auth/callback/github

# Then test login at:
# https://your-project.vercel.app/api/auth/signin
```

---

## 📱 Mobile-Friendly Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- GitHub OAuth Settings: https://github.com/settings/developers
- Project Documentation: See STEP_BY_STEP_DEPLOY.md
- Deployment Guide: See DEPLOYMENT.md

---

## 🎉 Success Checklist

After running the commands above, you should see:
- ✅ "Build Completed" in Vercel logs
- ✅ No 404 errors on homepage
- ✅ GitHub login button visible
- ✅ Login redirects to GitHub successfully
- ✅ After login, job list loads
- ✅ Can create new jobs

---

**Ready? Start with:** `npm install -g vercel@latest && vercel login && vercel --prod`
