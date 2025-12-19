# 🚨 URGENT FIX GUIDE: Separate Techiss Blog from Inma'achar Charity

## 🔥 The Problem
Two projects were deployed to the same location, causing:
- Mixed frontends and backends
- Overwritten .next folders
- Wrong styling
- Routing conflicts

## ✅ Target Architecture

| Project | Domain | Frontend Port | Backend Port | Deploy Path |
|---------|--------|---------------|--------------|-------------|
| Inma'achar Charity | inmaachar.com | 3000 | 4000 | /home/ubuntu/inmaachar-app |
| Techiss Blog | techiss.store | 3001 | 4001 | /home/ubuntu/techiss-app |

---

## 📋 Step-by-Step Fix Instructions

### Prerequisites
You need SSH access to your server. From your local Windows machine:

```powershell
ssh -i techissues-key-44242414.pem ubuntu@YOUR_SERVER_IP
```

---

### STEP 1: Stop All Running Services

```bash
pm2 stop all
pm2 delete all
```

---

### STEP 2: Clean Up the Mixed Deployment

```bash
# Clean Inma'achar directory completely
sudo rm -rf /home/ubuntu/inmaachar-app/*
sudo rm -rf /home/ubuntu/inmaachar-app/.next
sudo rm -rf /home/ubuntu/inmaachar-app/node_modules

# Create fresh Techiss directory structure
mkdir -p /home/ubuntu/techiss-app/frontend
mkdir -p /home/ubuntu/techiss-app/backend
```

---

### STEP 3: Fix Nginx Configuration

#### Remove any conflicting configs:
```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

#### Create Inma'achar config (inmaachar.conf):
```bash
sudo nano /etc/nginx/sites-available/inmaachar.conf
```

Paste this content:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name inmaachar.com www.inmaachar.com;

    proxy_read_timeout 300;
    proxy_connect_timeout 300;
    proxy_send_timeout 300;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}
```

#### Create Techiss config (techiss.conf):
```bash
sudo nano /etc/nginx/sites-available/techiss.conf
```

Paste this content:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name techiss.store www.techiss.store;

    proxy_read_timeout 300;
    proxy_connect_timeout 300;
    proxy_send_timeout 300;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3001;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}
```

#### Enable both sites:
```bash
sudo ln -sf /etc/nginx/sites-available/inmaachar.conf /etc/nginx/sites-enabled/inmaachar.conf
sudo ln -sf /etc/nginx/sites-available/techiss.conf /etc/nginx/sites-enabled/techiss.conf
```

#### Test and reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### STEP 4: Re-deploy Inma'achar Charity

Upload your Inma'achar charity files to `/home/ubuntu/inmaachar-app`:

```bash
# On server - create directory structure
mkdir -p /home/ubuntu/inmaachar-app/frontend
mkdir -p /home/ubuntu/inmaachar-app/backend

# From your local machine - upload files
scp -i your-key.pem inmaachar-frontend.tar.gz ubuntu@YOUR_IP:/home/ubuntu/
scp -i your-key.pem inmaachar-backend.tar.gz ubuntu@YOUR_IP:/home/ubuntu/

# On server - extract
tar -xzf /home/ubuntu/inmaachar-frontend.tar.gz -C /home/ubuntu/inmaachar-app/frontend
tar -xzf /home/ubuntu/inmaachar-backend.tar.gz -C /home/ubuntu/inmaachar-app/backend

# Install backend dependencies
cd /home/ubuntu/inmaachar-app/backend
npm install --production

# Create .env files with PORT 3000/4000
```

---

### STEP 5: Re-deploy Techiss Blog

Upload your Techiss blog files to `/home/ubuntu/techiss-app`:

```bash
# From your local machine - upload files
scp -i techissues-key-44242414.pem techiss-frontend.tar.gz ubuntu@YOUR_IP:/home/ubuntu/
scp -i techissues-key-44242414.pem techiss-backend.tar.gz ubuntu@YOUR_IP:/home/ubuntu/

# On server - extract
tar -xzf /home/ubuntu/techiss-frontend.tar.gz -C /home/ubuntu/techiss-app/frontend
tar -xzf /home/ubuntu/techiss-backend.tar.gz -C /home/ubuntu/techiss-app/backend

# Install backend dependencies
cd /home/ubuntu/techiss-app/backend
npm install --production
```

Create frontend .env (PORT 3001):
```bash
cat > /home/ubuntu/techiss-app/frontend/.env << 'EOF'
MONGODB_URI=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://techiss.store/api
EOF
```

Create backend env.production (PORT 4001):
```bash
cat > /home/ubuntu/techiss-app/backend/env.production << 'EOF'
DATABASE_URL=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
PORT=4001
NODE_ENV=production
EOF
```

---

### STEP 6: Start PM2 Services

```bash
# Start Inma'achar Charity (ports 3000/4000)
cd /home/ubuntu/inmaachar-app/frontend
PORT=3000 pm2 start server.js --name inmaachar-frontend

cd /home/ubuntu/inmaachar-app/backend
PORT=4000 pm2 start server.js --name inmaachar-backend

# Start Techiss Blog (ports 3001/4001)
cd /home/ubuntu/techiss-app/frontend
PORT=3001 pm2 start server.js --name techiss-frontend

cd /home/ubuntu/techiss-app/backend
PORT=4001 pm2 start server.js --name techiss-backend

# Save PM2 configuration
pm2 save
```

---

### STEP 7: Verify Everything

```bash
# Check PM2 status
pm2 list

# Expected output:
# ┌─────────────────────────┬────┬──────┬──────┐
# │ Name                    │ id │ mode │ port │
# ├─────────────────────────┼────┼──────┼──────┤
# │ inmaachar-frontend      │ 0  │ fork │ 3000 │
# │ inmaachar-backend       │ 1  │ fork │ 4000 │
# │ techiss-frontend        │ 2  │ fork │ 3001 │
# │ techiss-backend         │ 3  │ fork │ 4001 │
# └─────────────────────────┴────┴──────┴──────┘

# Test local endpoints
curl http://localhost:3000  # Should show Inma'achar
curl http://localhost:3001  # Should show Techiss
curl http://localhost:4000/api/health  # Inma'achar API
curl http://localhost:4001/api/health  # Techiss API

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
```

---

## ✅ Success Checklist

- [ ] inmaachar.com → Shows Inma'achar Charity website only
- [ ] techiss.store → Shows Techiss Blog website only
- [ ] PM2 shows 4 separate processes
- [ ] No shared .next folders
- [ ] No shared node_modules
- [ ] No shared public folders
- [ ] Correct styling on each site
- [ ] Admin panels work on both sites

---

## 🆘 Troubleshooting

### If a site shows wrong content:
```bash
# Check which PM2 process is running
pm2 logs techiss-frontend --lines 50

# Verify port binding
sudo lsof -i :3001
```

### If Nginx returns 502:
```bash
# Check if PM2 processes are running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### To completely restart:
```bash
pm2 kill
sudo systemctl restart nginx
# Then re-run the PM2 start commands
```
