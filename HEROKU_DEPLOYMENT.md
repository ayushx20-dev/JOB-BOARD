# Heroku Deployment Guide

This guide provides step-by-step instructions to deploy the Job Board application to Heroku using Docker.

## Prerequisites

1. **Heroku CLI** - [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. **Docker** - [Install Docker](https://docs.docker.com/get-docker/)
3. **Git** - Already configured
4. **Heroku Account** - Free or paid account

## Deployment Steps

### 1. Login to Heroku

```bash
heroku login
```

This will open a browser window for authentication.

### 2. Create a Heroku App

```bash
heroku create your-app-name
```

Replace `your-app-name` with your desired app name. This command will:
- Create a new Heroku app
- Add a `heroku` remote to your git repository

### 3. Set Stack to Container

```bash
heroku stack:set container -a your-app-name
```

This tells Heroku to use Docker instead of buildpacks.

### 4. Configure Environment Variables

Set all required environment variables on Heroku:

```bash
heroku config:set DATABASE_URL="your_database_url" -a your-app-name
heroku config:set AUTH_SECRET="your_secret" -a your-app-name
heroku config:set GITHUB_ID="your_github_id" -a your-app-name
heroku config:set GITHUB_SECRET="your_github_secret" -a your-app-name
heroku config:set NODE_ENV="production" -a your-app-name
```

**Important**: Get these values from your `.env` file or environment configuration.

To view all configured variables:
```bash
heroku config -a your-app-name
```

### 5. Deploy to Heroku

```bash
git push heroku main
```

This will:
1. Build the Docker image using the Dockerfile
2. Push the image to Heroku's container registry
3. Deploy and start the application
4. Automatically assign a PORT environment variable (Heroku will use this)

### 6. View Logs

Monitor the deployment process and application logs:

```bash
heroku logs --tail -a your-app-name
```

Press `Ctrl+C` to exit the log viewer.

### 7. Open Your App

```bash
heroku open -a your-app-name
```

Or visit: `https://your-app-name.herokuapp.com`

## Troubleshooting

### Build Fails with Node.js Version Error
- ✅ Already fixed: Updated Dockerfile to use Node 20-alpine

### CustomEvent is not defined Error
- ✅ Already fixed: Node 20+ required for Vite 8

### App Crashes with Server Not Starting
- Check logs: `heroku logs --tail -a your-app-name`
- Ensure all environment variables are set correctly
- Verify DATABASE_URL is accessible from Heroku

### Database Connection Issues
- Ensure DATABASE_URL is correct
- For Neon database, whitelist Heroku IPs or enable auto-scaledown
- Test connection locally first

### Port Configuration
- Heroku automatically sets the `PORT` environment variable
- The Dockerfile exposes port 3000, but Heroku may use a different port
- The TanStack Start server should automatically listen on the assigned PORT

## Database Migrations

If you need to run database migrations:

```bash
heroku run "pnpm db:push" -a your-app-name
```

## Rolling Back

To revert to a previous deployment:

```bash
heroku releases -a your-app-name          # List releases
heroku releases:rollback v123 -a your-app-name  # Rollback to specific version
```

## Useful Commands

```bash
# View app info
heroku info -a your-app-name

# Restart app
heroku restart -a your-app-name

# View dyno status
heroku ps -a your-app-name

# Scale dynos
heroku ps:scale web=2 -a your-app-name

# View config variables
heroku config -a your-app-name
```

## Performance Tips

1. **Use Standard-2X Dyno** for better performance
2. **Enable Dyno Metadata** for better monitoring
3. **Use Heroku Postgres** for managed database (if not using Neon)
4. **Enable automatic dyno restarts** for stability

## Security Considerations

1. ✅ Never commit `.env` files
2. ✅ Always use environment variables for secrets
3. ✅ Keep AUTH_SECRET secure and unique
4. ✅ Use HTTPS for all connections
5. ✅ Regularly update dependencies

## Continuous Deployment

To automatically deploy when you push to main:

```bash
heroku pipelines:create job-board
heroku pipelines:add -a your-app-name -s staging
heroku pipelines:add -a your-production-app-name -s production
```

## Additional Resources

- [Heroku Docker Deployment](https://devcenter.heroku.com/articles/container-registry-and-runtime)
- [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql)
- [Heroku Environment Variables](https://devcenter.heroku.com/articles/config-vars)

---

**Last Updated**: May 26, 2026
**Stack**: Node 20, TanStack Start, Vite, Drizzle ORM, PostgreSQL/Neon
