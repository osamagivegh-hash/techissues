#!/bin/bash
# ==============================================================
# TECHISS BLOG DEPLOYMENT SCRIPT
# Deploys to: /home/ubuntu/techiss-app
# Frontend Port: 3001
# Backend Port: 4001
# Domain: techiss.store
# ==============================================================
set -e

echo "=============================================="
echo "🚀 DEPLOYING TECHISS BLOG"
echo "=============================================="

DEPLOY_DIR="/home/ubuntu/techiss-app"
FRONTEND_DIR="$DEPLOY_DIR/frontend"
BACKEND_DIR="$DEPLOY_DIR/backend"

# Create directories
mkdir -p $FRONTEND_DIR
mkdir -p $BACKEND_DIR

echo "=============================================="
echo "📦 STEP 1: DEPLOY FRONTEND"
echo "=============================================="

# Clear old frontend
rm -rf $FRONTEND_DIR/*
rm -rf $FRONTEND_DIR/.next 2>/dev/null || true

# Extract frontend (assumes techiss-frontend.tar.gz is in /home/ubuntu/)
if [ -f "/home/ubuntu/techiss-frontend.tar.gz" ]; then
    tar -xzf /home/ubuntu/techiss-frontend.tar.gz -C $FRONTEND_DIR
    echo "✅ Frontend extracted"
else
    echo "❌ ERROR: /home/ubuntu/techiss-frontend.tar.gz not found!"
    exit 1
fi

# Extract static files if available
if [ -f "/home/ubuntu/techiss-static.tar.gz" ]; then
    mkdir -p $FRONTEND_DIR/.next
    tar -xzf /home/ubuntu/techiss-static.tar.gz -C $FRONTEND_DIR/.next
    echo "✅ Static files extracted"
fi

# Create .env for frontend - PORT 3001!
cat > $FRONTEND_DIR/.env << 'EOF'
MONGODB_URI=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_API_URL=https://techiss.store/api
EOF

echo "✅ Frontend .env created with PORT=3001"

echo "=============================================="
echo "📦 STEP 2: DEPLOY BACKEND"
echo "=============================================="

# Clear old backend
rm -rf $BACKEND_DIR/*

# Extract backend (assumes techiss-backend.tar.gz is in /home/ubuntu/)
if [ -f "/home/ubuntu/techiss-backend.tar.gz" ]; then
    tar -xzf /home/ubuntu/techiss-backend.tar.gz -C $BACKEND_DIR
    echo "✅ Backend extracted"
else
    echo "❌ ERROR: /home/ubuntu/techiss-backend.tar.gz not found!"
    exit 1
fi

# Install dependencies
cd $BACKEND_DIR
npm install --production
echo "✅ Backend dependencies installed"

# Create env.production for backend - PORT 4001!
cat > $BACKEND_DIR/env.production << 'EOF'
DATABASE_URL=mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah
JWT_SECRET=techissues-super-secret-jwt-key-2024
PORT=4001
NODE_ENV=production
EOF

echo "✅ Backend env.production created with PORT=4001"

echo "=============================================="
echo "🔄 STEP 3: START PM2 SERVICES"
echo "=============================================="

# Stop and delete old Techiss processes (if any)
pm2 delete techiss-frontend 2>/dev/null || true
pm2 delete techiss-backend 2>/dev/null || true

# Start frontend on port 3001
cd $FRONTEND_DIR
PORT=3001 pm2 start server.js --name techiss-frontend
echo "✅ techiss-frontend started on port 3001"

# Start backend on port 4001
cd $BACKEND_DIR
PORT=4001 pm2 start server.js --name techiss-backend
echo "✅ techiss-backend started on port 4001"

# Save PM2 configuration
pm2 save
echo "✅ PM2 configuration saved"

echo "=============================================="
echo "📊 PM2 STATUS"
echo "=============================================="
pm2 list

echo "=============================================="
echo "✅ TECHISS BLOG DEPLOYMENT COMPLETE!"
echo "=============================================="
echo ""
echo "Frontend: http://techiss.store (port 3001)"
echo "Backend:  http://techiss.store/api (port 4001)"
echo ""
echo "To test locally on server:"
echo "  curl http://localhost:3001"
echo "  curl http://localhost:4001/api/health"
echo ""
