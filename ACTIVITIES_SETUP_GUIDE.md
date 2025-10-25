# ✅ Activities Section - Complete Setup Guide

## 🎯 What Was Fixed

The Activities page (`/activities`) wasn't showing data from the database because:
1. The database table was missing additional fields (subtitle, duration, difficulty, etc.)
2. The admin panel wasn't saving these fields
3. The Activities page was trying to use fields that didn't exist

## ✅ Solution Implemented

### 1. Database Schema Updated
Added new fields to the `activities` table:
- `subtitle` (TEXT) - Short description/category
- `duration` (TEXT) - e.g., "2-3 hours"
- `difficulty` (TEXT) - Easy/Moderate/Challenging
- `group_size` (TEXT) - e.g., "4-8 people"
- `price` (TEXT) - Leave empty for included activities

### 2. Admin Panel Enhanced
Updated `ActivitiesManager.jsx` to include:
- Subtitle field
- Duration field
- Difficulty dropdown (Easy/Moderate/Challenging)
- Group size field
- Price field (empty = included with stay)

### 3. Activities Page Updated
- Now loads dynamic data from Supabase
- Separates activities into "Included" vs "Paid"
- Removed hardcoded data
- Added debug logging

---

## 🚀 How to Set Up

### Step 1: Update Database Schema

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run the SQL from `ACTIVITIES_TABLE_UPDATE.sql`:

```sql
ALTER TABLE activities 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '2-3 hours',
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'Easy',
ADD COLUMN IF NOT EXISTS group_size TEXT DEFAULT '4-8 people',
ADD COLUMN IF NOT EXISTS price TEXT;
```

### Step 2: Add Activities via Admin Panel

1. Go to `http://localhost:5173/admin`
2. Click **"Activities"** in the sidebar
3. Click **"Add Activity"**
4. Fill in the form:
   - **Title**: e.g., "Song of the Woods"
   - **Subtitle**: e.g., "Forest Walk & Nature Talk"
   - **Description**: Full description
   - **Image**: Select from image library
   - **Duration**: e.g., "2-3 hours"
   - **Difficulty**: Easy/Moderate/Challenging
   - **Group Size**: e.g., "4-8 people"
   - **Price**: Leave empty for included activities, or add price like "₹500"
   - **Display Order**: 0, 1, 2, etc. (controls order on page)
   - **Status**: Published

5. Click **"Create Activity"**

### Step 3: Verify on Frontend

1. Go to `http://localhost:5173/activities`
2. You should see:
   - **Included Activities**: All activities with no price
   - **Paid Activities**: All activities with a price

---

## 📊 How Activities Are Categorized

### Included Activities (Complimentary)
- Price field is **empty** OR
- Price is **"0"** OR
- Price contains only whitespace

These appear in the "Included Activities" section.

### Paid Activities
- Price field has **any value** (e.g., "₹500", "$20", "Price on request")

These appear in the "Paid Activities" section.

---

## 🎨 Sample Activities to Add

Here are some examples from your original content:

### 1. Song of the Woods (Included)
- **Subtitle**: Forest Walk & Nature Talk
- **Duration**: 2-3 hours
- **Difficulty**: Easy
- **Group Size**: 6-12 people
- **Price**: (leave empty)

### 2. Cups & Brew (Included)
- **Subtitle**: Tea Tasting Ceremony
- **Duration**: 1-2 hours
- **Difficulty**: Easy
- **Group Size**: 4-10 people
- **Price**: (leave empty)

### 3. Fire & Stone (Included)
- **Subtitle**: Tribal Cooking Class
- **Duration**: 2-3 hours
- **Difficulty**: Moderate
- **Group Size**: 4-8 people
- **Price**: (leave empty)

### 4. Trekking Adventure (Paid Example)
- **Subtitle**: Guided Mountain Trek
- **Duration**: Full day
- **Difficulty**: Challenging
- **Group Size**: 4-6 people
- **Price**: ₹1500 per person

---

## 🔍 Difference: Experiences vs Activities

### Experiences Section (`/` - Home Page)
- Shows **3 activities** in a grid
- Located in `src/components/home/Experiences.jsx`
- Designed for **homepage preview**
- Uses basic fields: title, description, image

### Activities Page (`/activities`)
- Shows **ALL activities**
- Located in `src/pages/Activities.jsx`
- **Full detail page** with subtitle, duration, difficulty, etc.
- Separates **Included** vs **Paid** activities

Both pull from the **same database table** (`activities`), so:
- Add activities once in the admin panel
- They appear in both places automatically!

---

## ✅ Verification Checklist

After setup, verify:

1. **Database**:
   - [ ] Run the SQL update script
   - [ ] Check table has new columns in Supabase Table Editor

2. **Admin Panel**:
   - [ ] Can add activities with all new fields
   - [ ] Can edit existing activities
   - [ ] Image selection works

3. **Homepage (/)**:
   - [ ] Experiences section shows activities
   - [ ] Only shows first 3-6 activities (adjust as needed)

4. **Activities Page (/activities)**:
   - [ ] Shows all included activities
   - [ ] Shows all paid activities (if any)
   - [ ] Each activity shows: title, subtitle, duration, difficulty, group size
   - [ ] Images load correctly

---

## 🐛 Troubleshooting

### No activities showing on /activities page
**Check**:
1. Open browser console (F12) - look for errors
2. Check console logs: "Fetched activities:" and "Formatted activities:"
3. Verify `is_published = true` in Supabase
4. Verify database columns exist (run SQL update)

### Activities show but no details
**Check**:
1. Edit activity in admin panel
2. Fill in subtitle, duration, difficulty, group size
3. Save and refresh page

### Images not loading
**Check**:
1. `image_url` field has valid Cloudinary URL
2. URL is public (not signed)
3. Image exists in Cloudinary

### Included vs Paid not working
**Check**:
1. For included: leave price field **completely empty**
2. For paid: add any price text
3. Check console log to see `isIncluded` value

---

## 📝 Field Reference

| Database Field | Admin Label | Example Value | Required |
|----------------|-------------|---------------|----------|
| `title` | Activity Title | Song of the Woods | Yes |
| `subtitle` | Subtitle | Forest Walk & Nature Talk | No |
| `description` | Description | Full description text... | Yes |
| `image_url` | Featured Image | https://res.cloudinary.com/... | Yes |
| `duration` | Duration | 2-3 hours | No (default: "2-3 hours") |
| `difficulty` | Difficulty | Easy/Moderate/Challenging | No (default: "Easy") |
| `group_size` | Group Size | 4-8 people | No (default: "4-8 people") |
| `price` | Price | (empty) or ₹500 | No (empty = included) |
| `display_order` | Display Order | 0, 1, 2... | No (default: 0) |
| `is_published` | Status | Published/Draft | No (default: Published) |

---

## 🎉 You're All Set!

After following this guide:
1. ✅ Database has all necessary fields
2. ✅ Admin panel can manage full activity details
3. ✅ Homepage shows activity previews
4. ✅ Activities page shows complete details
5. ✅ Automatic categorization into Included/Paid

**Next**: Start adding your real activities through the admin panel!
