# Admin Panel - Complete CRUD Management

## New Features Added

### 1. **Rooms Manager** (`/admin/rooms`)
Manage all your accommodation offerings with full CRUD operations.

**Features:**
- ✅ Add/Edit/Delete rooms
- ✅ Upload room images from library
- ✅ Set room details (title, description, size, guests, bed type)
- ✅ Set display order
- ✅ Publish/Draft status
- ✅ Beautiful grid layout with image previews

**Fields:**
- Title (e.g., "Cave Suite")
- Description
- Size (e.g., "50 m²")
- Guests (e.g., "2 Guests")
- Bed (e.g., "1 Large Double Bed")
- Featured Image
- Display Order
- Published Status

### 2. **Activities Manager** (`/admin/activities`)
Manage activities and experiences you offer to guests.

**Features:**
- ✅ Add/Edit/Delete activities
- ✅ Upload activity images
- ✅ Rich descriptions
- ✅ Display ordering
- ✅ Publish/Draft management

**Fields:**
- Title (e.g., "Guided Nature Walks")
- Description
- Featured Image
- Display Order
- Published Status

### 3. **Testimonials Manager** (`/admin/testimonials`)
Manage guest reviews and testimonials.

**Features:**
- ✅ Add/Edit/Delete testimonials
- ✅ Star rating system (1-5)
- ✅ Source tracking (booking platform)
- ✅ Display ordering
- ✅ Publish/Draft control

**Fields:**
- Quote/Review Text
- Author Name
- Source (e.g., "Booking.com", "TripAdvisor")
- Rating (1-5 stars)
- Display Order
- Published Status

### 4. **Team Manager** (`/admin/team`)
Showcase the people behind Toroland Munnar.

**Features:**
- ✅ Add/Edit/Delete team members
- ✅ Upload team photos
- ✅ Role/position display
- ✅ Bio/description
- ✅ Display ordering

**Fields:**
- Full Name
- Role/Position (e.g., "General Manager")
- Bio/Description
- Photo
- Display Order
- Published Status

### 5. **Hero Settings - Video Upload** (`/admin/hero`)
Enhanced with video upload capability.

**New Features:**
- ✅ Direct video upload to Cloudinary
- ✅ Drag & drop video upload
- ✅ Upload progress indicator
- ✅ Video preview
- ✅ Supports MP4, MOV, AVI, WEBM (max 100MB)
- ✅ Automatic URL setting after upload

## Database Tables

All new tables are included in `ADMIN_DATABASE_EXTENDED.sql`:

### Rooms Table
```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  size TEXT NOT NULL,
  guests TEXT NOT NULL,
  bed TEXT NOT NULL,
  image TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Activities Table
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Testimonials Table
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  source TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Team Members Table
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Setup Instructions

### 1. Database Setup

Run the extended SQL schema:
```bash
# Copy contents of ADMIN_DATABASE_EXTENDED.sql
# Paste into Supabase SQL Editor
# Execute
```

This will create:
- All 4 new tables
- Row Level Security policies
- Indexes for performance
- Update triggers

### 2. Update Environment Variables

Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### 3. Install Dependencies

All required dependencies are already in package.json:
```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Usage Guide

### Managing Rooms

1. Navigate to `/admin/rooms`
2. Click "Add Room" button
3. Fill in room details
4. Click "Select Image" to choose from uploaded images
5. Set display order (lower numbers appear first)
6. Toggle "Published/Draft" status
7. Click "Create Room"

**Editing:** Click "Edit" button on any room card
**Deleting:** Click "Delete" button (requires confirmation)

### Managing Activities

1. Navigate to `/admin/activities`
2. Click "Add Activity"
3. Enter activity title and description
4. Select featured image
5. Set display order
6. Click "Create Activity"

### Managing Testimonials

1. Navigate to `/admin/testimonials`
2. Click "Add Testimonial"
3. Enter testimonial quote
4. Add author name and source
5. Select star rating (1-5)
6. Click "Create Testimonial"

### Managing Team Members

1. Navigate to `/admin/team`
2. Click "Add Team Member"
3. Enter name, role, and bio
4. Select team member photo
5. Set display order
6. Click "Create Team Member"

### Uploading Videos for Hero Section

1. Navigate to `/admin/hero`
2. Select "Video Background" type
3. Either:
   - Enter video URL manually, OR
   - Drag & drop video file to upload area
   - Wait for upload to complete (progress bar shown)
4. Video URL will be automatically set
5. Preview video in the player
6. Click "Save Settings"

## Image Library

All managers use the centralized image library:
- Upload images once in `/admin/images`
- Select from library in any manager
- No duplicate uploads needed
- Consistent image management

## Display Order

All content types support `display_order`:
- Lower numbers appear first
- Default is 0
- Use negative numbers if needed
- Allows precise ordering control

## Published vs Draft

All content has publish status:
- **Published**: Visible on public site
- **Draft**: Hidden from public, visible in admin

## Frontend Integration

### Using the Data

To display this content on your frontend pages, use the Supabase helpers:

```javascript
import { supabaseHelpers } from './config/supabase';

// Get published rooms
const rooms = await supabaseHelpers.getRooms();
const publishedRooms = rooms.filter(r => r.is_published);

// Get published activities
const activities = await supabaseHelpers.getActivities();
const publishedActivities = activities.filter(a => a.is_published);

// Get published testimonials
const testimonials = await supabaseHelpers.getTestimonials();
const publishedTestimonials = testimonials.filter(t => t.is_published);

// Get published team members
const team = await supabaseHelpers.getTeamMembers();
const publishedTeam = team.filter(m => m.is_published);
```

### Example: Updating Rooms Component

```javascript
// In src/components/home/Rooms.jsx
import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const data = await supabaseHelpers.getRooms();
    setRooms(data.filter(r => r.is_published));
  };

  return (
    <section>
      {rooms.map(room => (
        <div key={room.id}>
          <img src={room.image} alt={room.title} />
          <h3>{room.title}</h3>
          <p>{room.description}</p>
          <div>
            <span>{room.size}</span>
            <span>{room.guests}</span>
            <span>{room.bed}</span>
          </div>
        </div>
      ))}
    </section>
  );
};
```

## API Reference

### Supabase Helper Functions

All CRUD operations are available in `src/config/supabase.js`:

**Rooms:**
- `getRooms()` - Get all rooms
- `createRoom(data)` - Create new room
- `updateRoom(id, data)` - Update room
- `deleteRoom(id)` - Delete room

**Activities:**
- `getActivities()` - Get all activities
- `createActivity(data)` - Create new activity
- `updateActivity(id, data)` - Update activity
- `deleteActivity(id)` - Delete activity

**Testimonials:**
- `getTestimonials()` - Get all testimonials
- `createTestimonial(data)` - Create new testimonial
- `updateTestimonial(id, data)` - Update testimonial
- `deleteTestimonial(id)` - Delete testimonial

**Team Members:**
- `getTeamMembers()` - Get all team members
- `createTeamMember(data)` - Create new team member
- `updateTeamMember(id, data)` - Update team member
- `deleteTeamMember(id)` - Delete team member

## Video Upload Configuration

### Cloudinary Setup for Videos

1. Login to Cloudinary Dashboard
2. Go to Settings > Upload
3. Create or edit upload preset
4. Enable video uploads:
   - Resource Type: Auto
   - Video Codec: Auto
   - Format: Auto
5. Set upload preset to "Unsigned"
6. Copy preset name to `.env`

### Supported Video Formats

- MP4 (recommended)
- MOV
- AVI
- WEBM

### Video Size Limits

- Maximum file size: 100MB
- For larger videos, use a video hosting service and enter URL manually

## Best Practices

### Images
1. Upload high-quality images (min 1920px width for hero)
2. Use descriptive filenames
3. Organize images by category in Cloudinary

### Content
1. Write clear, engaging descriptions
2. Use proper grammar and spelling
3. Keep content updated
4. Remove outdated content

### Display Order
1. Featured items: Use order 0-10
2. Regular items: Use order 10+
3. Test ordering on frontend
4. Adjust as needed

### Publishing
1. Use Draft status while editing
2. Preview content before publishing
3. Publish only finalized content
4. Unpublish outdated content instead of deleting

## Troubleshooting

### Images Not Loading
- Check Cloudinary credentials in `.env`
- Verify upload preset is "unsigned"
- Check browser console for errors

### Database Errors
- Verify Supabase credentials
- Check RLS policies are enabled
- Ensure admin user is authenticated

### Video Upload Fails
- Check file size (max 100MB)
- Verify video format is supported
- Check Cloudinary upload preset allows videos

## Support

For issues or questions:
1. Check browser console for errors
2. Verify environment variables
3. Check Supabase database tables
4. Review network tab for API errors

## Next Steps

### Dynamic Frontend Integration
Update your frontend components to fetch data from Supabase instead of using static data:

1. Replace static room data with `getRooms()`
2. Replace static activities with `getActivities()`
3. Replace static testimonials with `getTestimonials()`
4. Add team section using `getTeamMembers()`
5. Test all pages with dynamic data
6. Add loading states
7. Add error handling

### SEO Optimization
- Add meta tags from blog data
- Generate sitemap from dynamic content
- Add structured data for rooms and reviews

### Performance
- Implement image lazy loading
- Add caching for frequently accessed data
- Optimize Cloudinary images with transformations
