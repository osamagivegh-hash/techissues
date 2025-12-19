$ErrorActionPreference = "Stop"
$AWS = "$env:APPDATA\Python\Python314\Scripts\aws.cmd"

if (-not (Test-Path "aws-config.json")) { Write-Error "Config not found"; exit 1 }
$CONFIG = Get-Content aws-config.json | ConvertFrom-Json
$IP = $CONFIG.PUBLIC_IP
$KEY = $CONFIG.KEY_FILE

Write-Host "Deploying Backend to $IP..."

# Fix Permissions for Key
icacls $KEY /reset
icacls $KEY /grant:r "$($env:USERNAME):R"
icacls $KEY /inheritance:r

# Copy setup script
scp -i $KEY -o StrictHostKeyChecking=no scripts/setup-server.sh ubuntu@${IP}:/home/ubuntu/

# Prepare Backend Dist
Write-Host "Packaging Backend..."
New-Item -ItemType Directory -Force backend_dist | Out-Null
Copy-Item -Path backend\* -Destination backend_dist -Recurse
if (Test-Path backend_dist\node_modules) { Remove-Item backend_dist\node_modules -Recurse -Force }

# Use tar if available
if (Get-Command tar -ErrorAction SilentlyContinue) {
    tar -czf backend.tar.gz -C backend_dist .
    scp -i $KEY -o StrictHostKeyChecking=no backend.tar.gz ubuntu@${IP}:/home/ubuntu/
    Remove-Item backend.tar.gz
    
    # Execute Setup and Deploy - Fix CRLF issues by using single line
    ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@${IP} "sed -i 's/\r$//' setup-server.sh; sudo bash setup-server.sh"

    $DEPLOY_CMDS = "mkdir -p /var/www/backend; tar -xzf backend.tar.gz -C /var/www/backend; cd /var/www/backend; npm install; pm2 delete backend 2>/dev/null || true; pm2 start server.js --name backend; pm2 save; pm2 startup"
    
    ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@${IP} $DEPLOY_CMDS
}
else {
    Write-Host "Tar not found, copying files..."
    scp -i $KEY -o StrictHostKeyChecking=no -r backend_dist/* ubuntu@${IP}:/var/www/backend/
    
    ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@${IP} "sed -i 's/\r$//' setup-server.sh; sudo bash setup-server.sh"
    
    $DEPLOY_CMDS = "cd /var/www/backend; npm install; pm2 delete backend 2>/dev/null || true; pm2 start server.js --name backend; pm2 save; pm2 startup"
    ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@${IP} $DEPLOY_CMDS
}

Remove-Item backend_dist -Recurse -Force
Write-Host "Backend Deployed!"
