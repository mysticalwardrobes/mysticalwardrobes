# Supabase Admin Setup - Quick Start (5 Minutes)

## 🚀 Quick Setup Steps

### 1. Create Supabase Project (2 minutes)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter details and click "Create new project"
4. Wait 2-3 minutes for initialization

### 2. Get API Credentials (30 seconds)

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon public: eyJhb...
service_role: eyJhb... (keep secret!)
```

### 3. Add Environment Variables (30 seconds)

Edit `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhb...your-service-role-key
```

### 4. Create Database Tables (1 minute)

1. In Supabase, go to **SQL Editor**
2. Click "New query"
3. Paste this SQL:

```sql
-- Analytics tables
CREATE TABLE analytics_page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analytics_gown_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gown_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Featured gowns config
CREATE TABLE config_featured_gowns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gown_ids TEXT[] NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable public insert for analytics
ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_gown_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON analytics_page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON analytics_gown_clicks FOR INSERT WITH CHECK (true);
```

4. Click "Run" or press Cmd/Ctrl + Enter

### 5. Create Admin User (1 minute)

**Easy Method - Using Supabase Dashboard:**

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Select "Create new user"
4. Enter:
   - **Email**: admin@mysticalwardrobes.com
   - **Password**: YourSecurePassword123
   - **Auto Confirm User**: ✅ CHECK THIS!
5. Click "Create user"

**Alternative - Using Script:**

```bash
npx ts-node scripts/create-admin-user.ts
```

### 6. Start Server & Login (30 seconds)

```bash
# Restart your dev server
npm run dev

# Open browser
http://localhost:3000/admin/login

# Login with your credentials
Email: admin@mysticalwardrobes.com
Password: YourSecurePassword123
```

## ✅ Done!

You should now be logged into the admin dashboard!

## 🎯 What You Can Do

- **Dashboard** (`/admin`) - Overview of traffic and stats
- **Featured Gowns** (`/admin/featured`) - Manage homepage featured gowns
- **Analytics** (`/admin/analytics`) - View detailed analytics
- **Cache** (`/admin/cache`) - Manage Redis cache

## 🐛 Common Issues

### "Invalid login credentials"

**Fix:**
1. Make sure user is created in Supabase
2. Check "Auto Confirm User" was enabled
3. Verify email and password are correct
4. Check environment variables are set
5. Restart dev server

### "Failed to fetch"

**Fix:**
1. Verify Supabase project is fully initialized (wait 2-3 min)
2. Check NEXT_PUBLIC_SUPABASE_URL in `.env.local`
3. Restart dev server after adding env vars

### Can't Access `/admin`

**Fix:**
1. Restart dev server
2. Clear browser cache and cookies
3. Try accessing `/admin/login` directly

## 📚 Full Documentation

See `SUPABASE_SETUP.md` for complete details including:
- Database schema
- Security policies
- Advanced configuration
- Analytics implementation
- Troubleshooting guide

---

**Need Help?** Check the full setup guide or Supabase documentation.

