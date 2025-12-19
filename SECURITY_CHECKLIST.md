# 🔒 Security Deployment Checklist for Techissues

This document provides a comprehensive security checklist for deploying the Techissues Next.js application.

## Pre-Deployment Checklist

### ✅ Environment Variables (CRITICAL)

- [ ] `JWT_SECRET` is set to a strong, unique value (minimum 32 characters)
- [ ] `JWT_SECRET` is NOT one of: `your-super-secret-jwt-key`, `secret`, `changeme`
- [ ] `MONGODB_URI` points to production database with authentication
- [ ] No `.env.local` or `.env` files are deployed to production
- [ ] All secrets are stored in environment variables, not in code

### ✅ Dependencies

- [ ] Run `npm audit` - no critical or high vulnerabilities
- [ ] Next.js is version 15.3.3 or later (CVE patches)
- [ ] React is version 19.1.0 or later
- [ ] All dependencies are from trusted sources
- [ ] Run `npm outdated` and update regularly

### ✅ Security Headers

The following headers are automatically set by `next.config.js`:
- [x] `Strict-Transport-Security` (HSTS)
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: DENY`
- [x] `X-XSS-Protection: 1; mode=block`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy` (camera, microphone, geolocation disabled)

### ✅ Authentication

- [x] Passwords are hashed with bcrypt (12 rounds)
- [x] JWT tokens use HS256 algorithm explicitly
- [x] Cookies are `httpOnly` and `secure`
- [x] `sameSite: strict` for CSRF protection
- [x] Token verification validates structure
- [x] No sensitive data logged

### ✅ Input Validation

- [x] Zod schemas validate all API inputs
- [x] Email is normalized and sanitized
- [x] Password length limits enforced
- [x] MongoDB ObjectId format validated
- [x] Request body size limits enforced

### ✅ XSS Protection

- [x] HTML content is sanitized before rendering
- [x] `dangerouslySetInnerHTML` uses `sanitizeHtml()`
- [x] External links have `rel="noopener noreferrer"`
- [x] JavaScript URLs blocked in content

### ✅ Rate Limiting

- [x] Login: 10 attempts per 15 minutes
- [x] API: 60 requests per minute
- [x] Pages: 200 requests per minute
- [x] 429 responses with `Retry-After` header

### ✅ RSC/Server Actions

- [x] RSC payloads validated in middleware
- [x] Body size limits on RSC requests (1MB max)
- [x] Suspicious action IDs blocked
- [x] No Server Actions with hardcoded secrets

## Platform-Specific Deployment

### AWS EC2 (Current Setup)

```bash
# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Set environment variables in PM2 ecosystem
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'techiss-frontend',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      JWT_SECRET: 'YOUR_STRONG_SECRET_HERE_MIN_32_CHARS',
      MONGODB_URI: 'mongodb+srv://...',
    }
  }]
}
EOF

# 3. Nginx security headers (add to server block)
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# 4. Enable firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# 5. SSL certificate (Certbot)
sudo certbot --nginx -d techiss.store -d www.techiss.store
```

### Vercel

```bash
# Environment variables in Vercel Dashboard:
# - JWT_SECRET: <generate with: openssl rand -hex 32>
# - MONGODB_URI: <your production MongoDB URI>
# - NODE_ENV: production

# vercel.json for headers
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

### Docker

```dockerfile
# Dockerfile security improvements
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Post-Deployment Verification

Run these commands after deployment:

```bash
# 1. Test security headers
curl -I https://techiss.store | grep -E "(X-Frame|X-Content|Strict-Transport|X-XSS)"

# 2. Test rate limiting
for i in {1..15}; do curl -s -o /dev/null -w "%{http_code}\n" https://techiss.store/api/auth/login -X POST; done
# Should see 429 after 10 requests

# 3. Test body size limits
dd if=/dev/zero bs=3M count=1 | curl -X POST -d @- https://techiss.store/api/posts
# Should return 413

# 4. Verify no source maps
curl https://techiss.store/_next/static/chunks/*.map
# Should return 404

# 5. Test XSS protection
# Try creating a post with <script>alert('xss')</script> - should be sanitized
```

## Incident Response

If a security incident occurs:

1. **Immediate**: Rotate `JWT_SECRET` to invalidate all sessions
2. **Immediate**: Change MongoDB credentials if database compromised
3. **Within 1 hour**: Review access logs for unauthorized access
4. **Within 24 hours**: Full security audit of affected systems
5. **Document**: Record incident details and remediation steps

## Maintenance Schedule

- **Weekly**: Run `npm audit` and update dependencies
- **Monthly**: Review access logs and rate limit effectiveness
- **Quarterly**: Full security review and penetration testing
- **Yearly**: Rotate all secrets and certificates

## Generating Secure Secrets

```bash
# Generate JWT_SECRET
openssl rand -hex 32

# Generate MongoDB password
openssl rand -base64 24

# Generate API key
openssl rand -hex 16
```

---

**Security Contact**: security@techiss.store
**Last Updated**: December 2025
**Version**: 1.0.1
