# Google Cloud Deployment Script for Techissues Blog
# This script builds and deploys the application to Google Cloud Run

param(
    [string]$ProjectId = "",
    [string]$Region = "us-central1",
    [string]$ServiceName = "techissues",
    [switch]$BuildOnly,
    [switch]$DeployOnly,
    [switch]$SetSecrets
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Success { param($Message) Write-Host "✓ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "→ $Message" -ForegroundColor Cyan }
function Write-Warn { param($Message) Write-Host "⚠ $Message" -ForegroundColor Yellow }
function Write-Fail { param($Message) Write-Host "✗ $Message" -ForegroundColor Red }

Write-Host "`n========================================" -ForegroundColor Blue
Write-Host "  TECHISSUES - Google Cloud Deployment  " -ForegroundColor Blue
Write-Host "========================================`n" -ForegroundColor Blue

# Check if gcloud is installed
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Fail "Google Cloud SDK is not installed!"
    Write-Info "Download from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

Write-Success "Google Cloud SDK found"

# Get project ID
if (-not $ProjectId) {
    $ProjectId = gcloud config get-value project 2>$null
    if (-not $ProjectId) {
        Write-Fail "No project ID specified and no default project configured"
        Write-Info "Run: gcloud config set project YOUR_PROJECT_ID"
        exit 1
    }
}

Write-Info "Using Project: $ProjectId"
Write-Info "Region: $Region"
Write-Info "Service Name: $ServiceName"

# Authenticate if needed
$account = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>$null
if (-not $account) {
    Write-Warn "Not authenticated. Running gcloud auth login..."
    gcloud auth login
}
Write-Success "Authenticated as: $account"

# Set the project
gcloud config set project $ProjectId 2>$null

# Enable required APIs
Write-Info "Enabling required Google Cloud APIs..."
$apis = @(
    "cloudbuild.googleapis.com",
    "run.googleapis.com",
    "containerregistry.googleapis.com",
    "secretmanager.googleapis.com"
)

foreach ($api in $apis) {
    gcloud services enable $api --quiet 2>$null
}
Write-Success "Required APIs enabled"

# Set up secrets if requested
if ($SetSecrets) {
    Write-Info "Setting up secrets in Secret Manager..."
    
    # Prompt for secrets
    Write-Host "`nEnter your environment variables (press Enter to skip):" -ForegroundColor Yellow
    
    $mongoUri = Read-Host "MONGODB_URI"
    $jwtSecret = Read-Host "JWT_SECRET"
    $adminEmail = Read-Host "ADMIN_EMAIL"
    
    if ($mongoUri) {
        Write-Output $mongoUri | gcloud secrets create mongodb-uri --data-file=- 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Output $mongoUri | gcloud secrets versions add mongodb-uri --data-file=-
        }
    }
    
    if ($jwtSecret) {
        Write-Output $jwtSecret | gcloud secrets create jwt-secret --data-file=- 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Output $jwtSecret | gcloud secrets versions add jwt-secret --data-file=-
        }
    }
    
    if ($adminEmail) {
        Write-Output $adminEmail | gcloud secrets create admin-email --data-file=- 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Output $adminEmail | gcloud secrets versions add admin-email --data-file=-
        }
    }
    
    Write-Success "Secrets configured"
}

$ImageName = "gcr.io/$ProjectId/${ServiceName}:latest"

# Build the Docker image
if (-not $DeployOnly) {
    Write-Host "`n--- Building Docker Image ---" -ForegroundColor Yellow
    
    # Option 1: Build locally and push
    Write-Info "Building Docker image locally..."
    docker build -t $ImageName .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "Docker build failed!"
        exit 1
    }
    Write-Success "Docker image built: $ImageName"
    
    # Push to Container Registry
    Write-Info "Pushing image to Google Container Registry..."
    
    # Configure Docker to use gcloud as credential helper
    gcloud auth configure-docker --quiet 2>$null
    
    docker push $ImageName
    
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "Failed to push Docker image!"
        exit 1
    }
    Write-Success "Image pushed to Container Registry"
}

# Deploy to Cloud Run
if (-not $BuildOnly) {
    Write-Host "`n--- Deploying to Cloud Run ---" -ForegroundColor Yellow
    
    Write-Info "Deploying service to Cloud Run..."
    
    # Deploy with environment variables from secrets
    $deployCmd = @(
        "run", "deploy", $ServiceName,
        "--image", $ImageName,
        "--region", $Region,
        "--platform", "managed",
        "--allow-unauthenticated",
        "--port", "8080",
        "--memory", "512Mi",
        "--cpu", "1",
        "--min-instances", "0",
        "--max-instances", "10",
        "--timeout", "300",
        "--set-env-vars", "NODE_ENV=production"
    )
    
    # Add secrets if they exist
    $secretsExist = gcloud secrets list --format="value(name)" 2>$null
    if ($secretsExist -match "mongodb-uri") {
        $deployCmd += "--set-secrets"
        $deployCmd += "MONGODB_URI=mongodb-uri:latest"
    }
    if ($secretsExist -match "jwt-secret") {
        $deployCmd += "--set-secrets"
        $deployCmd += "JWT_SECRET=jwt-secret:latest"
    }
    
    & gcloud @deployCmd
    
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "Deployment failed!"
        exit 1
    }
    
    Write-Success "Deployment successful!"
    
    # Get the service URL
    $serviceUrl = gcloud run services describe $ServiceName --region $Region --format="value(status.url)" 2>$null
    
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`nService URL: $serviceUrl" -ForegroundColor Cyan
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Visit the URL above to verify deployment"
    Write-Host "2. Configure custom domain (optional):"
    Write-Host "   gcloud run domain-mappings create --service $ServiceName --domain your-domain.com --region $Region"
    Write-Host "3. Set up CI/CD trigger for automatic deployments:"
    Write-Host "   gcloud builds triggers create github --repo-name=techissues --branch-pattern='^main$' --build-config=cloudbuild.yaml"
}

Write-Host "`n"
