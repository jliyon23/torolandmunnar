# ✅ Admin Panel Setup Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Setup Checklist

- [ ] Supabase account created
- [ ] Cloudinary account created
- [ ] Node.js installed
- [ ] Project cloned/downloaded

---

## 🗄️ Database Setup

### Supabase Configuration
- [ ] Supabase project created
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] SQL Editor opened
- [ ] `ADMIN_DATABASE_EXTENDED.sql` executed
- [ ] All tables created successfully:
  - [ ] images
  - [ ] gallery
  - [ ] hero_settings
  - [ ] blogs
  - [ ] enquiries
  - [ ] rooms (NEW)
  - [ ] activities (NEW)
  - [ ] testimonials (NEW)
  - [ ] team_members (NEW)
- [ ] RLS policies enabled
- [ ] Admin user created in Authentication

---

## ☁️ Cloudinary Setup

- [ ] Cloudinary account created
- [ ] Cloud name copied
- [ ] Upload preset created
- [ ] Upload preset is "unsigned"
- [ ] Video upload enabled in preset
- [ ] Preset name copied

---

## ⚙️ Environment Configuration

- [ ] `.env` file created in project root
- [ ] `VITE_SUPABASE_URL` added
- [ ] `VITE_SUPABASE_ANON_KEY` added
- [ ] `VITE_CLOUDINARY_CLOUD_NAME` added
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET` added
- [ ] All values verified (no quotes needed)

Example `.env`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
```

---

## 📦 Installation

- [ ] `npm install` executed
- [ ] All dependencies installed successfully
- [ ] No error messages

---

## 🚀 First Run

- [ ] `npm run dev` executed
- [ ] Server started successfully
- [ ] No console errors
- [ ] Application opens in browser

---

## 🔐 Authentication Test

- [ ] Navigate to `/admin/login`
- [ ] Login page loads correctly
- [ ] Enter admin credentials
- [ ] Login successful
- [ ] Redirected to dashboard
- [ ] Dashboard loads correctly

---

## 🧪 Feature Testing

### Dashboard
- [ ] Dashboard displays correctly
- [ ] Statistics cards visible
- [ ] Quick action buttons work
- [ ] Navigation sidebar visible

### Images Manager
- [ ] Navigate to `/admin/images`
- [ ] Upload area visible
- [ ] Drag & drop test file
- [ ] Image uploads successfully
- [ ] Image appears in grid
- [ ] Copy URL works
- [ ] Delete works (with confirmation)
- [ ] Preview modal works

### Gallery Manager
- [ ] Navigate to `/admin/gallery`
- [ ] "Add to Gallery" button works
- [ ] Image selector modal opens
- [ ] Can select images
- [ ] Selected images display
- [ ] Remove button works

### Hero Settings
- [ ] Navigate to `/admin/hero`
- [ ] Type toggle works (Video/Image)
- [ ] Video URL input works
- [ ] Video upload area visible
- [ ] Can upload video (test with small file)
- [ ] Upload progress shows
- [ ] Video preview works
- [ ] Image carousel selector works
- [ ] Save settings works

### Rooms Manager (NEW)
- [ ] Navigate to `/admin/rooms`
- [ ] "Add Room" button works
- [ ] Modal opens correctly
- [ ] All form fields present
- [ ] Image selector works
- [ ] Can create test room
- [ ] Room appears in list
- [ ] Edit works
- [ ] Delete works (with confirmation)
- [ ] Published/Draft toggle works

### Activities Manager (NEW)
- [ ] Navigate to `/admin/activities`
- [ ] "Add Activity" button works
- [ ] Modal opens correctly
- [ ] Can create test activity
- [ ] Activity appears in grid
- [ ] Edit works
- [ ] Delete works
- [ ] Published/Draft toggle works

### Testimonials Manager (NEW)
- [ ] Navigate to `/admin/testimonials`
- [ ] "Add Testimonial" button works
- [ ] Modal opens correctly
- [ ] Rating selector works (1-5 stars)
- [ ] Can create test testimonial
- [ ] Testimonial appears in grid
- [ ] Star rating displays correctly
- [ ] Edit works
- [ ] Delete works

### Team Manager (NEW)
- [ ] Navigate to `/admin/team`
- [ ] "Add Team Member" button works
- [ ] Modal opens correctly
- [ ] Can create test team member
- [ ] Member appears in grid
- [ ] Photo displays correctly
- [ ] Edit works
- [ ] Delete works

### Blogs Manager
- [ ] Navigate to `/admin/blogs`
- [ ] "Create New Blog" button works
- [ ] Modal opens correctly
- [ ] All fields present
- [ ] Image selector works
- [ ] Can create test blog
- [ ] Blog appears in list
- [ ] Edit works
- [ ] Delete works

### Enquiries Manager
- [ ] Navigate to `/admin/enquiries`
- [ ] Enquiries list displays
- [ ] Filter tabs work
- [ ] Detail modal opens
- [ ] Status update works
- [ ] Delete works

---

## 🎨 UI/UX Verification

- [ ] Sidebar navigation works
- [ ] Sidebar toggle works
- [ ] All icons display correctly
- [ ] Colors match design (blue theme)
- [ ] Modals open/close smoothly
- [ ] Loading states show during operations
- [ ] Success messages appear
- [ ] Error messages appear when needed
- [ ] Responsive on mobile (test with dev tools)
- [ ] No layout issues

---

## 🔒 Security Verification

- [ ] `/admin/*` routes redirect to login when not authenticated
- [ ] Logout button works
- [ ] Session persists on page refresh
- [ ] RLS policies prevent unauthorized access
- [ ] No sensitive data in console logs

---

## 📊 Data Verification

### Check Database Tables
- [ ] Open Supabase Table Editor
- [ ] Verify test data appears in:
  - [ ] images table
  - [ ] gallery table
  - [ ] rooms table
  - [ ] activities table
  - [ ] testimonials table
  - [ ] team_members table
  - [ ] blogs table
- [ ] All fields populated correctly
- [ ] Timestamps set automatically
- [ ] Display order working

---

## 🎯 Final Checks

### Documentation
- [ ] All documentation files present
- [ ] Read ADMIN_COMPLETE.md
- [ ] Read ADMIN_CRUD_GUIDE.md
- [ ] Understand how to use each manager

### Content Preparation
- [ ] Images ready to upload
- [ ] Room details prepared
- [ ] Activity descriptions written
- [ ] Testimonials collected
- [ ] Team member info ready
- [ ] Video file ready (if using video)

### Frontend Integration Plan
- [ ] Understand which components need updating
- [ ] Know which helper functions to use
- [ ] Plan for loading states
- [ ] Plan for error handling

---

## ✅ Sign-Off

When all items are checked:

- [ ] **Database Setup**: Complete ✓
- [ ] **Environment Config**: Complete ✓
- [ ] **Installation**: Complete ✓
- [ ] **Authentication**: Working ✓
- [ ] **All Managers**: Tested ✓
- [ ] **UI/UX**: Verified ✓
- [ ] **Security**: Verified ✓
- [ ] **Data**: Verified ✓

---

## 🚨 Common Issues & Solutions

### Login Not Working
**Problem**: Can't login to admin panel
**Solution**:
1. Check Supabase credentials in `.env`
2. Verify admin user exists in Supabase Auth
3. Check browser console for errors
4. Clear browser cache

### Images Not Uploading
**Problem**: Drag & drop doesn't work
**Solution**:
1. Verify Cloudinary credentials
2. Check upload preset is "unsigned"
3. Check file size
4. Check browser console

### Tables Not Found
**Problem**: Database errors when using managers
**Solution**:
1. Verify SQL script was executed
2. Check all tables exist in Supabase
3. Verify table names match code
4. Check RLS policies are enabled

### Video Upload Fails
**Problem**: Can't upload video
**Solution**:
1. Check file size (max 100MB)
2. Verify file format (MP4, MOV, AVI, WEBM)
3. Check Cloudinary preset allows videos
4. Try smaller test video first

### Routes Not Working
**Problem**: 404 errors on admin routes
**Solution**:
1. Verify App.jsx has all routes
2. Check component imports
3. Restart dev server
4. Clear browser cache

---

## 📞 Need Help?

If you encounter issues:

1. ✅ Check this checklist again
2. ✅ Review browser console for errors
3. ✅ Check Supabase logs
4. ✅ Verify environment variables
5. ✅ Read relevant documentation file
6. ✅ Test with simple data first

---

## 🎉 Success Criteria

Your setup is complete when:

✅ You can login to admin panel
✅ All 11 admin pages load without errors
✅ You can upload images
✅ You can create content in all managers
✅ Data saves to Supabase
✅ Images save to Cloudinary
✅ Video upload works
✅ No console errors
✅ UI looks clean and professional

**Congratulations! Your admin panel is ready to use! 🎊**
