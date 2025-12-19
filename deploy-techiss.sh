#!/bin/bash
# ==============================================================
# TECHISS BLOG DEPLOYMENT SCRIPT
# Deploys to: /home/ubuntu/techiss-app
# Frontend Port: 3001  (NOT 3000 - that's for Inma'achar)
# Backend Port: 4001   (NOT 4000 - that's for Inma'achar)
# Domain: techiss.store
# ==============================================================
set -e

echo "=== Deploying Techiss Blog (SEPARATED) ==="

DEPLOY_DIR="/home/ubuntu/techiss-app"
FRONTEND_DIR="$DEPLOY_DIR/frontend"
BACKEND_DIR="$DEPLOY_DIR/backend"

# Create directories
mkdir -p $FRONTEND_DIR
mkdir -p $BACKEND_DIR

# Deploy Frontend
echo "Deploying Frontend..."
rm -rf $FRONTEND_DIR/*
tar -xzf /home/ubuntu/techiss-frontend.tar.gz -C $FRONTEND_DIR

if [ -f "/home/ubuntu/techiss-static.tar.gz" ]; then
    mkdir -p $FRONTEND_DIR/.next
    tar -xzf /home/ubuntu/techiss-static.tar.gz -C $FRONTEND_DIR/.next
fi

# Create .env for frontend - PORT 3001!
cat > $FRONTEND_DIR/.env << 'EOF'
MONGODB_URI=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://techiss.store/api
EOF

# Deploy Backend
echo "Deploying Backend..."
rm -rf $BACKEND_DIR/*
tar -xzf /home/ubuntu/techiss-backend.tar.gz -C $BACKEND_DIR
cd $BACKEND_DIR
npm install --production

# Create env.production for backend - PORT 4001!
cat > $BACKEND_DIR/env.production << 'EOF'
DATABASE_URL=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
PORT=4001
NODE_ENV=production
EOF

# Start/Restart PM2 services
echo "Starting PM2 services..."
pm2 delete techiss-frontend 2>/dev/null || true
pm2 delete techiss-backend 2>/dev/null || true

cd $FRONTEND_DIR
PORT=3001 pm2 start server.js --name techiss-frontend

cd $BACKEND_DIR
PORT=4001 pm2 start server.js --name techiss-backend

pm2 save

echo "=== PM2 Status ==="
pm2 list

echo "=== Deployment Complete ==="
echo "Frontend: https://techiss.store (port 3001)"
echo "Backend:  https://techiss.store/api (port 4001)"

