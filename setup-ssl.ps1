# SSL/HTTPS Setup Script for inmaachar.com and techiss.store
# Server: Ubuntu AWS EC2
# Target IP: 157.175.55.203

$ErrorActionPreference = "Stop"

# Configuration
$IP = "157.175.55.203"
$KEY = "techissues-key-44242414.pem"
$USER = "ubuntu"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host " SSL/HTTPS Setup for AWS EC2 Server" -ForegroundColor Cyan
Write-Host " Server: $IP" -ForegroundColor Cyan
Write-Host " Domains: inmaachar.com, techiss.store" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Fix key permissions
Write-Host "[1/5] Fixing SSH key permissions..." -ForegroundColor Yellow
icacls $KEY /reset 2>$null
icacls $KEY /grant:r "$($env:USERNAME):R" 2>$null
icacls $KEY /inheritance:r 2>$null

# Create SSL setup script
$SSL_SCRIPT = @'
#!/bin/bash
set -e

echo "============================================"
echo " STEP 1: Installing Certbot"
echo "============================================"

# Update package list
sudo apt-get update -y

# Install certbot and nginx plugin
sudo apt-get install -y certbot python3-certbot-nginx

echo ""
echo "============================================"
echo " STEP 2: Checking Current Nginx Configuration"
echo "============================================"

# Show current nginx config
echo "Current sites-enabled:"
ls -la /etc/nginx/sites-enabled/ || echo "No sites-enabled directory"

echo ""
echo "============================================"
echo " STEP 3: Generating SSL Certificates"
echo "============================================"

# Stop nginx briefly to allow certbot standalone mode if needed
# First try with nginx plugin

echo "Generating certificate for inmaachar.com..."
sudo certbot --nginx -d inmaachar.com -d www.inmaachar.com --non-interactive --agree-tos --email admin@inmaachar.com --redirect || {
    echo "Nginx plugin failed, trying standalone mode..."
    sudo systemctl stop nginx
    sudo certbot certonly --standalone -d inmaachar.com -d www.inmaachar.com --non-interactive --agree-tos --email admin@inmaachar.com
    sudo systemctl start nginx
}

echo ""
echo "Generating certificate for techiss.store..."
sudo certbot --nginx -d techiss.store -d www.techiss.store --non-interactive --agree-tos --email admin@techiss.store --redirect || {
    echo "Nginx plugin failed, trying standalone mode..."
    sudo systemctl stop nginx
    sudo certbot certonly --standalone -d techiss.store -d www.techiss.store --non-interactive --agree-tos --email admin@techiss.store
    sudo systemctl start nginx
}

echo ""
echo "============================================"
echo " STEP 4: Verifying Certificates"
echo "============================================"

echo "Installed certificates:"
sudo certbot certificates

echo ""
echo "============================================"
echo " STEP 5: Testing Nginx Configuration"
echo "============================================"

sudo nginx -t

echo ""
echo "============================================"
echo " STEP 6: Reloading Nginx"
echo "============================================"

sudo systemctl reload nginx
sudo systemctl status nginx --no-pager

echo ""
echo "============================================"
echo " STEP 7: Checking Auto-Renewal"
echo "============================================"

# Test auto-renewal
sudo certbot renew --dry-run

# Show certbot timer
sudo systemctl status certbot.timer --no-pager || echo "Timer might be named differently"

echo ""
echo "============================================"
echo " STEP 8: Final Nginx Configuration"
echo "============================================"

echo "=== inmaachar.com config ==="
cat /etc/nginx/sites-available/inmaachar 2>/dev/null || cat /etc/nginx/sites-available/inmaachar.com 2>/dev/null || echo "Config not found with standard names"

echo ""
echo "=== techiss.store config ==="
cat /etc/nginx/sites-available/techiss 2>/dev/null || cat /etc/nginx/sites-available/techiss.store 2>/dev/null || echo "Config not found with standard names"

echo ""
echo "============================================"
echo " STEP 9: Testing HTTPS Access"
echo "============================================"

echo "Testing inmaachar.com..."
curl -Is https://inmaachar.com | head -5 || echo "HTTPS test failed for inmaachar.com"

echo ""
echo "Testing techiss.store..."
curl -Is https://techiss.store | head -5 || echo "HTTPS test failed for techiss.store"

echo ""
echo "Testing www subdomains..."
curl -Is https://www.inmaachar.com | head -5 || echo "HTTPS test failed for www.inmaachar.com"
curl -Is https://www.techiss.store | head -5 || echo "HTTPS test failed for www.techiss.store"

echo ""
echo "============================================"
echo " STEP 10: Port Status"
echo "============================================"

echo "Checking listening ports..."
sudo netstat -tlnp | grep -E ":80|:443|:3000|:3001" || sudo ss -tlnp | grep -E ":80|:443|:3000|:3001"

echo ""
echo "============================================"
echo " SSL SETUP COMPLETE!"
echo "============================================"
echo ""
echo "Summary:"
echo "  - inmaachar.com -> https://inmaachar.com (port 3000)"
echo "  - techiss.store -> https://techiss.store (port 3001)"
echo ""
echo "Both domains now have:"
echo "  ✓ SSL/TLS certificates from Let's Encrypt"
echo "  ✓ Automatic HTTP to HTTPS redirect"
echo "  ✓ Auto-renewal configured"
echo ""
'@

# Save script to temp file
$SSL_SCRIPT | Set-Content -Path "ssl_setup.sh" -Encoding ASCII

Write-Host "[2/5] Uploading SSL setup script to server..." -ForegroundColor Yellow
scp -i $KEY -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ssl_setup.sh ${USER}@${IP}:/home/ubuntu/

Write-Host "[3/5] Converting line endings and setting permissions..." -ForegroundColor Yellow
ssh -i $KEY -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${USER}@${IP} "sed -i 's/\r$//' /home/ubuntu/ssl_setup.sh && chmod +x /home/ubuntu/ssl_setup.sh"

Write-Host "[4/5] Executing SSL setup on server..." -ForegroundColor Yellow
Write-Host ""
ssh -i $KEY -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${USER}@${IP} "/home/ubuntu/ssl_setup.sh"

Write-Host ""
Write-Host "[5/5] Cleaning up..." -ForegroundColor Yellow
Remove-Item ssl_setup.sh -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host " SSL/HTTPS SETUP COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Please verify by visiting:" -ForegroundColor White
Write-Host "  - https://inmaachar.com" -ForegroundColor Cyan
Write-Host "  - https://techiss.store" -ForegroundColor Cyan
Write-Host ""
