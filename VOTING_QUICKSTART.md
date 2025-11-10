# Vote Collection System - Quick Start (5 Minutes)

## 🚀 Setup in 5 Steps

### 1. Run SQL Migration (1 minute)

1. Go to Supabase → **SQL Editor**
2. Click "New query"
3. Copy contents from `supabase/migrations/create_voting_system.sql`
4. Paste and click "Run"
5. ✅ Success!

### 2. Create Storage Bucket (1 minute)

1. Go to Supabase → **Storage**
2. Click "Create a new bucket"
3. Name: `voting-option-images`
4. ✅ Check "Public bucket"
5. Click "Create bucket"

### 3. Set Bucket Policy (30 seconds)

In the bucket settings:
1. Go to "Policies" tab
2. Click "New policy"
3. Select "Allow public read access"
4. Save

### 4. Restart Server (30 seconds)

```bash
npm run dev
```

### 5. Create Test Event (2 minutes)

1. Login: http://localhost:3000/admin/login
2. Go to "Voting Events" → "Create New Event"
3. Fill in:
   - **Name**: Spring 2025 Collection Vote
   - **Description**: Choose our next collection theme!
   - **Start**: Today
   - **End**: 7 days from now
   - ✅ **Activate immediately**

4. Click "Create Event"
5. Add 3 options:
   - Option 1: "Enchanted Garden" (upload image)
   - Option 2: "Celestial Dreams" (upload image)
   - Option 3: "Ocean Breeze" (upload image)

6. Visit homepage → See voting event live! 🎉

## ✅ Test the Flow

**As Admin:**
1. Create event ✓
2. Add options with images ✓
3. Activate event ✓
4. View results ✓

**As User:**
1. Visit homepage
2. See voting event
3. Click "Vote" on an option
4. Enter email
5. Submit vote
6. See results

## 🐛 Quick Troubleshooting

**Event not showing on homepage?**
→ Make sure event is activated and dates are current

**Can't upload images?**
→ Create storage bucket `voting-option-images` (public)

**Already voted error?**
→ Each email can only vote once (this is correct!)

**Images not displaying?**
→ Check bucket is public and RLS policies allow read

## 📚 Full Documentation

See `VOTING_SYSTEM_SETUP.md` for complete guide.

## 🎯 You're Ready!

The voting system is now live. Create your first event and engage your customers! 🗳️✨

