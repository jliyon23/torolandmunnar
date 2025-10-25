# ⚡ QUICK FIX - Activities Section

## 🎯 The Problem
Activities showing on homepage but NOT on `/activities` page.

## ✅ The Solution (3 Steps)

### 1️⃣ Update Database (REQUIRED - Do This First!)
Open **Supabase Dashboard** → **SQL Editor** → Paste & Run:

```sql
ALTER TABLE activities 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '2-3 hours',
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'Easy',
ADD COLUMN IF NOT EXISTS group_size TEXT DEFAULT '4-8 people',
ADD COLUMN IF NOT EXISTS price TEXT;
```

### 2️⃣ Add Activities
1. Go to: `http://localhost:5173/admin`
2. Click: **Activities** → **Add Activity**
3. Fill in:
   - ✅ Title (required)
   - ✅ Subtitle
   - ✅ Description (required)
   - ✅ Image (required)
   - ✅ Duration (e.g., "2-3 hours")
   - ✅ Difficulty (Easy/Moderate/Challenging)
   - ✅ Group Size (e.g., "4-8 people")
   - ✅ Price (LEAVE EMPTY for included activities)
   - ✅ Status: Published
4. Click: **Create Activity**

### 3️⃣ Verify
- Homepage (`/`): Activities show in "Experiences" section
- Activities Page (`/activities`): Shows full details with categories

---

## 📍 Where Activities Appear

| Location | URL | Shows | Purpose |
|----------|-----|-------|---------|
| **Homepage** | `/` | First few activities | Preview/Teaser |
| **Activities Page** | `/activities` | ALL activities | Full catalog |

**Same database table = update once, appears everywhere!**

---

## 💡 Key Info

### Included vs Paid Activities
- **Price field EMPTY** → "Included Activities" section
- **Price has value** → "Paid Activities" section

### Example
```
Price: (empty) → Included ✅
Price: ₹500 → Paid 💰
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Activities page blank | 1. Run SQL update<br>2. Check console (F12)<br>3. Verify `is_published = true` |
| Missing details | Edit activity, fill subtitle/duration/etc |
| All show as "Included" | Clear price field for included, add value for paid |
| Images not loading | Check Cloudinary URL is valid & public |

---

## 📁 Files Changed
- ✅ `ActivitiesManager.jsx` - Admin panel enhanced
- ✅ `Activities.jsx` - Now loads from database
- ✅ `ACTIVITIES_TABLE_UPDATE.sql` - Database schema

---

## ⚡ That's It!
1. Run SQL (30 seconds)
2. Add activities via admin (5 minutes each)
3. Enjoy dynamic content! 🎉

**Detailed guide**: See `ACTIVITIES_SETUP_GUIDE.md`
