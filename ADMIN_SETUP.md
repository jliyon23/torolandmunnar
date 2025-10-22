# Toroland Munnar - Admin Panel Setup Guide

## Overview
This admin panel allows you to manage all aspects of your Toroland Munnar website including images, gallery, hero settings, blogs, and enquiries.

## Features
- ✅ Image Management with Cloudinary
- ✅ Gallery Management
- ✅ Hero Section Settings (Video/Image Carousel)
- ✅ Blog Creation & Management
- ✅ Enquiry Management
- ✅ Clean, Modern Admin UI

## Prerequisites
1. Supabase Account
2. Cloudinary Account
3. Node.js installed

## Setup Instructions

### 1. Supabase Setup

#### Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API

#### Create Database Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Images table
CREATE TABLE images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  public_id TEXT,
  width INTEGER,
  height INTEGER,
  filename TEXT,
  size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Settings table
CREATE TABLE hero_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  type TEXT DEFAULT 'video', -- 'video' or 'image'
  video_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT DEFAULT 'Admin',
  tags TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests INTEGER NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero settings
INSERT INTO hero_settings (id, type, video_url, images)
VALUES (1, 'video', '/video/bg.mp4', '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin)
CREATE POLICY "Allow all for authenticated users" ON images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON hero_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON enquiries
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow public read access to blogs and hero settings
CREATE POLICY "Allow public read" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Allow public read" ON hero_settings
  FOR SELECT USING (true);

-- Allow public insert on enquiries
CREATE POLICY "Allow public insert" ON enquiries
  FOR INSERT WITH CHECK (true);
```

#### Create Admin User
1. Go to Authentication > Users in Supabase
2. Click "Add User"
3. Create an admin user with email/password
4. Save the credentials for login

### 2. Cloudinary Setup

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Create a free account
3. From your Dashboard, get:
   - Cloud Name
   - Go to Settings > Upload > Upload Presets
   - Create an unsigned upload preset (or use the default)
4. Save these credentials

### 3. Environment Variables

Create a `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
npm run dev
```

## Access Admin Panel

1. Navigate to `http://localhost:5173/admin/login`
2. Login with your Supabase admin credentials
3. You'll be redirected to the admin dashboard

## Admin Panel Features

### Dashboard
- Overview of images, blogs, and enquiries
- Quick access to all sections

### Images Manager
- Drag & drop image upload to Cloudinary
- View all uploaded images
- Copy image URLs
- Delete images

### Gallery Manager
- Select images from uploaded images
- Add/remove images from public gallery
- Images will display on the Gallery page

### Hero Settings
- Choose between Video or Image Carousel
- For Video: Enter video URL
- For Image Carousel: Select multiple images for slideshow

### Blogs Manager
- Create new blog posts
- Edit existing blogs
- Select featured images
- Manage publish status
- Delete blogs

### Enquiries Manager
- View all customer enquiries
- Filter by status (Pending/Contacted/Completed)
- Update enquiry status
- View full enquiry details
- Delete enquiries

## Security Notes

⚠️ **Important Security Considerations:**

1. **Row Level Security (RLS)**: Enabled on all tables
2. **Admin Authentication**: Uses Supabase Auth
3. **Image Upload**: Uses unsigned preset for simplicity (consider server-side upload for production)
4. **Environment Variables**: Never commit `.env` file to version control

## Troubleshooting

### Images not uploading
- Check Cloudinary credentials
- Ensure upload preset is set to "unsigned"
- Check browser console for errors

### Login not working
- Verify Supabase credentials
- Check that admin user exists in Supabase Auth
- Clear browser cache/localStorage

### Enquiries not saving
- Check Supabase connection
- Verify RLS policies are set correctly
- Check browser console for errors

## Support

For issues or questions, check the browser console for detailed error messages.

## Future Enhancements

- [ ] Image optimization and resizing
- [ ] Rich text editor for blogs
- [ ] Email notifications for enquiries
- [ ] Analytics dashboard
- [ ] Bulk operations
- [ ] Advanced image search and filtering
