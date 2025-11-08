# Admin Dashboard Quick Start

## 🚀 Get Started in 3 Minutes

### Step 1: Generate Admin Credentials (30 seconds)

```bash
node scripts/generate-admin-password.js MySecurePassword123
```

Copy the output and add to `.env.local`:

```bash
ADMIN_EMAIL=admin@mysticalwardrobes.com
ADMIN_PASSWORD_HASH=<paste_from_output>
JWT_SECRET=<paste_from_output>
```

### Step 2: Start the Development Server (10 seconds)

```bash
npm run dev
```

### Step 3: Login to Admin Dashboard (30 seconds)

1. Open browser: http://localhost:3000/admin
2. Login with:
   - Email: `admin@mysticalwardrobes.com`
   - Password: `MySecurePassword123` (or your chosen password)

## ✨ What You Can Do

### Manage Featured Gowns
1. Go to `/admin/featured`
2. Search for gowns by name
3. Click "Add" to feature them
4. Drag to reorder (coming soon)
5. Click "Save Changes"

### View Analytics
1. Go to `/admin/analytics`
2. See page views, top gowns, top pages
3. Change date range (7/14/30 days)

### Manage Cache
1. Go to `/admin/cache`
2. View cache status and TTL
3. Refresh or clear caches

## 📊 How It Works

```
Frontend Pages
    ↓ (automatic tracking)
Analytics API
    ↓
Redis Storage
    ↓
Admin Dashboard
```

**Featured Gowns Flow:**
```
Admin Updates → Redis → Homepage API → Rendered to Users
```

**Analytics Flow:**
```
User Activity → Track API → Redis → Admin Dashboard
```

## 🔐 Security

- ✅ JWT tokens with 24h expiry
- ✅ HTTP-only cookies
- ✅ Middleware route protection
- ✅ Bcrypt password hashing
- ✅ Admin-only endpoints

## 📝 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | No | Login |
| `/api/auth/logout` | POST | Yes | Logout |
| `/api/admin/config/featured` | GET/PUT | Yes | Manage featured gowns |
| `/api/admin/cache` | GET/POST/DELETE | Yes | Cache management |
| `/api/analytics/stats` | GET | Yes | Get analytics |
| `/api/analytics/track` | POST | No | Track events |
| `/api/config/featured` | GET | No | Public featured gowns |

## 🐛 Troubleshooting

**Can't login?**
- Check `.env.local` has all 3 variables
- Restart dev server after adding env vars
- Clear browser cookies

**Featured gowns not saving?**
- Check Redis credentials in `.env.local`
- Look for errors in terminal

**No analytics data?**
- Analytics starts tracking after first implementation
- Check Redis connection

## 🎯 Next Steps

1. **Initialize Featured Gowns**: Save current config to Redis
2. **Test Analytics**: Browse the site and check `/admin/analytics`
3. **Monitor Cache**: Check `/admin/cache` for status
4. **Customize**: Change admin email/password for production

## 📖 Full Documentation

See `ADMIN_DASHBOARD_SETUP.md` for complete details.

## 🔗 Quick Links

- Dashboard: http://localhost:3000/admin
- Featured: http://localhost:3000/admin/featured
- Analytics: http://localhost:3000/admin/analytics
- Cache: http://localhost:3000/admin/cache
- Login: http://localhost:3000/admin/login

---

**Happy Managing! 🎉**

