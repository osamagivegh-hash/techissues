# AWS Deployment Guide - Tech Issues Blog

## 🌐 Live URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://3.239.84.10/ |
| **Backend API** | http://3.239.84.10:4000/ |
| **Admin Panel** | http://3.239.84.10/admin/login |

---

## 🏗️ Infrastructure Overview

### EC2 Instance
- **Instance ID**: `i-0fb28afaf568979cf`
- **Public IP**: `3.239.84.10`
- **Instance Type**: `t3.micro`
- **OS**: Ubuntu 22.04 LTS
- **Region**: `us-east-1`

### S3 Bucket (Reserved for static assets)
- **Bucket Name**: `techissues-frontend-44242414`
- **Region**: `us-east-1`

### Services Running
| Service | Port | Process Manager |
|---------|------|-----------------|
| Next.js Frontend | 3000 | PM2 |
| Node.js Backend API | 4000 | PM2 |
| Nginx Reverse Proxy | 80 | systemd |

---

## 🔑 Connection Details

### SSH Access
```powershell
ssh -i techissues-key-44242414.pem ubuntu@3.239.84.10
```

### Key File Location
- `techissues-key-44242414.pem` (in project root)

---

## 📦 Deployment Scripts

### Deploy Full Stack (Frontend + Backend)
```powershell
.\scripts\deploy-full.ps1
```

### Deploy Backend Only
```powershell
.\scripts\deploy-backend.ps1
```

### Manual Deployment Steps

1. **Build Frontend**
   ```bash
   npm run build
   ```

2. **Package and Upload Frontend**
   ```powershell
   tar -czf frontend.tar.gz -C .next standalone
   scp -i techissues-key-44242414.pem frontend.tar.gz ubuntu@3.239.84.10:/home/ubuntu/
   ```

3. **Deploy on Server**
   ```bash
   # SSH into server
   ssh -i techissues-key-44242414.pem ubuntu@3.239.84.10
   
   # Deploy frontend
   rm -rf /var/www/frontend/standalone
   tar -xzf /home/ubuntu/frontend.tar.gz -C /var/www/frontend
   pm2 restart frontend
   
   # Deploy backend
   rm -rf /var/www/backend/*
   tar -xzf /home/ubuntu/backend.tar.gz -C /var/www/backend
   cd /var/www/backend && npm install --production
   pm2 restart backend
   ```

---

## 🗄️ Database

- **Provider**: MongoDB Atlas
- **Cluster**: `mawaddah.lh79hv8.mongodb.net`
- **Database**: `al-khair`

---

## 🔧 PM2 Commands

```bash
# View all processes
pm2 list

# View logs
pm2 logs frontend
pm2 logs backend

# Restart services
pm2 restart all
pm2 restart frontend
pm2 restart backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

---

## 🔒 Security Groups

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 22 | TCP | 0.0.0.0/0 | SSH |
| 80 | TCP | 0.0.0.0/0 | HTTP |
| 443 | TCP | 0.0.0.0/0 | HTTPS |
| 4000 | TCP | 0.0.0.0/0 | Backend API |

---

## 📝 Environment Variables

### Frontend (.env.production)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://3.239.84.10:4000
```

### Backend (env.production)
```
DATABASE_URL=mongodb+srv://...
JWT_SECRET=...
PORT=4000
NODE_ENV=production
```

---

## 🚀 Next Steps (Optional)

1. **Custom Domain**: Point your domain's A record to `3.239.84.10`
2. **HTTPS**: Run `sudo certbot --nginx -d yourdomain.com`
3. **CloudFront CDN**: For faster global delivery

---

## 📊 Monitoring

```bash
# Check system resources
htop

# Check disk usage
df -h

# Check nginx status
sudo systemctl status nginx

# Check nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
