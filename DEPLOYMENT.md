# SportViz Deployment Guide

This guide will help you deploy SportViz to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (free tier works fine)
3. Git installed on your computer

## API Keys

The app uses two API keys:
- **Cricket API**: `568f1434-a625-496e-994c-7b7137e18635` (CricAPI)
- **Football API**: `c773e33beb7b424fa8c13cf5dba0a040` (Football-Data.org)

## Deployment Steps

### 1. Initialize Git Repository (if not already done)

```bash
cd SportViz
git init
git add .
git commit -m "Initial commit - SportViz app"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `sportviz`
3. Don't initialize with README (we already have files)
4. Copy the repository URL

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/sportviz.git
git branch -M main
git push -u origin main
```

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Add Environment Variables:
   - `NEXT_PUBLIC_CRICKET_API_KEY` = `568f1434-a625-496e-994c-7b7137e18635`
   - `NEXT_PUBLIC_FOOTBALL_API_KEY` = `c773e33beb7b424fa8c13cf5dba0a040`
6. Click "Deploy"

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? sportviz
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_CRICKET_API_KEY
# Paste: 568f1434-a625-496e-994c-7b7137e18635

vercel env add NEXT_PUBLIC_FOOTBALL_API_KEY
# Paste: c773e33beb7b424fa8c13cf5dba0a040

# Deploy to production
vercel --prod
```

### 5. Your App is Live!

Your app will be available at: `https://sportviz.vercel.app` (or similar)

## Post-Deployment

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Update Deployment

Every time you push to the `main` branch, Vercel will automatically rebuild and deploy:

```bash
git add .
git commit -m "Update message"
git push origin main
```

## Troubleshooting

### Build Errors

If you get build errors:
1. Check that all dependencies are in `package.json`
2. Make sure environment variables are set in Vercel
3. Check build logs in Vercel dashboard

### API Issues

If APIs aren't working:
1. Verify environment variables in Vercel dashboard
2. Check API rate limits (100 calls/day for both APIs)
3. Review browser console for errors

### Performance

- Vercel's free tier includes:
  - 100GB bandwidth
  - Unlimited requests
  - Automatic HTTPS
  - Global CDN

## Features Deployed

✅ Cricket Dashboard
  - Live matches with CricAPI
  - 10 international teams
  - 50+ players
  - Team and player pages

✅ Football Dashboard
  - Live matches with Football-Data.org
  - 20 teams (clubs + national)
  - 80+ players
  - Team and player pages

✅ Smart Caching
  - 5-minute refresh for live data
  - Permanent storage of static data

## Support

For issues, check:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
