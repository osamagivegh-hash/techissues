# ====================================================================
# INMA'ACHAR CHARITY DEPLOYMENT SCRIPT
# Run this script in PowerShell from the al-khair project folder
# Path: C:\Users\TestUser\Desktop\myprojects\propantig\al-khair
# ====================================================================

$ErrorActionPreference = "Stop"

# Configuration
$SERVER_IP = "157.175.55.203"
$SSH_KEY = "C:\Users\TestUser\Desktop\aws\charity-key.pem"
$SSH_USER = "ubuntu"
$SSH_HOST = "$SSH_USER@$SERVER_IP"
$PROJECT_PATH = "C:\Users\TestUser\Desktop\myprojects\propantig\al-khair"

Write-Host "=============================================="
Write-Host "INMA'ACHAR CHARITY DEPLOYMENT"
Write-Host "=============================================="
Write-Host "Server: $SERVER_IP"
Write-Host "Project Path: $PROJECT_PATH"
Write-Host ""

# ==============================================================
# STEP 1: Build the Frontend
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 1: Building Frontend"
Write-Host "=============================================="

Set-Location $PROJECT_PATH

# Check if there's a frontend folder
if (Test-Path "$PROJECT_PATH\frontend") {
    Set-Location "$PROJECT_PATH\frontend"
    Write-Host "Building Next.js frontend..."
    npm install
    npm run build
    
    # Package frontend
    Write-Host "Packaging frontend..."
    $STANDALONE_PATH = "$PROJECT_PATH\frontend\.next\standalone"
    if (Test-Path $STANDALONE_PATH) {
        tar -czf "$PROJECT_PATH\inmaachar-frontend.tar.gz" -C $STANDALONE_PATH .
    }
    else {
        tar -czf "$PROJECT_PATH\inmaachar-frontend.tar.gz" -C "$PROJECT_PATH\frontend\.next" .
    }
    
    # Package static files
    tar -czf "$PROJECT_PATH\inmaachar-static.tar.gz" -C "$PROJECT_PATH\frontend\.next" static
    
    # Package public folder
    if (Test-Path "$PROJECT_PATH\frontend\public") {
        tar -czf "$PROJECT_PATH\inmaachar-public.tar.gz" -C "$PROJECT_PATH\frontend" public
    }
}
elseif (Test-Path "$PROJECT_PATH\.next") {
    # If it's a single Next.js project (no separate frontend folder)
    Write-Host "Building Next.js project..."
    npm install
    npm run build
    
    # Package
    $STANDALONE_PATH = "$PROJECT_PATH\.next\standalone"
    if (Test-Path $STANDALONE_PATH) {
        tar -czf "$PROJECT_PATH\inmaachar-frontend.tar.gz" -C $STANDALONE_PATH .
    }
    else {
        tar -czf "$PROJECT_PATH\inmaachar-frontend.tar.gz" -C "$PROJECT_PATH\.next" .
    }
    tar -czf "$PROJECT_PATH\inmaachar-static.tar.gz" -C "$PROJECT_PATH\.next" static
    if (Test-Path "$PROJECT_PATH\public") {
        tar -czf "$PROJECT_PATH\inmaachar-public.tar.gz" -C "$PROJECT_PATH" public
    }
}
else {
    Write-Host "ERROR: Cannot find frontend structure. Please check project structure."
    exit 1
}

# ==============================================================
# STEP 2: Package Backend (if exists)
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 2: Packaging Backend"
Write-Host "=============================================="

Set-Location $PROJECT_PATH

if (Test-Path "$PROJECT_PATH\backend") {
    Write-Host "Packaging backend..."
    tar -czf "$PROJECT_PATH\inmaachar-backend.tar.gz" -C "$PROJECT_PATH\backend" .
}
elseif (Test-Path "$PROJECT_PATH\server.js") {
    # Single server file
    Write-Host "Packaging backend server files..."
    tar -czf "$PROJECT_PATH\inmaachar-backend.tar.gz" -C "$PROJECT_PATH" server.js package.json
}
else {
    Write-Host "No separate backend found - may be part of Next.js API routes"
}

Write-Host "Packages created!"

# ==============================================================
# STEP 3: Upload to Server
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 3: Uploading to Server"
Write-Host "=============================================="

Set-Location $PROJECT_PATH

Write-Host "Uploading inmaachar-frontend.tar.gz..."
scp -i $SSH_KEY "$PROJECT_PATH\inmaachar-frontend.tar.gz" "${SSH_HOST}:/home/ubuntu/"

if (Test-Path "$PROJECT_PATH\inmaachar-static.tar.gz") {
    Write-Host "Uploading inmaachar-static.tar.gz..."
    scp -i $SSH_KEY "$PROJECT_PATH\inmaachar-static.tar.gz" "${SSH_HOST}:/home/ubuntu/"
}

if (Test-Path "$PROJECT_PATH\inmaachar-public.tar.gz") {
    Write-Host "Uploading inmaachar-public.tar.gz..."
    scp -i $SSH_KEY "$PROJECT_PATH\inmaachar-public.tar.gz" "${SSH_HOST}:/home/ubuntu/"
}

if (Test-Path "$PROJECT_PATH\inmaachar-backend.tar.gz") {
    Write-Host "Uploading inmaachar-backend.tar.gz..."
    scp -i $SSH_KEY "$PROJECT_PATH\inmaachar-backend.tar.gz" "${SSH_HOST}:/home/ubuntu/"
}

Write-Host "All packages uploaded!"

# ==============================================================
# STEP 4: Deploy on Server
# ==============================================================
Write-Host "=============================================="
Write-Host "STEP 4: Deploying on Server"
Write-Host "=============================================="

$DEPLOY_SCRIPT = @'
#!/bin/bash
set -e

echo "=============================================="
echo "DEPLOYING INMA'ACHAR CHARITY"
echo "=============================================="

# Create directory structure
mkdir -p /home/ubuntu/inmaachar-app/frontend
mkdir -p /home/ubuntu/inmaachar-app/backend

# Clean old deployment
rm -rf /home/ubuntu/inmaachar-app/frontend/*
rm -rf /home/ubuntu/inmaachar-app/backend/*

# Extract frontend
echo "Extracting frontend..."
tar -xzf /home/ubuntu/inmaachar-frontend.tar.gz -C /home/ubuntu/inmaachar-app/frontend

# Extract static files
if [ -f "/home/ubuntu/inmaachar-static.tar.gz" ]; then
    echo "Extracting static files..."
    mkdir -p /home/ubuntu/inmaachar-app/frontend/.next
    tar -xzf /home/ubuntu/inmaachar-static.tar.gz -C /home/ubuntu/inmaachar-app/frontend/.next
fi

# Extract public folder
if [ -f "/home/ubuntu/inmaachar-public.tar.gz" ]; then
    echo "Extracting public folder..."
    tar -xzf /home/ubuntu/inmaachar-public.tar.gz -C /home/ubuntu/inmaachar-app/frontend
fi

# Extract backend (if exists)
if [ -f "/home/ubuntu/inmaachar-backend.tar.gz" ]; then
    echo "Extracting backend..."
    tar -xzf /home/ubuntu/inmaachar-backend.tar.gz -C /home/ubuntu/inmaachar-app/backend
    cd /home/ubuntu/inmaachar-app/backend
    npm install --production
fi

# Create .env for frontend (PORT 3000)
cat > /home/ubuntu/inmaachar-app/frontend/.env << 'ENVEOF'
MONGODB_URI=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/al-khair?retryWrites=true&w=majority&appName=Mawaddah
JWT_SECRET=inmaachar-super-secret-jwt-key-2024
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://inmaachar.com/api
ENVEOF

# Create .env.production for frontend
cp /home/ubuntu/inmaachar-app/frontend/.env /home/ubuntu/inmaachar-app/frontend/.env.production

# Create env.production for backend (PORT 4000)
cat > /home/ubuntu/inmaachar-app/backend/env.production << 'ENVEOF'
DATABASE_URL=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/al-khair?retryWrites=true&w=majority&appName=Mawaddah
JWT_SECRET=inmaachar-super-secret-jwt-key-2024
PORT=4000
NODE_ENV=production
ENVEOF

# Update PM2 ecosystem config
cat > /home/ubuntu/ecosystem.config.js << 'PMEOF'
module.exports = {
  apps: [
    {
      name: 'inmaachar-frontend',
      cwd: '/home/ubuntu/inmaachar-app/frontend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        MONGODB_URI: 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/al-khair?retryWrites=true&w=majority&appName=Mawaddah',
        JWT_SECRET: 'inmaachar-super-secret-jwt-key-2024',
        NEXT_PUBLIC_API_URL: 'https://inmaachar.com/api'
      }
    },
    {
      name: 'inmaachar-backend',
      cwd: '/home/ubuntu/inmaachar-app/backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        DATABASE_URL: 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/al-khair?retryWrites=true&w=majority&appName=Mawaddah',
        JWT_SECRET: 'inmaachar-super-secret-jwt-key-2024'
      }
    },
    {
      name: 'techiss-frontend',
      cwd: '/home/ubuntu/techiss-app/frontend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        MONGODB_URI: 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techissues?retryWrites=true&w=majority&appName=Mawaddah',
        JWT_SECRET: 'techissues-super-secret-jwt-key-2024',
        NEXT_PUBLIC_API_URL: 'http://157.175.55.203/api'
      }
    },
    {
      name: 'techiss-backend',
      cwd: '/home/ubuntu/techiss-app/backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
        DATABASE_URL: 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techissues?retryWrites=true&w=majority&appName=Mawaddah',
        JWT_SECRET: 'techissues-super-secret-jwt-key-2024'
      }
    }
  ]
};
PMEOF

# Restart PM2 with all apps
echo "Starting PM2 services..."
pm2 delete all 2>/dev/null || true
pm2 start /home/ubuntu/ecosystem.config.js
pm2 save

echo "=============================================="
echo "PM2 STATUS"
echo "=============================================="
pm2 list

echo "=============================================="
echo "DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "Inma'achar Charity: http://inmaachar.com (port 3000/4000)"
echo "Techiss Blog: http://157.175.55.203 (port 3001/4001)"
echo ""
'@

# Write and execute
$TEMP_SCRIPT = "$env:TEMP\deploy_inmaachar.sh"
$DEPLOY_SCRIPT | Out-File -FilePath $TEMP_SCRIPT -Encoding utf8 -NoNewline
(Get-Content $TEMP_SCRIPT -Raw) -replace "`r`n", "`n" | Set-Content $TEMP_SCRIPT -NoNewline

Write-Host "Uploading deployment script..."
scp -i $SSH_KEY $TEMP_SCRIPT "${SSH_HOST}:/home/ubuntu/deploy_inmaachar.sh"

Write-Host "Executing deployment..."
ssh -i $SSH_KEY $SSH_HOST "chmod +x /home/ubuntu/deploy_inmaachar.sh && bash /home/ubuntu/deploy_inmaachar.sh"

Write-Host ""
Write-Host "=============================================="
Write-Host "DEPLOYMENT COMPLETE!"
Write-Host "=============================================="
Write-Host ""
Write-Host "Inma'achar Charity: https://inmaachar.com"
Write-Host "Techiss Blog: http://157.175.55.203 (or https://techiss.store)"
Write-Host ""
