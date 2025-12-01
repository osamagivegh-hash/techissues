# 🚀 Google Cloud Deployment Guide

## Prerequisites

1. **Google Cloud Project**
   - Create a project at [console.cloud.google.com](https://console.cloud.google.com)
   - Note your PROJECT_ID

2. **Install Google Cloud CLI**
   - Download from [cloud.google.com/sdk](https://cloud.google.com/sdk)
   - Login: `gcloud auth login`
   - Set project: `gcloud config set project YOUR_PROJECT_ID`

3. **Enable Required APIs**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

## Deployment Methods

### Method 1: Cloud Run (Recommended) - Automated with Cloud Build

#### Step 1: Set Environment Variables in Google Cloud

```bash
# Set your MongoDB Atlas connection string
gcloud run services update techissues \
  --update-env-vars MONGODB_URI="your-mongodb-atlas-uri" \
  --update-env-vars JWT_SECRET="your-secret-key" \
  --update-env-vars NEXT_PUBLIC_SITE_URL="https://your-domain.com" \
  --region=us-central1
```

#### Step 2: Deploy using Cloud Build

```bash
# Submit build
gcloud builds submit --config cloudbuild.yaml

# Or connect to GitHub for automatic deployments
gcloud builds triggers create github \
  --repo-name=techissues \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

### Method 2: Manual Cloud Run Deployment

#### Step 1: Build Docker Image

```bash
# Build locally
docker build -t gcr.io/YOUR_PROJECT_ID/techissues .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/techissues
```

#### Step 2: Deploy to Cloud Run

```bash
gcloud run deploy techissues \
  --image gcr.io/YOUR_PROJECT_ID/techissues \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="your-mongodb-uri" \
  --set-env-vars JWT_SECRET="your-jwt-secret" \
  --set-env-vars NEXT_PUBLIC_SITE_URL="https://your-domain.com" \
  --memory 512Mi \
  --timeout 60
```

### Method 3: Using Console (Web Interface)

1. **Build Image**:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/techissues .
   docker push gcr.io/YOUR_PROJECT_ID/techissues
   ```

2. **Go to Cloud Run Console**:
   - Visit [console.cloud.google.com/run](https://console.cloud.google.com/run)
   - Click "CREATE SERVICE"
   - Select your container image
   - Set environment variables
   - Click "CREATE"

## Environment Variables

Set these in Cloud Run:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techissues?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
NEXT_PUBLIC_SITE_URL=https://your-app-url.run.app
```

## Custom Domain Setup

### Step 1: Map Custom Domain

```bash
gcloud run services update techissues \
  --platform managed \
  --region us-central1

gcloud beta run domain-mappings create \
  --service techissues \
  --domain your-domain.com \
  --region us-central1
```

### Step 2: Update DNS

Add the DNS records shown in the output to your domain registrar.

## MongoDB Atlas Network Access

⚠️ **Important**: Update MongoDB Atlas to allow Cloud Run IP addresses:

1. Go to MongoDB Atlas → Network Access
2. Add IP Address
3. Choose: **Allow Access from Anywhere** (0.0.0.0/0)
   - Or use Cloud NAT for static IP

## Monitoring & Logs

### View Logs
```bash
gcloud run services logs read techissues --region=us-central1
```

### View in Console
- Visit [console.cloud.google.com/logs](https://console.cloud.google.com/logs)

## Cost Optimization

Cloud Run pricing:
- **First 2 million requests/month**: FREE
- **180,000 vCPU-seconds**: FREE
- **360,000 memory-seconds**: FREE

Tips:
- Set minimum instances to 0 (scales to zero when not in use)
- Use 512Mi memory (sufficient for Next.js)
- Set max instances based on expected traffic

## Scaling Configuration

```bash
gcloud run services update techissues \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --cpu=1 \
  --memory=512Mi \
  --region=us-central1
```

## Troubleshooting

### Build Fails
```bash
# Check build logs
gcloud builds list
gcloud builds log BUILD_ID
```

### Service Not Accessible
```bash
# Check service status
gcloud run services describe techissues --region=us-central1

# Check if service is public
gcloud run services get-iam-policy techissues --region=us-central1
```

### Database Connection Issues
- Verify MONGODB_URI is correct
- Check MongoDB Atlas Network Access
- View logs: `gcloud run services logs read techissues`

## Quick Deploy Commands

```bash
# 1. Set your project
gcloud config set project YOUR_PROJECT_ID

# 2. Build and deploy
gcloud builds submit --config cloudbuild.yaml

# 3. Set environment variables
gcloud run services update techissues \
  --update-env-vars MONGODB_URI="..." \
  --update-env-vars JWT_SECRET="..." \
  --update-env-vars NEXT_PUBLIC_SITE_URL="..." \
  --region=us-central1
```

## Continuous Deployment

### Connect to GitHub

1. Go to [console.cloud.google.com/cloud-build/triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Click "CONNECT REPOSITORY"
3. Select GitHub
4. Choose your repository
5. Create trigger:
   - Name: deploy-techissues
   - Event: Push to branch
   - Branch: ^main$
   - Configuration: Cloud Build configuration file
   - Location: /cloudbuild.yaml

Now every push to `main` will automatically deploy!

## After Deployment

1. **Run Seed Script** (first time only):
   ```bash
   # SSH into Cloud Run (not directly possible)
   # Use Cloud Shell or local with production MongoDB URI
   MONGODB_URI="your-production-uri" npm run seed
   ```

2. **Test Your Site**:
   - Visit your Cloud Run URL
   - Test both languages: `/ar` and `/en`
   - Try admin login: `/admin/login`

3. **Monitor Performance**:
   - Cloud Run Dashboard
   - Set up alerts for errors

## Security Checklist

- ✅ Change JWT_SECRET for production
- ✅ Use strong admin password
- ✅ Enable HTTPS (automatic with Cloud Run)
- ✅ Restrict MongoDB Network Access
- ✅ Set up Cloud Armor (optional, for DDoS protection)

## Support

For issues:
- Check logs: `gcloud run services logs read techissues`
- Cloud Run docs: [cloud.google.com/run/docs](https://cloud.google.com/run/docs)
- MongoDB Atlas docs: [docs.mongodb.com](https://docs.mongodb.com)

---

## 🎉 Your site is now live on Google Cloud!

Access it at: `https://techissues-XXXX-XX.run.app`

(Replace with your actual Cloud Run URL)
