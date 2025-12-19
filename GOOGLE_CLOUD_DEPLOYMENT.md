# Google Cloud Deployment Guide for Techissues Blog

This guide covers deploying the Techissues Blog to Google Cloud Run using Docker.

## Prerequisites

1. **Google Cloud SDK** - [Install](https://cloud.google.com/sdk/docs/install)
2. **Docker Desktop** - [Install](https://www.docker.com/products/docker-desktop)
3. **Google Cloud Project** with billing enabled

## Quick Start

### Option 1: Automated Deployment (Recommended)

```powershell
# First time setup (includes secrets configuration)
.\deploy-gcloud.ps1 -SetSecrets

# Regular deployment
.\deploy-gcloud.ps1

# Build only (don't deploy)
.\deploy-gcloud.ps1 -BuildOnly

# Deploy only (use existing image)
.\deploy-gcloud.ps1 -DeployOnly
```

### Option 2: Using Cloud Build (CI/CD)

```bash
# Trigger a build using Cloud Build
gcloud builds submit --config=cloudbuild.yaml
```

### Option 3: Manual Deployment

```bash
# 1. Set your project
gcloud config set project YOUR_PROJECT_ID

# 2. Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com

# 3. Build and push Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/techissues:latest .
gcloud auth configure-docker
docker push gcr.io/YOUR_PROJECT_ID/techissues:latest

# 4. Deploy to Cloud Run
gcloud run deploy techissues \
  --image gcr.io/YOUR_PROJECT_ID/techissues:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --set-env-vars "NODE_ENV=production"
```

## Environment Variables

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | Random 64+ char string |
| `NODE_ENV` | Environment mode | `production` |

### Setting Environment Variables

#### Option A: Using Secret Manager (Recommended for Production)

```bash
# Create secrets
echo "your-mongodb-uri" | gcloud secrets create mongodb-uri --data-file=-
echo "your-jwt-secret" | gcloud secrets create jwt-secret --data-file=-

# Grant Cloud Run access to secrets
gcloud secrets add-iam-policy-binding mongodb-uri \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Deploy with secrets
gcloud run deploy techissues \
  --image gcr.io/YOUR_PROJECT_ID/techissues:latest \
  --set-secrets "MONGODB_URI=mongodb-uri:latest,JWT_SECRET=jwt-secret:latest" \
  --region us-central1
```

#### Option B: Direct Environment Variables

```bash
gcloud run deploy techissues \
  --image gcr.io/YOUR_PROJECT_ID/techissues:latest \
  --set-env-vars "MONGODB_URI=your-uri,JWT_SECRET=your-secret" \
  --region us-central1
```

## Custom Domain Setup

1. **Add domain mapping**:
```bash
gcloud run domain-mappings create \
  --service techissues \
  --domain techiss.store \
  --region us-central1
```

2. **Update DNS records** in your domain registrar:
   - Add the CNAME or A records as shown by Google Cloud

3. **SSL is automatic** - Google Cloud manages SSL certificates

## CI/CD Setup with GitHub

1. **Connect GitHub repository**:
```bash
gcloud builds triggers create github \
  --repo-name=techissues \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

2. **Push to trigger deployment**:
```bash
git push origin main
```

## Monitoring & Logging

### View Logs
```bash
# Stream logs
gcloud run logs tail techissues --region us-central1

# View recent logs
gcloud run logs read techissues --region us-central1 --limit 100
```

### View Service Status
```bash
gcloud run services describe techissues --region us-central1
```

### List Revisions
```bash
gcloud run revisions list --service techissues --region us-central1
```

## Scaling Configuration

```bash
# Update scaling settings
gcloud run services update techissues \
  --min-instances 1 \
  --max-instances 100 \
  --memory 1Gi \
  --cpu 2 \
  --region us-central1
```

## Cost Optimization

1. **Use min-instances=0** for development (pay only when used)
2. **Set appropriate max-instances** to limit costs
3. **Use Cloud Run CPU allocation** settings properly
4. **Enable Cloud CDN** for static content

## Troubleshooting

### Build Fails

1. Check Docker build locally first:
```bash
docker build -t test-build .
docker run -p 8080:8080 test-build
```

2. View Cloud Build logs:
```bash
gcloud builds list --limit 5
gcloud builds log BUILD_ID
```

### Service Not Accessible

1. Check service status:
```bash
gcloud run services describe techissues --region us-central1
```

2. View error logs:
```bash
gcloud run logs read techissues --region us-central1 --limit 50
```

### Environment Variables Not Working

Verify environment variables are set:
```bash
gcloud run services describe techissues \
  --region us-central1 \
  --format="yaml(spec.template.spec.containers[0].env)"
```

## Rollback

```bash
# List revisions
gcloud run revisions list --service techissues --region us-central1

# Rollback to a previous revision
gcloud run services update-traffic techissues \
  --to-revisions REVISION_NAME=100 \
  --region us-central1
```

## Delete Deployment

```bash
# Delete the service
gcloud run services delete techissues --region us-central1

# Delete the container images
gcloud container images delete gcr.io/YOUR_PROJECT_ID/techissues --quiet
```

## Architecture Diagram

```
                    ┌─────────────────┐
                    │   GitHub Repo   │
                    └────────┬────────┘
                             │ push
                             ▼
                    ┌─────────────────┐
                    │  Cloud Build    │
                    │  (CI/CD)        │
                    └────────┬────────┘
                             │ build & push
                             ▼
                    ┌─────────────────┐
                    │ Container       │
                    │ Registry (GCR)  │
                    └────────┬────────┘
                             │ deploy
                             ▼
┌───────────────────────────────────────────────────┐
│                  Cloud Run                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Instance 1│  │Instance 2│  │Instance N│ (auto) │
│  └──────────┘  └──────────┘  └──────────┘        │
└───────────────────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │  (Database)     │
                    └─────────────────┘
```

## Support

For issues specific to this deployment:
1. Check the troubleshooting section above
2. Review Cloud Run documentation: https://cloud.google.com/run/docs
3. Check the application logs for errors
