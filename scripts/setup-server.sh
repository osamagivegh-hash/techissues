#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
sudo apt-get update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx certbot python3-certbot-nginx

sudo npm install -g pm2

sudo mkdir -p /var/www/backend
sudo chown -R ubuntu:ubuntu /var/www/backend

# Remove default nginx
sudo rm /etc/nginx/sites-enabled/default

# Create Nginx Config
echo "server {
    listen 80;
    server_name api.techiss.store;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}" | sudo tee /etc/nginx/sites-available/backend

sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
