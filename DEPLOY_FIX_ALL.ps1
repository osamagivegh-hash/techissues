# ==============================================================
# COMPLETE DEPLOYMENT FIX SCRIPT
# This script will:
# 1. Build Techiss Blog
# 2. Package files
# 3. Upload to server
# 4. Fix Nginx
# 5. Deploy both projects separately
# ==============================================================

$ErrorActionPreference = "Stop"

# Configuration
$SERVER_IP = "157.175.55.203"
$SSH_KEY = "C:\Users\TestUser\Desktop\aws\charity-key.pem"
$SSH_USER = "ubuntu"
$SSH_HOST = "$SSH_USER@$SERVER_IP"

# Project paths
$TECHISS_PATH = "C:\Users\TestUser\Desktop\myprojects\aws workspace\techissues"
$INMAACHAR_PATH = "C:\Users\TestUser\Desktop\myprojects\propantig\al-khair"

Write-Host "=============================================="
Write-Host "COMPLETE DEPLOYMENT FIX"
Write-Host "=============================================="
Write-Host "Server: $SERVER_IP"
Write-Host "Techiss Path: $TECHISS_PATH"
Write-Host "Inmaachar Path: $INMAACHAR_PATH"
Write-Host ""

# ==============================================================
# STEP 1: Build Techiss Blog
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 1: Building Techiss Blog Frontend"
Write-Host "=============================================="

Set-Location $TECHISS_PATH

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

# Build frontend
Write-Host "Building Next.js frontend..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!"
    exit 1
}

Write-Host "Build successful!"

# ==============================================================
# STEP 2: Package Techiss Files
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 2: Packaging Techiss Blog Files"
Write-Host "=============================================="

# Create packages directory
$PACKAGES_DIR = "$TECHISS_PATH\deploy-packages"
if (Test-Path $PACKAGES_DIR) {
    Remove-Item -Recurse -Force $PACKAGES_DIR
}
New-Item -ItemType Directory -Path $PACKAGES_DIR | Out-Null

# Package frontend (standalone build)
Write-Host "Packaging frontend..."
$STANDALONE_PATH = "$TECHISS_PATH\.next\standalone"
if (Test-Path $STANDALONE_PATH) {
    tar -czf "$PACKAGES_DIR\techiss-frontend.tar.gz" -C $STANDALONE_PATH .
}
else {
    Write-Host "WARNING: Standalone build not found. Packaging .next folder..."
    tar -czf "$PACKAGES_DIR\techiss-frontend.tar.gz" -C "$TECHISS_PATH\.next" .
}

# Package static files
Write-Host "Packaging static files..."
tar -czf "$PACKAGES_DIR\techiss-static.tar.gz" -C "$TECHISS_PATH\.next" static

# Package public folder
Write-Host "Packaging public folder..."
if (Test-Path "$TECHISS_PATH\public") {
    tar -czf "$PACKAGES_DIR\techiss-public.tar.gz" -C "$TECHISS_PATH" public
}

# Package backend
Write-Host "Packaging backend..."
tar -czf "$PACKAGES_DIR\techiss-backend.tar.gz" -C "$TECHISS_PATH\backend" .

Write-Host "Packages created in: $PACKAGES_DIR"

# ==============================================================
# STEP 3: Upload Packages to Server
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 3: Uploading Packages to Server"
Write-Host "=============================================="

Write-Host "Uploading techiss-frontend.tar.gz..."
scp -i $SSH_KEY "$PACKAGES_DIR\techiss-frontend.tar.gz" "${SSH_HOST}:/home/ubuntu/"

Write-Host "Uploading techiss-static.tar.gz..."
scp -i $SSH_KEY "$PACKAGES_DIR\techiss-static.tar.gz" "${SSH_HOST}:/home/ubuntu/"

Write-Host "Uploading techiss-backend.tar.gz..."
scp -i $SSH_KEY "$PACKAGES_DIR\techiss-backend.tar.gz" "${SSH_HOST}:/home/ubuntu/"

if (Test-Path "$PACKAGES_DIR\techiss-public.tar.gz") {
    Write-Host "Uploading techiss-public.tar.gz..."
    scp -i $SSH_KEY "$PACKAGES_DIR\techiss-public.tar.gz" "${SSH_HOST}:/home/ubuntu/"
}

Write-Host "All packages uploaded!"

# ==============================================================
# STEP 4: Execute Server-Side Deployment
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 4: Executing Server-Side Deployment"
Write-Host "=============================================="

$SERVER_SCRIPT = @'
#!/bin/bash
set -e

echo "=============================================="
echo "SERVER-SIDE DEPLOYMENT STARTING"
echo "=============================================="

# Stop all PM2 processes
echo "Stopping all PM2 processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# ==============================================================
# STEP A: Create separate directories
# ==============================================================
echo "Creating separate project directories..."

# Clean and create Techiss directory
rm -rf /home/ubuntu/techiss-app
mkdir -p /home/ubuntu/techiss-app/frontend
mkdir -p /home/ubuntu/techiss-app/backend

# Ensure Inmaachar directory exists
mkdir -p /home/ubuntu/inmaachar-app/frontend
mkdir -p /home/ubuntu/inmaachar-app/backend

# ==============================================================
# STEP B: Deploy Techiss Blog
# ==============================================================
echo "Deploying Techiss Blog..."

# Extract frontend
echo "Extracting Techiss frontend..."
tar -xzf /home/ubuntu/techiss-frontend.tar.gz -C /home/ubuntu/techiss-app/frontend

# Extract static files
if [ -f "/home/ubuntu/techiss-static.tar.gz" ]; then
    echo "Extracting static files..."
    mkdir -p /home/ubuntu/techiss-app/frontend/.next
    tar -xzf /home/ubuntu/techiss-static.tar.gz -C /home/ubuntu/techiss-app/frontend/.next
fi

# Extract public folder
if [ -f "/home/ubuntu/techiss-public.tar.gz" ]; then
    echo "Extracting public folder..."
    tar -xzf /home/ubuntu/techiss-public.tar.gz -C /home/ubuntu/techiss-app/frontend
fi

# Create frontend .env (PORT 3001)
cat > /home/ubuntu/techiss-app/frontend/.env << 'ENVEOF'
MONGODB_URI=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://techiss.store
ENVEOF

# Extract backend
echo "Extracting Techiss backend..."
tar -xzf /home/ubuntu/techiss-backend.tar.gz -C /home/ubuntu/techiss-app/backend

# Install backend dependencies
echo "Installing backend dependencies..."
cd /home/ubuntu/techiss-app/backend
npm install --production

# Create backend env.production (PORT 4001)
cat > /home/ubuntu/techiss-app/backend/env.production << 'ENVEOF'
DATABASE_URL=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
PORT=4001
NODE_ENV=production
ENVEOF

echo "Techiss Blog deployed successfully!"

# ==============================================================
# STEP C: Fix Nginx Configuration
# ==============================================================
echo "Fixing Nginx configuration..."

# Remove default config
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

# Create Inmaachar Nginx config (ports 3000/4000)
sudo tee /etc/nginx/sites-available/inmaachar.conf > /dev/null << 'NGINXEOF'
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
NGINXEOF

# Create Techiss Nginx config (ports 3001/4001)
sudo tee /etc/nginx/sites-available/techiss.conf > /dev/null << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name techiss.store www.techiss.store 157.175.55.203;

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
NGINXEOF

# Enable both sites
sudo ln -sf /etc/nginx/sites-available/inmaachar.conf /etc/nginx/sites-enabled/inmaachar.conf
sudo ln -sf /etc/nginx/sites-available/techiss.conf /etc/nginx/sites-enabled/techiss.conf

# Test and reload nginx
echo "Testing Nginx configuration..."
sudo nginx -t
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "Nginx configured successfully!"

# ==============================================================
# STEP D: Start PM2 Services
# ==============================================================
echo "Starting PM2 services..."

# Start Techiss Frontend (port 3001)
cd /home/ubuntu/techiss-app/frontend
if [ -f "server.js" ]; then
    PORT=3001 pm2 start server.js --name techiss-frontend
else
    PORT=3001 pm2 start npm --name techiss-frontend -- start
fi

# Start Techiss Backend (port 4001)
cd /home/ubuntu/techiss-app/backend
PORT=4001 pm2 start server.js --name techiss-backend

# Save PM2 config
pm2 save

echo "=============================================="
echo "PM2 STATUS"
echo "=============================================="
pm2 list

echo "=============================================="
echo "DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "Techiss Blog:"
echo "  Frontend: http://157.175.55.203 (port 3001)"
echo "  Backend:  http://157.175.55.203/api (port 4001)"
echo ""
echo "NOTE: Inmaachar Charity needs to be deployed separately"
echo "      to /home/ubuntu/inmaachar-app on ports 3000/4000"
echo "=============================================="
'@

# Write script to temp file and execute
$TEMP_SCRIPT = "$env:TEMP\deploy_server.sh"
$SERVER_SCRIPT | Out-File -FilePath $TEMP_SCRIPT -Encoding utf8 -NoNewline

# Convert line endings to Unix format
(Get-Content $TEMP_SCRIPT -Raw) -replace "`r`n", "`n" | Set-Content $TEMP_SCRIPT -NoNewline

# Upload and execute
Write-Host "Uploading deployment script..."
scp -i $SSH_KEY $TEMP_SCRIPT "${SSH_HOST}:/home/ubuntu/deploy_server.sh"

Write-Host "Executing deployment script on server..."
ssh -i $SSH_KEY $SSH_HOST "chmod +x /home/ubuntu/deploy_server.sh && bash /home/ubuntu/deploy_server.sh"

Write-Host ""
Write-Host "=============================================="
Write-Host "DEPLOYMENT COMPLETE!"
Write-Host "=============================================="
Write-Host ""
Write-Host "Techiss Blog is now deployed to:"
Write-Host "  http://157.175.55.203 (or https://techiss.store when DNS is set)"
Write-Host ""
Write-Host "Next steps for Inmaachar Charity:"
Write-Host "  1. Build the charity project"
Write-Host "  2. Deploy to /home/ubuntu/inmaachar-app"
Write-Host "  3. Start PM2 on ports 3000/4000"
Write-Host ""
