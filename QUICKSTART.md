# 🚀 Quick Start Guide - Admin Panel

## Step-by-Step Setup (5 Minutes)

### ⚡ Step 1: Create Supabase Project (2 min)

1. Go to https://supabase.com and sign up
2. Click "New Project"
3. Name it "toroland-munnar"
4. Copy your project URL and anon key (Settings > API)

### ⚡ Step 2: Run Database Setup (1 min)

1. In Supabase, go to SQL Editor
2. Open `ADMIN_SETUP.md` and copy the entire SQL code
3. Paste and run in SQL Editor
4. ✅ All tables created!

### ⚡ Step 3: Create Admin User (1 min)

1. In Supabase, go to Authentication > Users
2. Click "Add User" > Email
3. Enter: `admin@toroland.com` / `YourSecurePassword123`
4. Click "Create User"
5. ✅ Admin account ready!

### ⚡ Step 4: Setup Cloudinary (1 min)

1. Go to https://cloudinary.com and sign up
2. From Dashboard, copy your "Cloud Name"
3. Go to Settings > Upload > Upload Presets
4. Use default "ml_default" or create unsigned preset
5. ✅ Cloudinary ready!

### ⚡ Step 5: Configure Environment (<1 min)

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### ⚡ Step 6: Run the App

```bash
npm install  # If not already done
npm run dev
```

### ⚡ Step 7: Login to Admin

1. Open browser: `http://localhost:5173/admin/login`
2. Login with: `admin@toroland.com` / `YourSecurePassword123`
3. 🎉 You're in!

---

## 🎯 What You Can Do Now

### Upload Images
1. Go to Images Manager
2. Drag & drop photos
3. Images upload to Cloudinary automatically

### Create Gallery
1. Go to Gallery Manager
2. Click "Add to Gallery"
3. Select uploaded images

### Set Hero Section
1. Go to Hero Settings
2. Choose Video or Carousel
3. For carousel: select multiple images
4. Save settings

### Write Blogs
1. Go to Blogs Manager
2. Click "Create New Blog"
3. Fill in title, content, select image
4. Publish!

### Manage Enquiries
1. Go to Enquiries Manager
2. View all customer enquiries
3. Update status: Pending → Contacted → Completed

---

## 📋 Default Credentials

**Admin Login:**
- Email: `admin@toroland.com`
- Password: `YourSecurePassword123`

⚠️ **Change these after first login!**

---

## 🆘 Quick Troubleshooting

### Can't login?
- Check Supabase URL and key in .env
- Verify admin user exists in Supabase
- Try clearing browser cache

### Images not uploading?
- Check Cloudinary cloud name in .env
- Ensure upload preset is "unsigned"
- Check browser console for errors

### Enquiries not saving?
- Check Supabase connection
- Verify SQL tables were created
- Check browser console

---

## 📖 Full Documentation

For complete details, see:
- `ADMIN_SETUP.md` - Detailed setup guide
- `ADMIN_SUMMARY.md` - Features overview

---

## 🎊 That's It!

You now have a fully functional admin panel to manage your entire website. Enjoy! 🚀
