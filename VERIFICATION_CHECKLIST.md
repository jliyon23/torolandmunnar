# ✅ Quick Verification Checklist

Use this checklist to verify your admin panel data is showing on the frontend.

---

## 🔐 Step 1: Login to Admin Panel

- [ ] Go to `http://localhost:5173/admin/login`
- [ ] Login successfully
- [ ] Admin dashboard loads

---

## 📸 Step 2: Verify Data in Admin Panel

### Hero Settings
- [ ] Go to `/admin/hero`
- [ ] Video URL is set OR images are selected
- [ ] Settings saved

### Gallery
- [ ] Go to `/admin/gallery`
- [ ] At least 3-5 images added
- [ ] Images marked as **Published** (toggle on)
- [ ] Order index set (1, 2, 3, etc.)

### Rooms
- [ ] Go to `/admin/rooms`
- [ ] At least 1-2 rooms added
- [ ] Each room has:
  - [ ] Title
  - [ ] Description
  - [ ] Image selected
  - [ ] Details (size, guests, bed)
  - [ ] **Published** status ON
  - [ ] Display order set

### Activities
- [ ] Go to `/admin/activities`
- [ ] At least 2-3 activities added
- [ ] Each activity has:
  - [ ] Title
  - [ ] Description
  - [ ] Image selected
  - [ ] **Published** status ON
  - [ ] Display order set

### Testimonials
- [ ] Go to `/admin/testimonials`
- [ ] At least 2-3 testimonials added
- [ ] Each testimonial has:
  - [ ] Quote text
  - [ ] Author name
  - [ ] Source/platform
  - [ ] Rating (stars)
  - [ ] **Published** status ON
  - [ ] Display order set

### Blogs
- [ ] Go to `/admin/blogs`
- [ ] At least 1-3 blogs added
- [ ] Each blog has:
  - [ ] Title
  - [ ] Content
  - [ ] Excerpt
  - [ ] Image selected
  - [ ] **Published** status ON
  - [ ] Publish date set

---

## 🌐 Step 3: Check Frontend Display

### Homepage Sections
- [ ] Go to `http://localhost:5173/`
- [ ] Page loads without errors

### Hero Section
- [ ] Hero video plays OR hero images carousel shows
- [ ] No black screen or broken video
- [ ] Text overlay visible

### About Section & Gallery
- [ ] Scroll to About section
- [ ] Company information displays
- [ ] **Gallery images show below** (horizontal scroll)
- [ ] Can scroll left/right through gallery
- [ ] Navigation arrows appear

### Rooms Section
- [ ] Scroll to Rooms section
- [ ] Room cards display with:
  - [ ] Room images
  - [ ] Room titles
  - [ ] Room descriptions
  - [ ] Room details (size, guests, bed)
- [ ] Rooms in correct display order

### Experiences/Activities Section
- [ ] Scroll to Experiences section
- [ ] Activity cards display with:
  - [ ] Activity images
  - [ ] Activity titles
  - [ ] Activity descriptions
- [ ] Activities in correct display order

### Testimonials Section
- [ ] Scroll to Voice/Testimonials section
- [ ] Testimonial cards display with:
  - [ ] Quote text
  - [ ] Author name
  - [ ] Star ratings
- [ ] Testimonials in correct display order

### Blog Section
- [ ] Scroll to Blog section
- [ ] Blog cards display (max 3) with:
  - [ ] Blog images
  - [ ] Blog titles
  - [ ] Blog excerpts
  - [ ] Publish dates
- [ ] "Read More" buttons visible

---

## 🧪 Step 4: Test Publish/Unpublish

### Test with a Room
- [ ] In admin, unpublish one room
- [ ] Go to frontend, refresh page
- [ ] Verify room no longer appears
- [ ] In admin, publish room again
- [ ] Go to frontend, refresh page
- [ ] Verify room reappears

### Test with Gallery Image
- [ ] In admin, unpublish a gallery image
- [ ] Go to frontend, refresh page
- [ ] Verify image no longer in gallery
- [ ] In admin, publish image again
- [ ] Go to frontend, refresh page
- [ ] Verify image reappears

---

## 🔢 Step 5: Test Display Order

### Test with Activities
- [ ] In admin, note current order of activities
- [ ] Change display_order values (e.g., swap 1 and 2)
- [ ] Save changes
- [ ] Go to frontend, refresh page
- [ ] Verify activities now appear in new order

---

## 🐛 Common Issues & Quick Fixes

### ❌ "Nothing shows on frontend"
**Check:**
- [ ] Browser console (F12) - any errors?
- [ ] All items marked as **Published**?
- [ ] Data actually exists in admin panel?
- [ ] Supabase credentials correct in `.env`?

### ❌ "Images not loading"
**Check:**
- [ ] Image URLs are Cloudinary URLs?
- [ ] Cloudinary credentials correct in `.env`?
- [ ] Browser console shows 404 errors?

### ❌ "Gallery shows 'No gallery images available'"
**Check:**
- [ ] Images added in `/admin/gallery`?
- [ ] Images marked as **Published**?
- [ ] At least 1 image in gallery table?

### ❌ "Hero video not playing"
**Check:**
- [ ] Video URL is valid?
- [ ] Video is in web-compatible format (MP4, WEBM)?
- [ ] Type is set to "video" (not "image")?
- [ ] Browser supports video playback?

---

## ✅ Success Criteria

**Your integration is successful if:**

- ✅ Hero section shows your video or images
- ✅ Gallery section shows your images (horizontal scroll)
- ✅ Rooms section shows your room cards
- ✅ Activities section shows your activity cards
- ✅ Testimonials section shows your reviews
- ✅ Blog section shows your blog posts
- ✅ Unpublishing content hides it from frontend
- ✅ Publishing content shows it on frontend
- ✅ Changing display order changes frontend order
- ✅ No console errors

---

## 🎊 All Checked? You're Done!

If all checkboxes are ticked, your website is fully integrated and working perfectly! 🚀

You can now manage all your website content through the admin panel without touching any code.

---

**Date Completed:** _________________

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________
