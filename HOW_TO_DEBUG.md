# How to Debug Data Display Issues

## Quick Debug Method

I've created a Debug Panel component that shows you exactly what data is being fetched from Supabase.

### Step 1: Add Debug Panel to Your App

1. Open `src/pages/Home.jsx`
2. Add this import at the top:
```jsx
import DebugPanel from '../components/DebugPanel';
```

3. Add the component anywhere in the return statement (it floats in bottom-right corner):
```jsx
const Home = () => {
  return (
    <>
      <Hero />
      <Highlights />
      <WhyToroland />
      <Rooms />
      <Experiences />
      <Gallery />
      <Voice />
      <BlogSection />
      <About />
      <NewsLetter />
      
      {/* Debug Panel - REMOVE BEFORE PRODUCTION */}
      <DebugPanel />
    </>
  );
};
```

### Step 2: Use the Debug Panel

1. Save the file and let the dev server reload
2. You'll see a blue "🔍 Debug Data" button in the bottom-right corner
3. Click it to open the debug panel
4. It will show:
   - How many items are in each table
   - How many are published
   - Whether images are present
   - Actual data from your database

### Step 3: Verify Your Data

Check each section in the debug panel:

#### ✅ Activities (Experiences)
- Should have at least 1 item with `Published: ✅`
- Should have `Image: ✅`
- Image URL should start with `https://res.cloudinary.com/`

#### ✅ Rooms
- Should have at least 1 item with `Published: ✅`
- Should have `Image: ✅`
- Image URL should start with `https://res.cloudinary.com/`

#### ✅ Testimonials
- Should have at least 1 item with `Published: ✅`
- Should show rating (1-5)

#### ✅ Team Members
- Should have at least 1 item with `Published: ✅`
- Should show name and role

#### ✅ Blogs
- Should have at least 1 item with `Published: ✅`
- Should have `Image: ✅`

#### ✅ Images Library
- Should show your uploaded images from Cloudinary

### Step 4: Troubleshoot Based on Results

#### If a section shows "0 total":
→ Go to admin panel and add items to that table

#### If items exist but "0 published":
→ Go to admin panel and set `is_published` to true

#### If "Image: ❌" appears:
→ Edit the item in admin panel and select an image

#### If data shows in debug but not on page:
→ Check browser console (F12) for JavaScript errors
→ Try hard refresh (Ctrl + Shift + R)

### Step 5: Remove Debug Panel Before Production

Once everything is working, remove the debug panel:

1. Remove the import from `Home.jsx`
2. Remove the `<DebugPanel />` component
3. Delete `src/components/DebugPanel.jsx`

## Alternative: Manual Console Check

If you prefer to check in the browser console:

1. Press F12 to open DevTools
2. Go to Console tab
3. Type:
```javascript
// Check activities
const { supabaseHelpers } = await import('./src/config/supabase');
const activities = await supabaseHelpers.getActivities();
console.log('Activities:', activities);
```

## Common Fixes

### Problem: Everything shows in debug but pages are blank

**Solution:**
1. Hard refresh browser (Ctrl + Shift + R)
2. Check console for errors
3. Verify all components use `useState(true)` for initial visibility

### Problem: Some images show, others don't

**Solution:**
1. Check if image URLs are complete in debug panel
2. Verify Cloudinary URLs are public (not signed)
3. Check browser Network tab for 404 errors on images

### Problem: Data shows intermittently

**Solution:**
1. Check network connection
2. Verify Supabase project is not paused (free tier)
3. Check RLS policies are correctly set (see ADMIN_DATABASE_EXTENDED.sql)

## Need More Help?

If issues persist after using the debug panel, provide:
1. Screenshot of the debug panel showing your data
2. Browser console errors (if any)
3. Screenshot of what you see on the actual page
4. Screenshot of the data in Supabase Table Editor

This will help diagnose the exact issue!
