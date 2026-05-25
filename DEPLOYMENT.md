# Vercel Deployment Guide for Job Board

## Prerequisites
- Vercel account (https://vercel.com)
- Git repository pushed to GitHub
- Environment variables ready

## Step 1: Prepare Environment Variables

Your project needs these environment variables on Vercel:

```
DATABASE_URL=postgresql://neondb_owner:xxx@xxx.neon.tech/neondb?sslmode=require
AUTH_SECRET=your_random_secret_key_here
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
```

### How to Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

### How to Set Up GitHub OAuth:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `https://yourdomain.com/api/auth/callback/github`
4. Copy Client ID and Client Secret

## Step 2: Deploy to Vercel

### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option B: Via GitHub (Automatic Deployments)

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Select "Other" as framework (since we're using Vite)
5. Click "Deploy"

## Step 3: Configure Environment Variables on Vercel

### Via Dashboard:
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add each variable:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `GITHUB_ID`
   - `GITHUB_SECRET`

### Via CLI:
```bash
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET
```

## Step 4: Deploy Production

```bash
vercel --prod
```

## Step 5: Update GitHub OAuth Redirect URI

After you get your Vercel URL:

1. Go to GitHub OAuth App Settings
2. Update "Authorization callback URL" to: `https://yourdomain.vercel.app/api/auth/callback/github`
3. Save changes

## Verification Checklist

- [ ] Build command works: `pnpm run build`
- [ ] All environment variables are set
- [ ] Database migrations are run (if needed)
- [ ] GitHub OAuth redirect URI is updated
- [ ] Project builds without errors on Vercel
- [ ] API routes work (`/api/auth/*`)
- [ ] Database queries work
- [ ] Authentication flow works

## Troubleshooting

### Build Fails
- Check Node version compatibility (Node 18+ recommended)
- Ensure pnpm is used: `npm install -g pnpm@10.9.0`
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure Neon database allows connections from Vercel IP ranges
- Check if connection pooling is configured properly

### Auth Fails
- Verify AUTH_SECRET is set
- Confirm GitHub OAuth credentials are correct
- Check redirect URI matches exactly (case-sensitive)

### Performance Optimization
- The project uses Vite for fast builds
- TanStack Router provides route-based code splitting
- Tailwind CSS is optimized with purgeable classes

## CI/CD Pipeline

A GitHub Actions workflow (`.github/workflows/vercel.yml`) has been created for:
- Preview deployments on pull requests
- Production deployments on main branch push

Add these secrets to your GitHub repository:
- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - From Vercel dashboard
- `VERCEL_PROJECT_ID` - From Vercel dashboard

## Domain Configuration

1. Go to Vercel project Settings
2. Domains section
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update GitHub OAuth redirect URI accordingly

## Security Best Practices

✅ Never commit `.env` file (already in .gitignore)
✅ Use environment variables for secrets
✅ Keep AUTH_SECRET strong and unique
✅ Regularly rotate GitHub OAuth secrets
✅ Enable Vercel Analytics for monitoring

## Support

- Vercel Docs: https://vercel.com/docs
- TanStack Start: https://tanstack.com/start/latest
- Auth.js: https://authjs.dev
- Drizzle ORM: https://orm.drizzle.team
