# Multi-stage build for production Next.js app
# Optimized for Google Cloud Run

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production=false

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy public folder (includes ads.txt and other static files)
COPY --from=builder /app/public ./public

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Cloud Run uses port 8080 by default
EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Note: Cloud Run handles health checks externally via /health endpoint
# Do NOT add HEALTHCHECK here - it can trigger false positives in abuse detection
# Cloud Run automatically checks that containers respond to HTTP requests

# Start the application - simple, single-process server
# No background workers, no long-running tasks
CMD ["node", "server.js"]


