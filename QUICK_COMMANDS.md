# 🚀 Quick Command Reference

Quick copy-paste commands for common tasks.

---

## 🏗️ Oracle Cloud Initial Setup

```bash
# Connect to server
ssh -i YOUR_KEY.pem ubuntu@YOUR_PUBLIC_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Configure firewall
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw --force enable

# Configure iptables
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo apt install -y iptables-persistent
```

---

## 📦 Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/SportViz.git
cd SportViz

# Configure environment
cp .env.example .env
nano .env

# Build and start
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🔄 Update Application

```bash
# Pull latest code
cd ~/SportViz
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or restart specific service
docker-compose restart backend
```

---

## 🗄️ Database Commands

```bash
# Access PostgreSQL
docker exec -it sportviz-db psql -U sportviz

# Backup database
docker exec sportviz-db pg_dump -U sportviz sportviz > backup_$(date +%Y%m%d).sql

# Restore database
docker exec -i sportviz-db psql -U sportviz sportviz < backup.sql

# Check database size
docker exec -it sportviz-db psql -U sportviz -c "SELECT pg_size_pretty(pg_database_size('sportviz'));"

# Count matches
docker exec -it sportviz-db psql -U sportviz -c "SELECT COUNT(*) FROM matches;"
```

---

## 📊 Monitoring Commands

```bash
# Check all containers
docker-compose ps

# View resource usage
docker stats

# Check disk space
df -h

# Check memory
free -h

# View logs (all services)
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f nginx
docker-compose logs -f redis

# Last 100 lines
docker-compose logs --tail=100 backend
```

---

## 🔧 Maintenance Commands

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Stop all services
docker-compose down

# Start all services
docker-compose up -d

# Rebuild specific service
docker-compose up -d --build backend

# Remove all containers and volumes (DESTRUCTIVE!)
docker-compose down -v

# Clean up Docker
docker system prune -a
```

---

## 🔒 SSL Certificate (Let's Encrypt)

```bash
# Install certbot
sudo apt install -y certbot

# Stop nginx temporarily
docker-compose stop nginx

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates
sudo mkdir -p ~/SportViz/ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ~/SportViz/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ~/SportViz/ssl/
sudo chown ubuntu:ubuntu ~/SportViz/ssl/*

# Restart nginx
docker-compose up -d nginx

# Auto-renew (add to crontab)
sudo crontab -e
# Add: 0 0 * * * certbot renew --quiet && cp /etc/letsencrypt/live/your-domain.com/*.pem ~/SportViz/ssl/ && docker-compose -f ~/SportViz/docker-compose.yml restart nginx
```

---

## 📥 Data Import Commands

```bash
# Install Python dependencies
pip3 install psycopg2-binary pandas requests

# Download cricket data
mkdir -p ~/cricket-data && cd ~/cricket-data
wget https://cricsheet.org/downloads/odis_json.zip
wget https://cricsheet.org/downloads/t20s_json.zip
wget https://cricsheet.org/downloads/tests_json.zip

# Unzip
unzip odis_json.zip -d odis/
unzip t20s_json.zip -d t20s/
unzip tests_json.zip -d tests/

# Run import script (create this first - see DATA_IMPORT_GUIDE.md)
python3 import_cricket_data.py
```

---

## 🧪 Testing Commands

```bash
# Test backend health
curl http://localhost:8080/actuator/health

# Test API endpoint
curl http://localhost:8080/api/cricket/matches

# Test from outside server
curl http://YOUR_PUBLIC_IP/api/cricket/matches

# Test database connection
docker exec -it sportviz-db psql -U sportviz -c "SELECT 1;"

# Test Redis connection
docker exec -it sportviz-redis redis-cli ping
```

---

## 🚨 Troubleshooting Commands

```bash
# Check if ports are in use
sudo netstat -tlnp | grep -E '80|443|8080|5432|6379'

# Check firewall status
sudo ufw status
sudo iptables -L -n

# Check service health
docker-compose ps
docker inspect sportviz-backend | grep Health

# Restart unhealthy services
docker-compose restart backend

# View recent errors
docker-compose logs --tail=50 backend | grep ERROR

# Check disk usage by containers
docker system df

# Check Java process
docker exec -it sportviz-backend ps aux | grep java
```

---

## 📊 Database Queries (Quick Analysis)

```bash
# Run SQL query directly
docker exec -it sportviz-db psql -U sportviz -c "YOUR_SQL_HERE"

# Count matches by status
docker exec -it sportviz-db psql -U sportviz -c "SELECT status, COUNT(*) FROM matches GROUP BY status;"

# Count matches by team
docker exec -it sportviz-db psql -U sportviz -c "SELECT team_a_name, COUNT(*) FROM matches GROUP BY team_a_name ORDER BY COUNT(*) DESC LIMIT 10;"

# Get recent matches
docker exec -it sportviz-db psql -U sportviz -c "SELECT team_a_name, team_b_name, start_time, status FROM matches ORDER BY start_time DESC LIMIT 10;"

# Check database size
docker exec -it sportviz-db psql -U sportviz -c "SELECT pg_size_pretty(pg_total_relation_size('matches'));"
```

---

## 🔄 Automated Backups

```bash
# Create backup script
cat > ~/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR=~/backups
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)
docker exec sportviz-db pg_dump -U sportviz sportviz | gzip > $BACKUP_DIR/sportviz_$DATE.sql.gz
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
echo "Backup completed: $DATE"
EOF

# Make executable
chmod +x ~/backup-db.sh

# Test backup
~/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * ~/backup-db.sh >> ~/backup.log 2>&1
```

---

## 🌐 Frontend (Vercel) Commands

```bash
# From local machine

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
# Enter value: http://YOUR_ORACLE_IP or https://your-domain.com

# Pull environment variables
vercel env pull
```

---

## 📱 Mobile Testing

```bash
# Test API from your phone (same network)
# Use your local network IP
curl http://192.168.x.x:8080/api/cricket/matches

# Or use Oracle Cloud public IP
curl http://YOUR_PUBLIC_IP/api/cricket/matches
```

---

## 🎯 Performance Optimization

```bash
# Check backend JVM memory
docker stats sportviz-backend

# Optimize PostgreSQL
docker exec -it sportviz-db psql -U sportviz -c "VACUUM ANALYZE;"

# Clear Redis cache
docker exec -it sportviz-redis redis-cli FLUSHALL

# Restart with fresh state
docker-compose down && docker-compose up -d
```

---

## 📋 System Information

```bash
# Check Ubuntu version
lsb_release -a

# Check Docker version
docker --version
docker-compose --version

# Check Java version (in container)
docker exec -it sportviz-backend java -version

# Check available disk space
df -h

# Check memory usage
free -h

# Check CPU info
lscpu

# Check network stats
ifconfig
```

---

## 🚀 Quick Restart Everything

```bash
# Full restart (fixes most issues)
cd ~/SportViz
docker-compose down
docker system prune -f
docker-compose up -d --build
docker-compose logs -f
```

---

## 📞 Emergency Recovery

```bash
# If everything is broken, start fresh

# 1. Backup database first!
docker exec sportviz-db pg_dump -U sportviz sportviz > emergency_backup.sql

# 2. Stop and remove everything
docker-compose down -v

# 3. Clean Docker
docker system prune -a -f

# 4. Restart from scratch
docker-compose up -d --build

# 5. Restore database if needed
docker exec -i sportviz-db psql -U sportviz sportviz < emergency_backup.sql
```

---

## 🎓 One-Line Installers

```bash
# Complete setup (run on fresh Ubuntu server)
sudo apt update && sudo apt install -y docker.io docker-compose git && sudo systemctl start docker && sudo usermod -aG docker ubuntu && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw --force enable

# Deploy app (after setup)
git clone YOUR_REPO && cd SportViz && cp .env.example .env && docker-compose up -d --build
```

---

**💡 Tip**: Bookmark this file for quick access during deployment and maintenance!
