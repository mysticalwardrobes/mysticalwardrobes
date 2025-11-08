# Supabase Authentication & Analytics Setup Guide

## Overview

The admin dashboard now uses **Supabase** for secure authentication and analytics storage, providing:

- 🔐 **Industry-standard authentication** with JWT tokens
- 👥 **User management** through Supabase dashboard
- 📊 **Analytics data storage** in PostgreSQL
- 🔒 **Row-level security** for data protection
- 🚀 **Scalable infrastructure** with auto-backups

## Prerequisites

1. Supabase account (free tier available at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Next.js application running

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in the details:
   - **Name**: Mystical Wardrobes
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for project to initialize

## Step 2: Get Your API Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

## Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhb...your-service-role-key

# Existing Redis Configuration
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

⚠️ **Important**: 
- `NEXT_PUBLIC_` variables are exposed to the browser (safe for anon key)
- `SUPABASE_SERVICE_ROLE_KEY` is server-only (never expose to browser!)

## Step 4: Set Up Database Tables

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **Database** → **SQL Editor**
2. Click "New query"
3. Paste the following SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Analytics: Page Views
CREATE TABLE IF NOT EXISTS analytics_page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT
);

-- Analytics: Gown Clicks
CREATE TABLE IF NOT EXISTS analytics_gown_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gown_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT
);

-- Configuration: Featured Gowns
CREATE TABLE IF NOT EXISTS config_featured_gowns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gown_ids TEXT[] NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_path ON analytics_page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON analytics_page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gown_clicks_gown ON analytics_gown_clicks(gown_id);
CREATE INDEX IF NOT EXISTS idx_gown_clicks_created ON analytics_gown_clicks(created_at DESC);

-- Enable Row Level Security
ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_gown_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE config_featured_gowns ENABLE ROW LEVEL SECURITY;

-- Allow public insert for analytics (tracking events)
CREATE POLICY "Allow public insert for page views" 
  ON analytics_page_views FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow public insert for gown clicks" 
  ON analytics_gown_clicks FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow authenticated users (admins) to read analytics
CREATE POLICY "Allow authenticated read for page views" 
  ON analytics_page_views FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated read for gown clicks" 
  ON analytics_gown_clicks FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to manage featured gowns config
CREATE POLICY "Allow authenticated read for config" 
  ON config_featured_gowns FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated write for config" 
  ON config_featured_gowns FOR ALL 
  TO authenticated 
  USING (true)
  WITH CHECK (true);
```

4. Click "Run" (or press Cmd/Ctrl + Enter)
5. Verify success: You should see "Success. No rows returned"

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

## Step 5: Create Your Admin User

### Method 1: Using the Script (Recommended)

```bash
# Make sure you have ts-node installed
npm install -g ts-node

# Run the admin user creation script
npx ts-node scripts/create-admin-user.ts
```

Follow the prompts to enter your admin email and password.

### Method 2: Using Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: your-admin@email.com
   - **Password**: your-secure-password
   - **Auto Confirm User**: ✅ (check this!)
4. Click "Create user"

### Method 3: Using SQL (Advanced)

```sql
-- In Supabase SQL Editor
SELECT auth.create_user(
  'your-admin@email.com'::text,
  'your-secure-password'::text,
  true  -- auto-confirm
);
```

## Step 6: Test the Login

1. **Restart your dev server:**
```bash
npm run dev
```

2. **Navigate to admin login:**
```
http://localhost:3000/admin/login
```

3. **Login with your credentials:**
- Email: your-admin@email.com
- Password: your-secure-password

4. **If successful**, you'll be redirected to the admin dashboard!

## Troubleshooting

### "Invalid login credentials" Error

**Possible causes:**
1. User not created in Supabase
2. User email not confirmed
3. Wrong password
4. Environment variables not set correctly

**Solutions:**
- Check Supabase Dashboard → Authentication → Users
- Verify user exists and email is confirmed
- Try creating user again with auto-confirm enabled
- Restart dev server after adding env vars

### "Failed to fetch" Error

**Possible causes:**
1. Supabase URL or keys incorrect
2. Network/CORS issues
3. Supabase project not ready

**Solutions:**
- Double-check env variables match Supabase dashboard
- Wait for project to fully initialize (2-3 min after creation)
- Check browser console for detailed errors

### Tables Not Created

**Solutions:**
- Run the SQL script again in Supabase SQL Editor
- Check for error messages in SQL Editor
- Verify you have permission to create tables

### Session Not Persisting

**Solutions:**
- Clear browser cookies
- Check middleware is running (should see logs in terminal)
- Verify cookies are being set (check browser DevTools → Application → Cookies)

## Security Best Practices

### ✅ DO:
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret (never commit to git)
- Use strong, unique admin passwords (12+ characters)
- Enable email verification in production
- Use Row Level Security (RLS) policies
- Monitor authentication logs in Supabase dashboard

### ❌ DON'T:
- Share service role key publicly
- Use weak passwords
- Disable RLS in production
- Hardcode credentials in code

## Features

### Authentication
- ✅ Secure JWT-based authentication
- ✅ Automatic token refresh
- ✅ HTTP-only cookies for security
- ✅ Session persistence
- ✅ Automatic logout on token expiry

### User Management
- ✅ Create users via dashboard or API
- ✅ Reset passwords
- ✅ View user activity logs
- ✅ Disable/enable users

### Analytics (Future Implementation)
- 📊 Store page views in PostgreSQL
- 📊 Track gown clicks
- 📊 Query analytics with SQL
- 📊 Export data as CSV

## Migrating from Old Auth System

The old JWT/bcrypt system has been replaced. No migration needed for new setups, but if you had existing users:

1. Users will need to re-login with Supabase credentials
2. Old JWT tokens will no longer work
3. No data loss - Redis cache and configurations remain intact

## Next Steps

1. ✅ Create admin user
2. ✅ Test login functionality
3. 🔄 (Optional) Implement Supabase analytics tracking
4. 🔄 (Optional) Add more admin users
5. 🔄 (Optional) Set up email templates in Supabase

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Auth Guide**: https://supabase.com/docs/guides/auth
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Community**: https://github.com/supabase/supabase/discussions

---

**Your admin dashboard is now secured with Supabase! 🎉**

