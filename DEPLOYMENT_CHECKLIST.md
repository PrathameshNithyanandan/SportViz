# SportViz - Deployment Checklist

Use this checklist when preparing SportViz for production deployment.

## ✅ Pre-Deployment Checklist

### Backend (Spring Boot)

#### 🔧 Configuration
- [ ] Update `application.properties` for production
  - [ ] Change server port if needed
  - [ ] Set production database URL
  - [ ] Configure connection pool
  - [ ] Set appropriate logging levels
  - [ ] Add application name/version

- [ ] Environment Variables
  - [ ] `SPRING_PROFILES_ACTIVE=prod`
  - [ ] Database credentials (never hardcode!)
  - [ ] API keys for sports data services
  - [ ] CORS allowed origins (production URLs)

- [ ] Security
  - [ ] Add Spring Security dependency
  - [ ] Implement authentication (JWT recommended)
  - [ ] Add rate limiting
  - [ ] Enable HTTPS only
  - [ ] Configure security headers
  - [ ] Add input validation
  - [ ] Implement API versioning

#### 📊 Database
- [ ] Set up production database (PostgreSQL/MySQL)
- [ ] Create database schema
- [ ] Add JPA/Hibernate configuration
- [ ] Implement data repositories
- [ ] Set up connection pooling (HikariCP)
- [ ] Configure database migrations (Flyway/Liquibase)
- [ ] Set up database backups
- [ ] Test database connections

#### 🔌 External APIs
- [ ] Get API keys for SportMonks or API-Football
- [ ] Implement API client services
- [ ] Add caching layer (Redis recommended)
- [ ] Set up API rate limit handling
- [ ] Implement error handling for API failures
- [ ] Add retry logic
- [ ] Test with real API data

#### 📦 Build & Package
- [ ] Run `mvn clean package`
- [ ] Test the JAR file locally
- [ ] Verify all dependencies are included
- [ ] Check JAR size (should be ~30-50MB)
- [ ] Test startup time
- [ ] Verify application starts correctly

#### 🧪 Testing
- [ ] Write unit tests for controllers
- [ ] Write integration tests
- [ ] Test all API endpoints
- [ ] Load testing
- [ ] Security testing
- [ ] Test error scenarios

### Frontend (Next.js)

#### 🔧 Configuration
- [ ] Update `.env.production` file
  - [ ] Set production API URL
  - [ ] Add analytics IDs (Google Analytics, etc.)
  - [ ] Set feature flags

- [ ] Performance
  - [ ] Enable Next.js optimization
  - [ ] Configure image optimization
  - [ ] Set up CDN for static assets
  - [ ] Enable compression
  - [ ] Optimize bundle size

- [ ] SEO
  - [ ] Add proper meta tags
  - [ ] Create sitemap.xml
  - [ ] Add robots.txt
  - [ ] Set up Open Graph tags
  - [ ] Add structured data

#### 🎨 Production Build
- [ ] Run `npm run build`
- [ ] Test production build locally (`npm run start`)
- [ ] Check bundle size
- [ ] Verify all pages load correctly
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Check for console errors

#### 🔒 Security
- [ ] Remove console.log statements
- [ ] Add Content Security Policy headers
- [ ] Enable HTTPS
- [ ] Implement rate limiting on API calls
- [ ] Add error boundaries
- [ ] Sanitize user inputs

### Infrastructure

#### ☁️ Hosting
- [ ] Choose hosting platform
  - Backend options: AWS EC2, Heroku, DigitalOcean, Railway
  - Frontend options: Vercel, Netlify, AWS Amplify
  
- [ ] Set up production environment
- [ ] Configure auto-scaling (if needed)
- [ ] Set up load balancer (if needed)
- [ ] Configure health checks

#### 🌐 Domain & DNS
- [ ] Purchase domain name
- [ ] Configure DNS records
  - [ ] A record for backend API (api.sportviz.com)
  - [ ] A record for frontend (www.sportviz.com or sportviz.com)
  - [ ] CNAME for CDN (if used)
- [ ] Set up SSL certificates (Let's Encrypt or cloud provider)

#### 📊 Monitoring & Logging
- [ ] Set up application monitoring
  - Backend: New Relic, Datadog, or Cloud provider monitoring
  - Frontend: Sentry, LogRocket, or similar
- [ ] Configure centralized logging
- [ ] Set up error alerting
- [ ] Create monitoring dashboards
- [ ] Set up uptime monitoring

#### 💾 Database & Cache
- [ ] Set up production database instance
- [ ] Configure automated backups
- [ ] Set up read replicas (if needed)
- [ ] Configure Redis for caching (recommended)
- [ ] Test database failover

#### 🚀 CI/CD
- [ ] Set up Git repository (GitHub, GitLab, Bitbucket)
- [ ] Create CI/CD pipeline
  - [ ] Backend: Build → Test → Deploy
  - [ ] Frontend: Build → Test → Deploy
- [ ] Set up staging environment
- [ ] Configure automated testing
- [ ] Set up deployment rollback mechanism

## 📋 Deployment Steps

### Step 1: Backend Deployment

#### Option A: Cloud Platform (Heroku/Railway)
```bash
# 1. Create app
heroku create sportviz-api

# 2. Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set DATABASE_URL=your_database_url

# 3. Deploy
git push heroku main

# 4. Scale
heroku ps:scale web=2
```

#### Option B: AWS EC2
```bash
# 1. Create EC2 instance
# 2. SSH into instance
ssh -i key.pem ubuntu@your-ec2-ip

# 3. Install Java
sudo apt update
sudo apt install openjdk-17-jdk

# 4. Upload JAR
scp -i key.pem target/sportviz-backend.jar ubuntu@your-ec2-ip:~/

# 5. Run with systemd
sudo nano /etc/systemd/system/sportviz.service
# Add service configuration

sudo systemctl start sportviz
sudo systemctl enable sportviz
```

### Step 2: Frontend Deployment

#### Option A: Vercel (Recommended for Next.js)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
cd frontend
vercel --prod

# 3. Set environment variables in Vercel dashboard
# NEXT_PUBLIC_API_URL=https://api.sportviz.com
```

#### Option B: AWS S3 + CloudFront
```bash
# 1. Build
npm run build

# 2. Deploy to S3
aws s3 sync out/ s3://your-bucket-name

# 3. Configure CloudFront distribution
# 4. Update DNS
```

### Step 3: Database Setup

#### PostgreSQL on AWS RDS
```bash
# 1. Create RDS instance
# 2. Configure security groups
# 3. Get connection string
# 4. Update backend environment variables
```

### Step 4: Configure Domain
```bash
# 1. Point domain to frontend (Vercel/CloudFront)
# 2. Point api subdomain to backend
# 3. Enable SSL (automatic on Vercel/Cloudflare)
```

## 🧪 Post-Deployment Testing

### Backend Tests
- [ ] Test all API endpoints
- [ ] Verify CORS is working
- [ ] Check response times
- [ ] Test error handling
- [ ] Verify database connections
- [ ] Test external API integration
- [ ] Check logs for errors

### Frontend Tests
- [ ] Test all pages load
- [ ] Verify API integration works
- [ ] Test on different devices
- [ ] Check console for errors
- [ ] Test form submissions (if any)
- [ ] Verify analytics tracking
- [ ] Test in different browsers

### Integration Tests
- [ ] End-to-end user flows
- [ ] Cricket data display
- [ ] Football data display
- [ ] Tab switching
- [ ] Sport selector
- [ ] Navigation

### Performance Tests
- [ ] Page load times (<3 seconds)
- [ ] API response times (<500ms)
- [ ] Lighthouse score (>90)
- [ ] Load test with 100 concurrent users

## 🔄 Ongoing Maintenance

### Daily
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Check API rate limits

### Weekly
- [ ] Review performance metrics
- [ ] Check for security updates
- [ ] Review user feedback
- [ ] Database backup verification

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization
- [ ] Cost analysis

## 🆘 Rollback Plan

If something goes wrong:
1. Identify the issue
2. Rollback to previous version:
   ```bash
   # Backend
   git revert HEAD
   git push heroku main
   
   # Frontend (Vercel)
   # Use Vercel dashboard to rollback to previous deployment
   ```
3. Investigate root cause
4. Fix and redeploy

## 📊 Success Metrics

After deployment, monitor:
- [ ] Uptime: >99.9%
- [ ] Average response time: <500ms
- [ ] Error rate: <0.1%
- [ ] User engagement metrics
- [ ] API usage statistics

## 🎯 Production Environment Variables

### Backend (.env or system variables)
```bash
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgresql://user:pass@host:5432/sportviz
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
REDIS_URL=redis://host:6379
SPORTMONKS_API_KEY=your_key
CORS_ALLOWED_ORIGINS=https://sportviz.com,https://www.sportviz.com
JWT_SECRET=your_jwt_secret
```

### Frontend (.env.production)
```bash
NEXT_PUBLIC_API_URL=https://api.sportviz.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENV=production
```

## 📝 Documentation Updates

Before going live:
- [ ] Update README with production URLs
- [ ] Add deployment documentation
- [ ] Create API documentation (Swagger/OpenAPI)
- [ ] Write runbook for operations team
- [ ] Document environment variables
- [ ] Create troubleshooting guide

## 🎉 Go Live!

Final checks before announcing:
- [ ] All tests passing
- [ ] Monitoring in place
- [ ] Backup system working
- [ ] SSL certificates valid
- [ ] Domain resolving correctly
- [ ] Team trained on monitoring/troubleshooting
- [ ] Rollback plan tested

---

**You're ready for production! 🚀**

*Remember: Start with a soft launch, monitor closely, and scale gradually.*
