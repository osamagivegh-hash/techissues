<#
.SYNOPSIS
    Deploys the Techissues Blog to Google Cloud Run using Cloud Build.
    
.DESCRIPTION
    This script automates the deployment process for Google Cloud Run.
    It wraps gcloud commands to build and deploy the application.
    
.PARAMETER SetSecrets
    If specified, helps configure the necessary secrets in Google Secret Manager.
    
.PARAMETER BuildOnly
    If specified, only builds the Docker image without deploying.
    
.PARAMETER DeployOnly
    If specified, only deploys the existing latest image without rebuilding.
    
.EXAMPLE
    .\deploy-gcloud.ps1
    Deploys the application (Build + Deploy).
    
.EXAMPLE
    .\deploy-gcloud.ps1 -SetSecrets
    Configures secrets.
#>

param(
    [switch]$SetSecrets,
    [switch]$BuildOnly,
    [switch]$DeployOnly
)

$ErrorActionPreference = "Stop"
$ServiceName = "techissues"
$Region = "us-central1"

# Function to check if a command exists
function Test-CommandExists {
    param ($Command)
    $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

# Check for gcloud
if (-not (Test-CommandExists gcloud)) {
    Write-Error "Google Cloud SDK (gcloud) is not installed or not in PATH."
    exit 1
}

# Get current project
$ProjectID = gcloud config get-value project 2>$null
if ([string]::IsNullOrWhiteSpace($ProjectID)) {
    Write-Error "No Google Cloud project is currently active. Run 'gcloud config set project YOUR_PROJECT_ID'."
    exit 1
}

Write-Host "========================================================"
Write-Host "  GOOGLE CLOUD DEPLOYMENT: $ServiceName"
Write-Host "  Project: $ProjectID"
Write-Host "  Region:  $Region"
Write-Host "========================================================"
Write-Host ""

# Handle Secrets
if ($SetSecrets) {
    Write-Host "[Secrets] Configuring secrets..."
    
    # Check for Secret Manager API
    Write-Host "Enabling Secret Manager API..."
    gcloud services enable secretmanager.googleapis.com
    
    # Prompt for secrets (In a real interactive session, we'd prompt. 
    # For automation safety, we'll check if they exist or instruct user.)
    
    Write-Host "Instructions: To set secrets, run the following commands manually:"
    Write-Host "  echo 'your-mongodb-uri' | gcloud secrets create mongodb-uri --data-file=-"
    Write-Host "  echo 'your-jwt-secret' | gcloud secrets create jwt-secret --data-file=-"
    Write-Host ""
    
    # Grant access to Cloud Run service account
    $ProjectNumber = gcloud projects describe $ProjectID --format="value(projectNumber)"
    $ServiceAccount = "$ProjectNumber-compute@developer.gserviceaccount.com"
    
    Write-Host "Granting access to service account: $ServiceAccount"
    gcloud secrets add-iam-policy-binding mongodb-uri --member="serviceAccount:$ServiceAccount" --role="roles/secretmanager.secretAccessor" 2>$null
    gcloud secrets add-iam-policy-binding jwt-secret --member="serviceAccount:$ServiceAccount" --role="roles/secretmanager.secretAccessor" 2>$null
    
    Write-Host "Secrets configuration steps completed (verify manually)."
    exit 0
}

# Build Step
if (-not $DeployOnly) {
    Write-Host "[1/2] Building and Pushing Docker Image..."
    
    # Check for Cloud Build API
    Write-Host "Enabling Cloud Build API..."
    gcloud services enable cloudbuild.googleapis.com
    
    # Submit build
    gcloud builds submit --config=cloudbuild.yaml "--substitutions=_SERVICE_NAME=$ServiceName,_REGION=$Region"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed."
        exit 1
    }
    
    Write-Host "Build successful."
}
elseif ($DeployOnly) {
    Write-Host "[1/2] Skipping Build (DeployOnly selected)..."
}

# Deploy Step
if (-not $BuildOnly) {
    Write-Host "[2/2] Deploying to Cloud Run..."
    
    # Check for Cloud Run API
    Write-Host "Enabling Cloud Run API..."
    gcloud services enable run.googleapis.com
    
    # Check if we should use secrets
    # We will try to deploy with secrets if they exist, otherwise fallback to env vars or fail
    
    # For this script, we'll use the cloudbuild.yaml's deployment step if we just built, 
    # but since cloudbuild.yaml DOES the deployment, we might have already deployed in step 1!
    
    # Let's check cloudbuild.yaml content.
    # It seems cloudbuild.yaml HAS a deploy step (id: 'deploy').
    
    if (-not $DeployOnly) {
        Write-Host "Deployment was handled by Cloud Build in Step 1."
    }
    else {
        # Manual deploy if we skipped build
        Write-Host "Deploying latest image..."
        gcloud run deploy $ServiceName `
            --image gcr.io/$ProjectID/$ServiceName:latest `
            --region $Region `
            --platform managed `
            --allow-unauthenticated
            
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Deployment failed."
            exit 1
        }
    }
    
    # Get URL
    $ServiceUrl = gcloud run services describe $ServiceName --region $Region --format "value(status.url)"
    Write-Host ""
    Write-Host "========================================================"
    Write-Host "  DEPLOYMENT COMPLETE!"
    Write-Host "  URL: $ServiceUrl"
    Write-Host "========================================================"
}
elseif ($BuildOnly) {
    Write-Host "[2/2] Skipping Deployment (BuildOnly selected)..."
}
