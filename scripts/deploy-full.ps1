$ErrorActionPreference = "Stop"

if (-not (Test-Path "aws-config.json")) { Write-Error "Config not found"; exit 1 }
$CONFIG = Get-Content aws-config.json | ConvertFrom-Json
$IP = $CONFIG.PUBLIC_IP
$KEY = $CONFIG.KEY_FILE

Write-Host "Deploying Full Stack to $IP..."

# Fix Permissions for Key
icacls $KEY /reset
icacls $KEY /grant:r "$($env:USERNAME):R"
icacls $KEY /inheritance:r

# Create .env for Next.js
$NEXTJS_ENV = "DATABASE_URL=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/al-khair?appName=Mawaddah`nJWT_SECRET=techissues-super-secret-jwt-key-2024`nNODE_ENV=production"
$NEXTJS_ENV | Set-Content -Path "env_nextjs.txt" -Encoding ASCII
scp -i $KEY -o StrictHostKeyChecking=no env_nextjs.txt ubuntu@${IP}:/home/ubuntu/.env
Remove-Item env_nextjs.txt

# Build Next.js
Write-Host "Building Next.js..."
npm run build

# Package standalone output
Write-Host "Packaging Frontend..."
if (Test-Path frontend.tar.gz) { Remove-Item frontend.tar.gz }
tar -czf frontend.tar.gz -C .next standalone
scp -i $KEY -o StrictHostKeyChecking=no frontend.tar.gz ubuntu@${IP}:/home/ubuntu/
# Also send static and public
tar -czf static.tar.gz -C .next static
scp -i $KEY -o StrictHostKeyChecking=no static.tar.gz ubuntu@${IP}:/home/ubuntu/
tar -czf public.tar.gz public
scp -i $KEY -o StrictHostKeyChecking=no public.tar.gz ubuntu@${IP}:/home/ubuntu/
Remove-Item frontend.tar.gz, static.tar.gz, public.tar.gz

# Package Backend
Write-Host "Packaging Backend..."
New-Item -ItemType Directory -Force backend_dist | Out-Null
Copy-Item -Path backend\* -Destination backend_dist -Recurse
if (Test-Path backend_dist\node_modules) { Remove-Item backend_dist\node_modules -Recurse -Force }
tar -czf backend.tar.gz -C backend_dist .
scp -i $KEY -o StrictHostKeyChecking=no backend.tar.gz ubuntu@${IP}:/home/ubuntu/
Remove-Item backend.tar.gz
Remove-Item backend_dist -Recurse -Force

# Copy deploy script
$DEPLOY_SCRIPT = @"
#!/bin/bash
set -e
sudo mkdir -p /var/www/frontend /var/www/backend
sudo chown -R ubuntu:ubuntu /var/www

echo 'Deploying Backend...'
rm -rf /var/www/backend/*
tar -xzf /home/ubuntu/backend.tar.gz -C /var/www/backend
cd /var/www/backend && npm install --production
pm2 delete backend 2>/dev/null || true
pm2 start server.js --name backend
pm2 save

echo 'Deploying Frontend...'
rm -rf /var/www/frontend/*
tar -xzf /home/ubuntu/frontend.tar.gz -C /var/www/frontend
mkdir -p /var/www/frontend/.next
tar -xzf /home/ubuntu/static.tar.gz -C /var/www/frontend/.next
tar -xzf /home/ubuntu/public.tar.gz -C /var/www/frontend
cp /home/ubuntu/.env /var/www/frontend/.env
cd /var/www/frontend
pm2 delete frontend 2>/dev/null || true
PORT=3000 pm2 start server.js --name frontend
pm2 save

echo 'Configuring Nginx...'
sudo tee /etc/nginx/sites-available/techissues > /dev/null << 'NGINX'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
sudo rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/backend
sudo ln -sf /etc/nginx/sites-available/techissues /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
echo 'Done!'
pm2 list
"@
$DEPLOY_SCRIPT | Set-Content -Path "deploy_remote.sh" -Encoding ASCII
scp -i $KEY -o StrictHostKeyChecking=no deploy_remote.sh ubuntu@${IP}:/home/ubuntu/
Remove-Item deploy_remote.sh

ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@${IP} "sed -i 's/\r$//' /home/ubuntu/deploy_remote.sh && chmod +x /home/ubuntu/deploy_remote.sh && /home/ubuntu/deploy_remote.sh"

Write-Host ""
Write-Host "=========================================="
Write-Host "DEPLOYMENT COMPLETE!"
Write-Host "Frontend URL: http://$IP"
Write-Host "Backend API:  http://$IP:4000/api/"
Write-Host "=========================================="
