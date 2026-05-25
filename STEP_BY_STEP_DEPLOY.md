# 🚀 Deploy Job Board to Vercel - Complete Guide

## Prerequisites Checklist
- [ ] GitHub account with repository access
- [ ] Vercel account (free): https://vercel.com/signup
- [ ] GitHub OAuth app created
- [ ] Neon PostgreSQL database running
- [ ] All secrets generated

---

## 📝 Step 1: Prepare Your Secrets

### Generate AUTH_SECRET
Run this in terminal:
```bash
openssl rand -base64 32
```
Copy the output - you'll need it later.

### Get GitHub OAuth Credentials
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: `Job Board`
   - Homepage URL: `https://yourapp.vercel.app` (you can update this later)
   - Authorization callback URL: `https://yourapp.vercel.app/api/auth/callback/github`
4. Copy **Client ID** and **Client Secret**

### Verify Database URL
Your `.env` already has:
```
DATABASE_URL=postgresql://neondb_owner:npg_ANObo1gF7ymn@ep-flat-poetry-ap9e0f4k-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## 🔧 Step 2: Update GitHub OAuth Callback URL (After Deployment)

For now, you can use a temporary callback URL. We'll update it after getting the Vercel URL.

---

## 🌐 Step 3: Deploy to Vercel

### Method A: Using Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel@latest

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

### Method B: Using GitHub (Automatic)

```bash
# 1. Make sure everything is committed
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin main

# 2. Go to https://vercel.com/new
# 3. Select your GitHub repository
# 4. Select "Other" as framework
# 5. Click "Deploy"
```

---

## 🔑 Step 4: Configure Environment Variables

### Via Vercel Dashboard:
1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to Settings → Environment Variables
4. Add these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_ANObo1gF7ymn@...` |
| `AUTH_SECRET` | (The value you generated with openssl) |
| `GITHUB_ID` | (From GitHub OAuth App) |
| `GITHUB_SECRET` | (From GitHub OAuth App) |

5. Redeploy after adding variables:
   ```bash
   vercel --prod
   ```

### Via Vercel CLI:
```bash
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET
```

---

## 🔄 Step 5: Update GitHub OAuth Callback URL

After your first deployment, you'll get a Vercel URL like: `https://job-board.vercel.app`

1. Go to your GitHub OAuth App
2. Update "Authorization callback URL" to:
   ```
   https://your-actual-vercel-url.vercel.app/api/auth/callback/github
   ```
3. Save changes

---

## ✅ Step 6: Test Your Deployment

```bash
# Check your site is live
curl https://your-project.vercel.app

# Test the homepage
open https://your-project.vercel.app

# Test authentication by clicking "Sign in with GitHub"
```

---

## 🎯 Complete Deployment Commands (Copy-Paste)

```bash
# Install and setup
npm install -g vercel@latest
vercel login

# Deploy
vercel --prod

# After getting your URL, run:
vercel env add DATABASE_URL
vercel env add AUTH_SECRET  
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET

# Redeploy with env vars
vercel --prod

# View logs
vercel logs --prod
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Check logs
vercel logs --prod

# Test build locally
pnpm install
pnpm run build

# Check for TypeScript errors
pnpm tsc --noEmit
```

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check if Neon allows connections from Vercel IP ranges
- Test locally: `psql $DATABASE_URL`

### Auth Fails
- Verify GitHub OAuth credentials are correct
- Check callback URL matches exactly (case-sensitive)
- Verify AUTH_SECRET is set

### 404 on Routes
- Check Vercel build logs
- Ensure `dist` directory is built correctly
- Verify `vercel.json` settings

---

## 📊 Vercel Configuration Reference

Your `vercel.json` contains:
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

This tells Vercel to:
1. Install dependencies with `pnpm`
2. Build with `vite build`
3. Serve the `dist` folder

---

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build log shows "✓ Build Completed"
- ✅ You can visit your Vercel URL without 404
- ✅ GitHub login button appears
- ✅ Clicking "Sign in" redirects to GitHub
- ✅ After auth, you're logged in
- ✅ Job list loads from database
- ✅ You can create new jobs

---

## 📚 Next Steps

1. Add custom domain (optional)
   - Go to Vercel project Settings → Domains
   - Follow DNS instructions

2. Enable Analytics (optional)
   - Settings → Analytics
   - Monitor performance metrics

3. Set up GitHub Actions (optional)
   - Already configured in `.github/workflows/vercel.yml`
   - Add GitHub secrets for automatic deployments

4. Optimize performance (optional)
   - Enable Edge Caching
   - Set up ISR (Incremental Static Regeneration)

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **TanStack Start:** https://tanstack.com/start
- **Auth.js:** https://authjs.dev
- **Check logs:** `vercel logs --prod --tail`

---

## 📋 Deployment Checklist

- [ ] GitHub OAuth app created
- [ ] Secrets prepared (AUTH_SECRET, etc.)
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] GitHub OAuth callback URL updated
- [ ] Tested homepage loads
- [ ] Tested GitHub login
- [ ] Tested job creation
- [ ] Custom domain added (optional)

---

**You're all set! 🚀 Your Job Board is ready for production.**
