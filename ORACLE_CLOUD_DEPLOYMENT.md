# Oracle Cloud Free Tier Deployment Guide

This guide will help you deploy SportViz on Oracle Cloud's generous free tier (24GB RAM + 4 CPUs with ARM instances).

## Prerequisites

- Oracle Cloud account (free tier)
- Git installed
- SSH client
- Domain name (optional, for HTTPS)

---

## Part 1: Oracle Cloud Setup

### Step 1: Create Oracle Cloud Account

1. Go to https://www.oracle.com/cloud/free/
2. Click "Start for free"
3. Fill in your details (requires credit card for verification, **NOT charged**)
4. Verify email and complete signup

### Step 2: Create ARM-based Virtual Machine

1. **Login to Oracle Cloud Console**
   - Go to https://cloud.oracle.com/
   - Sign in with your credentials

2. **Create a Compute Instance**
   - Click "Create a VM Instance"
   - **Name**: `sportviz-server`
   - **Placement**: Choose any availability domain

3. **Configure Image and Shape**
   - **Image**: `Ubuntu 22.04` (Canonical)
   - **Shape**: Click "Change Shape"
     - Select `VM.Standard.A1.Flex` (ARM-based)
     - **OCPUs**: 4 (maximum free tier)
     - **Memory (GB)**: 24 (maximum free tier)
     - Click "Select Shape"

4. **Configure Networking**
   - Use default VCN (Virtual Cloud Network)
   - **Assign a public IPv4 address**: ✓ Checked
   - Copy the public IP address (you'll need this later)

5. **Add SSH Keys**
   - **Generate SSH key pair**: ✓ Save both private and public keys
   - Or upload your existing public key

6. **Configure Boot Volume**
   - **Boot volume size (GB)**: 100-200 (free tier allows up to 200GB total)
   - Select "Use in-transit encryption"

7. Click **"Create"** and wait 1-2 minutes for the instance to provision

### Step 3: Configure Security List (Firewall)

1. **Navigate to Security Lists**
   - Click on your instance
   - Under "Primary VNIC" → Click on the subnet
   - Click "Security Lists" → Click on the default security list

2. **Add Ingress Rules** (Allow incoming traffic)
   - Click "Add Ingress Rules"

   **Rule 1: HTTP (Port 80)**
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `80`
   - Description: `HTTP Traffic`

   **Rule 2: HTTPS (Port 443)**
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `443`
   - Description: `HTTPS Traffic`

   **Rule 3: Backend API (Port 8080) - Optional for direct access**
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `8080`
   - Description: `Backend API`

3. Click "Add Ingress Rules"

---

## Part 2: Server Setup

### Step 1: Connect to Your Server

```bash
# Replace YOUR_PRIVATE_KEY.pem with your key file
# Replace YOUR_PUBLIC_IP with your instance IP
chmod 400 YOUR_PRIVATE_KEY.pem
ssh -i YOUR_PRIVATE_KEY.pem ubuntu@YOUR_PUBLIC_IP
```

### Step 2: Update System and Install Dependencies

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y \
    git \
    curl \
    wget \
    htop \
    ufw \
    fail2ban \
    docker.io \
    docker-compose

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Logout and login again for group changes
exit
# SSH back in
ssh -i YOUR_PRIVATE_KEY.pem ubuntu@YOUR_PUBLIC_IP
```

### Step 3: Configure Firewall on VM

```bash
# Configure UFW firewall
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 8080/tcp  # Backend API (optional)

# Enable firewall
sudo ufw --force enable

# Check status
sudo ufw status
```

### Step 4: Configure iptables for Oracle Cloud

Oracle Cloud uses iptables, so we need to open ports there too:

```bash
# Open HTTP
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT

# Open HTTPS
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT

# Open Backend API (optional)
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 8080 -j ACCEPT

# Save rules
sudo mkdir -p /etc/iptables
sudo iptables-save | sudo tee /etc/iptables/rules.v4

# Install package to persist rules
sudo apt install -y iptables-persistent
```

---

## Part 3: Deploy Application

### Step 1: Clone Your Repository

```bash
# Create application directory
mkdir -p ~/apps
cd ~/apps

# Clone your repository (replace with your repo URL)
git clone https://github.com/yourusername/SportViz.git
cd SportViz

# Or upload files manually using SCP:
# From your local machine:
# scp -i YOUR_PRIVATE_KEY.pem -r SportViz ubuntu@YOUR_PUBLIC_IP:~/apps/
```

### Step 2: Configure Environment Variables

```bash
# Copy environment example
cp .env.example .env

# Edit environment variables
nano .env

# Update these values:
# - DB_PASSWORD: Use a strong password
# - REDIS_PASSWORD: Use a strong password
# - ALLOWED_ORIGINS: Add your Vercel frontend URL
```

### Step 3: Build and Start Services

```bash
# Make sure you're in the SportViz directory
cd ~/apps/SportViz

# Build and start all services
docker-compose up -d --build

# Check if all services are running
docker-compose ps

# You should see:
# - postgres (running)
# - redis (running)
# - backend (running)
# - nginx (running)
```

### Step 4: Check Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f nginx

# Press Ctrl+C to exit logs
```

### Step 5: Verify Deployment

```bash
# Test backend API (from inside the server)
curl http://localhost:8080/api/cricket/matches

# Test from outside (replace YOUR_PUBLIC_IP)
curl http://YOUR_PUBLIC_IP/api/cricket/matches

# If you get JSON response with matches, it's working!
```

---

## Part 4: Configure Domain and HTTPS (Optional)

### Step 1: Point Domain to Server

1. Login to your domain registrar (Namecheap, GoDaddy, etc.)
2. Create an **A Record**:
   - Host: `@` or `api`
   - Value: Your Oracle Cloud public IP
   - TTL: 300 (5 minutes)

3. Wait 5-15 minutes for DNS propagation

### Step 2: Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot

# Stop nginx temporarily
docker-compose stop nginx

# Get SSL certificate (replace your-domain.com)
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Certificates will be saved to:
# /etc/letsencrypt/live/your-domain.com/fullchain.pem
# /etc/letsencrypt/live/your-domain.com/privkey.pem

# Copy certificates to project directory
sudo mkdir -p ~/apps/SportViz/ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ~/apps/SportViz/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ~/apps/SportViz/ssl/
sudo chown ubuntu:ubuntu ~/apps/SportViz/ssl/*

# Update nginx.conf to enable HTTPS (uncomment the HTTPS server block)
nano ~/apps/SportViz/nginx.conf

# Restart nginx
docker-compose up -d nginx
```

### Step 3: Auto-renew SSL Certificates

```bash
# Test renewal
sudo certbot renew --dry-run

# Add cron job for auto-renewal
sudo crontab -e

# Add this line (runs twice daily):
0 0,12 * * * certbot renew --quiet && cp /etc/letsencrypt/live/your-domain.com/*.pem ~/apps/SportViz/ssl/ && docker-compose -f ~/apps/SportViz/docker-compose.yml restart nginx
```

---

## Part 5: Frontend Deployment (Vercel)

### Step 1: Push Code to GitHub

```bash
# From your local machine
cd SportViz
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `http://YOUR_PUBLIC_IP` or `https://your-domain.com`

6. Click "Deploy"

### Step 3: Update CORS

```bash
# SSH back to server
ssh -i YOUR_PRIVATE_KEY.pem ubuntu@YOUR_PUBLIC_IP

# Edit environment file
cd ~/apps/SportViz
nano .env

# Update ALLOWED_ORIGINS with your Vercel URL:
ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app

# Restart backend
docker-compose restart backend
```

---

## Part 6: Monitoring and Maintenance

### Useful Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Restart a service
docker-compose restart [service-name]

# Stop all services
docker-compose down

# Start all services
docker-compose up -d

# Update and rebuild
git pull
docker-compose up -d --build

# Check disk space
df -h

# Check memory usage
free -h

# Check Docker resource usage
docker stats

# Backup database
docker exec sportviz-db pg_dump -U sportviz sportviz > backup_$(date +%Y%m%d).sql

# Restore database
docker exec -i sportviz-db psql -U sportviz sportviz < backup.sql
```

### Automatic Backups

```bash
# Create backup script
nano ~/backup-db.sh

# Add this content:
#!/bin/bash
BACKUP_DIR=~/backups
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)
docker exec sportviz-db pg_dump -U sportviz sportviz | gzip > $BACKUP_DIR/sportviz_$DATE.sql.gz
# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

# Make it executable
chmod +x ~/backup-db.sh

# Add to crontab (runs daily at 2 AM)
crontab -e
# Add:
0 2 * * * ~/backup-db.sh
```

---

## Costs

**Monthly Cost: $0** (100% Free Forever)

Oracle Cloud Free Tier includes:
- ✅ 4 ARM CPUs + 24GB RAM
- ✅ 200GB Storage
- ✅ 10TB Bandwidth/month
- ✅ No time limits (forever free)

---

## Performance Expectations

With this setup, you can handle:
- **~50,000 matches** in database
- **1,000+ concurrent users**
- **Millions of API requests/month**
- **Fast response times** (<100ms)

---

## Troubleshooting

### Problem: Can't connect to server
```bash
# Check if instance is running in Oracle Cloud Console
# Check security list rules
# Check iptables: sudo iptables -L -n
# Check UFW: sudo ufw status
```

### Problem: Services not starting
```bash
# Check logs
docker-compose logs

# Check if ports are in use
sudo netstat -tlnp | grep -E '80|443|8080|5432|6379'

# Restart all services
docker-compose restart
```

### Problem: Out of memory
```bash
# Check memory
free -h

# Clear Docker cache
docker system prune -a

# Restart services one by one
docker-compose restart postgres
docker-compose restart redis
docker-compose restart backend
```

### Problem: Database connection failed
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Access database directly
docker exec -it sportviz-db psql -U sportviz

# Test connection from backend
docker exec -it sportviz-backend ping postgres
```

---

## Next Steps

1. Import historical cricket data (see `DATA_IMPORT_GUIDE.md`)
2. Set up monitoring (Uptime Robot, Better Uptime)
3. Configure automated deployments (GitHub Actions)
4. Add error tracking (Sentry)
5. Set up log aggregation (Loki/Grafana)

---

## Support

For issues or questions:
- Oracle Cloud Free Tier: https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm
- Docker: https://docs.docker.com/
- Spring Boot: https://spring.io/guides

**Congratulations! Your SportViz application is now running on Oracle Cloud Free Tier! 🎉**
