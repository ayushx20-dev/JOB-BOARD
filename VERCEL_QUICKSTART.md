# 🚀 QUICK DEPLOYMENT REFERENCE

## One-Click Vercel Deployment

```bash
# 1. Ensure Git is up to date
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin main

# 2. Option A - Deploy via CLI
npm i -g vercel@latest
vercel --prod

# 3. Option B - Deploy via GitHub
# Go to: https://vercel.com/new → Import your GitHub repo
```

## Required Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host/database?sslmode=require
AUTH_SECRET=<generate-with-openssl-rand-base64-32>
GITHUB_ID=<from-github-oauth-app>
GITHUB_SECRET=<from-github-oauth-app>
```

## Vercel Project Settings

```
Framework Preset: Other
Build Command: pnpm run build
Output Directory: dist
Install Command: pnpm install
Development Command: pnpm run dev
Node Version: 18.x or 20.x
```

## Post-Deployment Checklist

- [ ] Build successful on Vercel
- [ ] Environment variables configured
- [ ] GitHub OAuth redirect URI updated
- [ ] Database connection working
- [ ] Authentication flow tested
- [ ] API routes responsive
- [ ] Database migrations applied
- [ ] Analytics/Monitoring enabled

## GitHub OAuth Setup

```
Callback URL: https://yourdomain.vercel.app/api/auth/callback/github
```

## If Build Fails

1. Check build logs in Vercel dashboard
2. Verify Node version compatibility
3. Ensure pnpm version is correct: `pnpm@10.9.0`
4. Run locally: `pnpm install && pnpm run build`
5. Check for TypeScript errors: `pnpm run build`

## Production URL

After deployment:
- Vercel URL: `https://your-project.vercel.app`
- Add custom domain in Vercel Settings

## Database Pooling (Neon)

Neon pooler is already configured in DATABASE_URL - no additional setup needed!

## CI/CD

GitHub Actions workflow is set up for:
- Preview on PR
- Production on main push

Required GitHub secrets:
- `VERCEL_TOKEN` (https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` 
- `VERCEL_PROJECT_ID`

---

**Need help?** Check DEPLOYMENT.md for detailed instructions
