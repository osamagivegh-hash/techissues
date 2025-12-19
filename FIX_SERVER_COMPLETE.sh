#!/bin/bash
# ==============================================================
# COMPLETE SERVER FIX SCRIPT
# This script separates Techiss Blog and Inma'achar Charity
# ==============================================================
set -e

echo "=============================================="
echo "🔧 STEP 1: STOP ALL PM2 PROCESSES"
echo "=============================================="
pm2 stop all || true
pm2 delete all || true

echo "=============================================="
echo "🔧 STEP 2: CLEAN UP MIXED DEPLOYMENT"
echo "=============================================="

# Clean Inma'achar directory completely
echo "Cleaning /home/ubuntu/inmaachar-app..."
if [ -d "/home/ubuntu/inmaachar-app" ]; then
    rm -rf /home/ubuntu/inmaachar-app/*
    rm -rf /home/ubuntu/inmaachar-app/.next
    rm -rf /home/ubuntu/inmaachar-app/node_modules
fi

# Create fresh Techiss directory
echo "Creating /home/ubuntu/techiss-app..."
mkdir -p /home/ubuntu/techiss-app/frontend
mkdir -p /home/ubuntu/techiss-app/backend

echo "=============================================="
echo "🔧 STEP 3: FIX NGINX CONFIGURATION"
echo "=============================================="

# Backup old nginx configs
sudo cp /etc/nginx/sites-available/inmaachar.conf /etc/nginx/sites-available/inmaachar.conf.bak 2>/dev/null || true
sudo cp /etc/nginx/sites-available/techiss.conf /etc/nginx/sites-available/techiss.conf.bak 2>/dev/null || true

# Remove any default configs that might conflict
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Create Inma'achar Nginx config (ports 3000/4000)
sudo tee /etc/nginx/sites-available/inmaachar.conf > /dev/null << 'NGINX_INMAACHAR'
# Inma'achar Charity Website
# Domain: inmaachar.com
# Frontend: port 3000
# Backend: port 4000

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
NGINX_INMAACHAR

# Create Techiss Nginx config (ports 3001/4001)
sudo tee /etc/nginx/sites-available/techiss.conf > /dev/null << 'NGINX_TECHISS'
# Techiss Blog Website
# Domain: techiss.store
# Frontend: port 3001
# Backend: port 4001

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
NGINX_TECHISS

# Enable both sites
sudo ln -sf /etc/nginx/sites-available/inmaachar.conf /etc/nginx/sites-enabled/inmaachar.conf
sudo ln -sf /etc/nginx/sites-available/techiss.conf /etc/nginx/sites-enabled/techiss.conf

# Test and reload Nginx
echo "Testing Nginx configuration..."
sudo nginx -t
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "=============================================="
echo "✅ NGINX CONFIGURATION COMPLETE"
echo "=============================================="
echo ""
echo "Now you need to:"
echo "1. Re-deploy Inma'achar Charity to /home/ubuntu/inmaachar-app"
echo "2. Re-deploy Techiss Blog to /home/ubuntu/techiss-app"
echo ""
echo "Run the following PM2 commands after deploying:"
echo ""
echo "# For Inma'achar Charity (ports 3000/4000):"
echo "cd /home/ubuntu/inmaachar-app/frontend && PORT=3000 pm2 start server.js --name inmaachar-frontend"
echo "cd /home/ubuntu/inmaachar-app/backend && PORT=4000 pm2 start server.js --name inmaachar-backend"
echo ""
echo "# For Techiss Blog (ports 3001/4001):"
echo "cd /home/ubuntu/techiss-app/frontend && PORT=3001 pm2 start server.js --name techiss-frontend"
echo "cd /home/ubuntu/techiss-app/backend && PORT=4001 pm2 start server.js --name techiss-backend"
echo ""
echo "Finally run: pm2 save"
echo "=============================================="
