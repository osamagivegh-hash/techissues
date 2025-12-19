$ErrorActionPreference = "Stop"

# ============================================
# TECHISS.STORE DEPLOYMENT SCRIPT
# ============================================

$SERVER_IP = "157.175.55.203"
$SSH_KEY = "C:\Users\TestUser\Desktop\aws\charity-key.pem"
$REMOTE_PATH = "/home/ubuntu/techiss-app/frontend"

Write-Host "========================================================"
Write-Host "  DEPLOYING TECHISS.STORE TO PRODUCTION"
Write-Host "  Server: $SERVER_IP"
Write-Host "========================================================"
Write-Host ""

# Step 1: Build Next.js
Write-Host "[1/5] Building Next.js application..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!"
    exit 1
}
Write-Host "Build completed successfully!"
Write-Host ""

# Step 2: Create deployment package
Write-Host "[2/5] Creating deployment package..."
if (Test-Path "deploy-package") { Remove-Item "deploy-package" -Recurse -Force }
New-Item -ItemType Directory -Force "deploy-package" | Out-Null

# Copy standalone build
Copy-Item -Path ".next\standalone\*" -Destination "deploy-package" -Recurse

# Copy static files
New-Item -ItemType Directory -Force "deploy-package\.next\static" | Out-Null
Copy-Item -Path ".next\static\*" -Destination "deploy-package\.next\static" -Recurse

# Copy public folder
if (Test-Path "public") {
    Copy-Item -Path "public" -Destination "deploy-package\public" -Recurse
}

# Create tar package
if (Test-Path "techiss-deploy.tar.gz") { Remove-Item "techiss-deploy.tar.gz" }
tar -czf techiss-deploy.tar.gz -C deploy-package .
Remove-Item "deploy-package" -Recurse -Force

Write-Host "Package created: techiss-deploy.tar.gz"
Write-Host ""

# Step 3: Upload to server
Write-Host "[3/5] Uploading to server..."
scp -i $SSH_KEY -o StrictHostKeyChecking=no -o ConnectTimeout=30 techiss-deploy.tar.gz ubuntu@${SERVER_IP}:/home/ubuntu/
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Upload failed!"
    exit 1
}
Write-Host "Upload completed!"
Write-Host ""

# Step 4: Deploy on server
Write-Host "[4/5] Deploying on server..."

# Build the bash command as a single line to avoid CRLF issues
$DEPLOY_CMD = "cd /home/ubuntu && " +
"if [ -d '/home/ubuntu/techiss-app/frontend' ]; then echo 'Backing up...'; rm -rf /home/ubuntu/techiss-app/frontend.backup 2>/dev/null; cp -r /home/ubuntu/techiss-app/frontend /home/ubuntu/techiss-app/frontend.backup 2>/dev/null || true; fi && " +
"echo 'Extracting new deployment...' && " +
"mkdir -p /home/ubuntu/techiss-app/frontend && " +
"rm -rf /home/ubuntu/techiss-app/frontend/* 2>/dev/null && " +
"tar -xzf techiss-deploy.tar.gz -C /home/ubuntu/techiss-app/frontend && " +
"if [ -f /home/ubuntu/techiss-app/frontend.backup/.env.local ]; then cp /home/ubuntu/techiss-app/frontend.backup/.env.local /home/ubuntu/techiss-app/frontend/.env.local; fi && " +
"if [ -f /home/ubuntu/techiss-app/frontend.backup/.env ]; then cp /home/ubuntu/techiss-app/frontend.backup/.env /home/ubuntu/techiss-app/frontend/.env; fi && " +
"rm -f /home/ubuntu/techiss-deploy.tar.gz && " +
"echo 'Deployment extracted successfully!'"

ssh -i $SSH_KEY -o StrictHostKeyChecking=no -o ConnectTimeout=30 ubuntu@$SERVER_IP $DEPLOY_CMD
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Deployment failed!"
    exit 1
}
Write-Host ""

# Step 5: Restart PM2
Write-Host "[5/5] Restarting PM2 processes..."
$RESTART_CMD = "pm2 restart techiss-frontend --update-env && pm2 list"
ssh -i $SSH_KEY -o StrictHostKeyChecking=no -o ConnectTimeout=30 ubuntu@$SERVER_IP $RESTART_CMD

# Clean up local package
Remove-Item "techiss-deploy.tar.gz" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "========================================================"
Write-Host "  DEPLOYMENT COMPLETE!"
Write-Host "========================================================"
Write-Host ""
Write-Host "  Website: https://techiss.store"
Write-Host ""
Write-Host "  Changes deployed:"
Write-Host "    - Google AdSense integration"
Write-Host "    - All latest code updates"
Write-Host ""
Write-Host "========================================================"
