# Vote for Our Next Collection - Setup Guide

## Overview

An interactive voting system that lets your customers vote on potential new collections. Admins create events with multiple collection concepts (with images), and users vote with their email.

## Features

### For Admins
- ✅ Create multiple voting events with name, description, and timeframe
- ✅ Only one event can be active at a time
- ✅ Add multiple voting options per event
- ✅ Upload multiple images per option (stored in Supabase)
- ✅ View real-time voting results
- ✅ Activate/deactivate events
- ✅ Manage options (add, edit, delete)

### For Users
- ✅ View active voting event on homepage
- ✅ Browse collection concepts with image galleries
- ✅ Read detailed descriptions
- ✅ Vote for favorite collection with email
- ✅ One vote per email (prevents duplicates)
- ✅ View results after voting
- ✅ Privacy-focused (emails are hashed)

## Quick Setup (5 Steps)

### Step 1: Set Up Supabase Database (2 minutes)

1. Go to your Supabase project → **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/create_voting_system.sql`
4. Click "Run" (or Cmd/Ctrl + Enter)
5. Verify success message

### Step 2: Create Storage Bucket (1 minute)

1. Go to **Storage** in Supabase
2. Click "Create a new bucket"
3. Bucket name: `voting-option-images`
4. **Public bucket**: ✅ (check this)
5. Click "Create bucket"

6. Set up bucket policies:
   - Go to bucket → Policies
   - Click "New policy"
   - Select "Allow public read access"
   - Save policy

### Step 3: Verify Environment Variables (30 seconds)

Ensure these are in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Step 4: Restart Dev Server (30 seconds)

```bash
npm run dev
```

### Step 5: Create Your First Voting Event (2 minutes)

1. Login to admin: http://localhost:3000/admin/login
2. Navigate to "Voting Events"
3. Click "Create New Event"
4. Fill in the form:
   - **Name**: "Vote for Our Spring 2025 Collection"
   - **Description**: "Help us decide our next collection theme!"
   - **Start Date**: Today
   - **End Date**: 7 days from now
   - **Activate immediately**: ✅

5. Click "Create Event"
6. Add voting options (collection concepts):
   - Click "Add Option"
   - Enter name (e.g., "Enchanted Garden")
   - Enter description
   - Upload images (optional)
   - Click "Create Option"

7. Repeat for 2-3 more options
8. Go to homepage to see the live voting event!

## Usage Guide

### Creating a Voting Event

1. **Go to Admin Dashboard**: http://localhost:3000/admin
2. **Navigate to Voting Events**: Click "Voting Events" in sidebar
3. **Create Event**: Click "+ Create New Event"
4. **Fill Details**:
   - Name: Short, catchy title
   - Description: Explain what users are voting for
   - Start Date: When voting opens
   - End Date: When voting closes
   - Activate: Check if you want it live immediately

5. **Add Options** (Collection Concepts):
   - After creating event, you'll see the event details page
   - Click "+ Add Option"
   - Enter option details:
     - Name: Collection name (e.g., "Celestial Dreams")
     - Description: What this collection is about
     - Images: Upload 1-5 images showing the concept
     - Display Order: Lower numbers appear first
   - Click "Create Option"
   - Repeat for each collection concept (recommended: 3-5 options)

6. **Activate Event**:
   - If not already active, click "Activate" on the event
   - This will automatically deactivate any other active event

### Managing Events

- **View All Events**: Admin → Voting Events
- **Edit Event**: Click "Manage" on an event → Edit details
- **Add/Remove Options**: Click "Manage" → "+ Add Option" or "Delete"
- **View Results**: Click "Manage" → "View Results"
- **Activate/Deactivate**: Click button on event card
- **Delete Event**: Click "Delete" (will also delete all options and votes)

### Understanding Event Status

- **Draft**: Event created but not activated
- **Active**: Event is live and accepting votes
- **Ended**: Event's end date has passed

### Viewing Results

**In Admin:**
- Go to event details
- Click "View Results"
- See vote counts, percentages, and winner

**For Users:**
- Users see results after they vote
- Public results page (coming soon)

## How Users Vote

1. User visits homepage
2. Sees active voting event
3. Browses collection options (with images)
4. Clicks "Vote for This Collection" on their choice
5. Modal opens asking for email
6. Enters email and clicks "Submit My Vote"
7. Sees thank you message and current results

**Duplicate Vote Prevention:**
- Email is hashed before storing (privacy)
- Database constraint prevents duplicate votes per event
- Clear error message if already voted

## Database Schema

### Tables

**voting_events**
- Stores event details (name, description, dates, status)
- Only one can be active at a time (enforced by trigger)

**voting_options**
- Stores collection concepts for each event
- Multiple images per option (array)
- Display order for sorting

**votes**
- Stores each vote (event + option + hashed email)
- Unique constraint on (event_id, voter_email_hash)
- Includes timestamp and optional IP/user-agent

### Storage

**Bucket: voting-option-images**
- Public read access
- Admin write access
- Max 5MB per image
- Organized: `{eventId}/{optionId}/image-{index}-{timestamp}.jpg`

## API Endpoints

### Admin Endpoints (Authenticated)

```bash
# Events
GET    /api/admin/voting/events              # List all events
POST   /api/admin/voting/events              # Create event
GET    /api/admin/voting/events/[id]         # Get event details
PUT    /api/admin/voting/events/[id]         # Update event
DELETE /api/admin/voting/events/[id]         # Delete event
POST   /api/admin/voting/events/[id]/activate # Activate event
DELETE /api/admin/voting/events/[id]/activate # Deactivate event

# Options
GET    /api/admin/voting/events/[id]/options               # List options
POST   /api/admin/voting/events/[id]/options               # Create option
PUT    /api/admin/voting/events/[id]/options/[optionId]    # Update option
DELETE /api/admin/voting/events/[id]/options/[optionId]    # Delete option

# Results
GET    /api/admin/voting/events/[id]/results  # Get results
```

### Public Endpoints

```bash
GET  /api/voting/active                # Get active event
POST /api/voting/vote                  # Submit vote
GET  /api/voting/results/[eventId]    # Get public results
```

## Troubleshooting

### Event Not Showing on Homepage

**Causes:**
- Event is not activated
- Event start date is in the future
- Event end date has passed

**Fix:**
1. Go to Admin → Voting Events
2. Check event status
3. Click "Activate" if needed
4. Verify dates are correct

### Cannot Upload Images

**Causes:**
- Storage bucket not created
- Incorrect bucket permissions
- File too large (>5MB)
- Wrong file type

**Fix:**
1. Create bucket in Supabase → Storage
2. Make bucket public
3. Check image is <5MB and JPG/PNG/WebP
4. Verify SUPABASE_SERVICE_ROLE_KEY is set

### "You have already voted" Error

**Expected behavior** - Each email can only vote once per event

**To vote again**: Use a different email address

### Duplicate Vote Prevention Not Working

**Fix:**
1. Verify database unique constraint exists
2. Check SQL migration ran successfully
3. Clear votes table if testing: `DELETE FROM votes WHERE event_id = 'xxx'`

## Best Practices

### Creating Effective Voting Events

1. **Clear Description**: Explain what users are voting for
2. **Reasonable Timeframe**: 7-14 days is typical
3. **Quality Images**: Use high-quality, representative images
4. **3-5 Options**: Not too many, not too few
5. **Descriptive Option Names**: Make them enticing

### Image Guidelines

- **Size**: Optimize images (recommended: 800x600px, <500KB)
- **Format**: JPG for photos, PNG for graphics
- **Content**: Show the collection concept clearly
- **Consistency**: Use similar dimensions for all options

### Managing Active Events

- Only activate one event at a time
- Monitor results regularly
- Announce winners after event ends
- Archive old events (don't delete - preserve data)

## Integration with Website

The voting event automatically appears on the homepage when active. No additional configuration needed!

**Display Logic:**
- Active event → Shows voting interface
- User voted → Shows results
- Event ended → Shows final results
- No active event → Section hidden

## Security & Privacy

✅ **Email Privacy**: Emails are SHA-256 hashed before storage
✅ **One Vote Per Email**: Database constraint enforces uniqueness
✅ **No Spam**: Rate limiting on vote submission
✅ **Secure Storage**: Images in Supabase with proper access control
✅ **RLS Policies**: Row-level security on all tables
✅ **Admin Only**: Event management requires authentication

## Future Enhancements

Potential additions:
- Email verification before voting
- Export results as CSV
- Email notifications to voters
- Social sharing buttons
- Anonymous voting option
- Multi-round voting
- Voting on multiple attributes

## Support

Common files to check:
- `supabase/migrations/create_voting_system.sql` - Database schema
- `lib/voting-utils.ts` - Helper functions
- `lib/supabase-storage.ts` - Image upload
- `components/voting/` - Public components
- `app/admin/voting/` - Admin pages

---

**Start creating engaging voting events for your customers! 🗳️✨**

