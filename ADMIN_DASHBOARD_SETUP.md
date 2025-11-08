# Admin Dashboard Setup Guide

## Overview

The admin dashboard provides a comprehensive interface for managing your Mystical Wardrobes website, including:

- **Featured Gowns Management**: Search and select gowns to display on the homepage
- **Analytics Dashboard**: Track page views, gown clicks, and popular content
- **Cache Management**: Monitor and refresh Redis cache
- **Authentication**: Secure email/password login

## Prerequisites

- Upstash Redis account and credentials
- Node.js and npm installed
- Next.js application running

## Installation

The required dependencies have already been installed:
- `bcryptjs` - Password hashing
- `jsonwebtoken` & `jose` - JWT authentication
- `@dnd-kit/*` - Drag and drop functionality
- `recharts` - Analytics charts

## Setup Steps

### 1. Generate Admin Credentials

Run the password generation script:

```bash
node scripts/generate-admin-password.js your-secure-password
```

This will output environment variables you need to add to `.env.local`.

### 2. Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Admin Authentication
ADMIN_EMAIL=admin@mysticalwardrobes.com
ADMIN_PASSWORD_HASH=<generated_hash_from_step_1>
JWT_SECRET=<generated_secret_from_step_1>

# Existing Redis Configuration
UPSTASH_REDIS_REST_URL=<your_upstash_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_token>
```

### 3. Initialize Featured Gowns in Redis (Optional)

By default, the system falls back to the static configuration in `app/config/featured.ts` if Redis is empty. To initialize Redis with the current featured gowns:

1. Navigate to `/admin` and login
2. Go to "Featured Gowns"
3. The current static list will be displayed
4. Click "Save Changes" to persist them to Redis

Alternatively, you can initialize via API:

```bash
curl -X PUT http://localhost:3000/api/admin/config/featured \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_TOKEN" \
  -d '{"gownIds": ["id1", "id2", "id3"]}'
```

## Features

### 1. Dashboard Homepage (`/admin`)

- Overview cards showing today's views, total views, and cache status
- Top 5 most clicked gowns
- Top 5 most viewed pages
- Quick action links to other admin pages

### 2. Featured Gowns Management (`/admin/featured`)

**Features:**
- View current featured gown IDs
- Search for gowns by name
- Visual thumbnails of gowns in search results
- Add/remove gowns from featured list
- Save changes to Redis

**Usage:**
1. Search for a gown by name
2. Click "Add" next to the gown you want to feature
3. Remove gowns by clicking "Remove"
4. Click "Save Changes" to persist

### 3. Analytics Dashboard (`/admin/analytics`)

**Metrics Tracked:**
- Total page views
- Daily page view trends
- Most clicked gowns
- Most viewed pages

**Features:**
- View data for last 7, 14, or 30 days
- Visual bar charts for trends
- Sortable tables for popular content

**How Analytics Work:**
- Automatic page view tracking (via middleware)
- Gown click tracking (when implemented in frontend)
- Data stored in Redis with time-series structure

### 4. Cache Management (`/admin/cache`)

**Features:**
- View cache status for all content types (Gowns, Reviews, PromQueens, Addons)
- See TTL (time to live) and expiration time
- Refresh all caches manually
- Clear individual cache keys

**Cache Structure:**
- **Local Cache**: 5 minutes (fast access)
- **Redis Cache**: 24 hours (persistent)
- **Auto-refresh**: Fetches from Contentful when empty

## API Endpoints

### Authentication

```bash
# Login
POST /api/auth/login
Body: { "email": "admin@example.com", "password": "password" }

# Logout
POST /api/auth/logout

# Check Session
GET /api/auth/session
```

### Featured Gowns Configuration

```bash
# Get featured gown IDs (public)
GET /api/config/featured

# Update featured gowns (authenticated)
PUT /api/admin/config/featured
Body: { "gownIds": ["id1", "id2", "id3"] }
```

### Analytics

```bash
# Track event (public)
POST /api/analytics/track
Body: { "type": "page_view", "data": { "path": "/collections/all" } }
Body: { "type": "gown_click", "data": { "gownId": "abc123" } }

# Get analytics stats (authenticated)
GET /api/analytics/stats?days=7
```

### Cache Management

```bash
# Get cache status (authenticated)
GET /api/admin/cache

# Refresh cache (authenticated)
POST /api/admin/cache

# Clear cache keys (authenticated)
DELETE /api/admin/cache
Body: { "keys": ["mysticalwardrobes:gowns"] }
```

## Security Features

✅ **JWT Authentication**: Secure token-based authentication
✅ **HTTP-Only Cookies**: Prevents XSS attacks
✅ **Protected Routes**: Middleware blocks unauthorized access
✅ **Password Hashing**: Bcrypt with salt rounds
✅ **24-hour Token Expiry**: Auto-logout for security

## Analytics Integration

To enable full analytics tracking, add the `useAnalytics` hook to your frontend pages:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

export default function MyPage() {
  const { trackGownClick } = useAnalytics(); // Auto-tracks page views

  const handleGownClick = (gownId: string) => {
    trackGownClick(gownId);
    // ... navigate to gown page
  };

  return <div>...</div>;
}
```

The hook automatically tracks:
- Page views (on mount)
- Custom events (via `trackEvent`)

## Troubleshooting

### Cannot Login

- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` are set correctly
- Ensure `JWT_SECRET` is set
- Check browser console for errors
- Verify password was hashed correctly

### Featured Gowns Not Updating

- Check Redis connection (verify UPSTASH credentials)
- Ensure you clicked "Save Changes"
- Check browser network tab for API errors
- Verify authentication token is valid

### Analytics Not Showing Data

- Analytics only track after implementation is complete
- Ensure `useAnalytics` hook is added to pages
- Check Redis for analytics keys: `redis-cli --scan --pattern "analytics:*"`
- Verify middleware is running (check for page view logs)

### Cache Not Refreshing

- Verify Contentful credentials are correct
- Check Redis connection
- Look for errors in server logs
- Ensure cache keys exist in Redis

## Development Tips

1. **Test Authentication**: Use Postman or cURL to test API endpoints
2. **Monitor Redis**: Use Redis CLI or Upstash dashboard to view data
3. **Check Logs**: Server logs show cache hits/misses and errors
4. **Clear Browser Cache**: Sometimes needed after login changes

## Production Deployment

Before deploying to production:

1. ✅ Generate a strong admin password
2. ✅ Use a secure, random JWT_SECRET (32+ characters)
3. ✅ Enable HTTPS (required for secure cookies)
4. ✅ Set NODE_ENV=production
5. ✅ Configure Upstash Redis for production
6. ✅ Test all admin features in staging first
7. ✅ Set up monitoring and error logging

## File Structure

```
app/
├── admin/
│   ├── page.tsx                    # Dashboard homepage
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── featured/
│   │   └── page.tsx                # Featured gowns manager
│   ├── analytics/
│   │   └── page.tsx                # Analytics dashboard
│   └── cache/
│       └── page.tsx                # Cache management
├── api/
│   ├── auth/
│   │   ├── login/route.ts          # Login endpoint
│   │   ├── logout/route.ts         # Logout endpoint
│   │   └── session/route.ts        # Session check
│   ├── admin/
│   │   ├── config/featured/route.ts # Featured config API
│   │   └── cache/route.ts          # Cache management API
│   ├── analytics/
│   │   ├── track/route.ts          # Event tracking
│   │   └── stats/route.ts          # Stats retrieval
│   └── config/featured/route.ts    # Public featured config
components/admin/
└── AdminLayout.tsx                 # Admin layout wrapper
lib/
├── auth.ts                         # Auth utilities
└── redis-config.ts                 # Redis helpers
hooks/
└── useAnalytics.ts                 # Analytics hook
middleware.ts                       # Route protection
```

## Support

For issues or questions:
1. Check this documentation
2. Review server logs for errors
3. Verify environment variables are set
4. Test API endpoints individually
5. Check Redis data directly

## Future Enhancements

Potential features to add:
- [ ] Role-based access control (multiple admin users)
- [ ] Email notifications for low traffic
- [ ] Export analytics to CSV
- [ ] Bulk gown operations
- [ ] Image upload for collections
- [ ] Content scheduling
- [ ] A/B testing for featured gowns

