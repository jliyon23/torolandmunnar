# 🎨 Admin Panel Visual Guide

## Color Scheme & Design

The admin panel uses a clean, modern design with a **blue gradient theme** that's different from the main website:

### Primary Colors
- **Primary Blue**: `#2563EB` (Blue-600)
- **Secondary Blue**: `#4F46E5` (Indigo-600)
- **Success Green**: `#16A34A` (Green-600)
- **Warning Orange**: `#EA580C` (Orange-600)
- **Danger Red**: `#DC2626` (Red-600)

### Background Colors
- **Main BG**: `#F3F4F6` (Gray-100)
- **Card BG**: `#FFFFFF` (White)
- **Hover BG**: `#F9FAFB` (Gray-50)

---

## 🔐 Login Page

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│     [Blue Gradient Header]          │
│     🔒 Lock Icon                    │
│     Admin Panel                     │
│     Sign in to manage your website  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  📧 Email Address                   │
│  [_________________________]        │
│                                     │
│  🔒 Password                        │
│  [_________________________]        │
│                                     │
│  [      Sign In Button      ]       │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Gradient blue header
- Lock icon
- Email/password inputs with icons
- Animated loading state
- Error messages in red

---

## 📊 Dashboard

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ [☰] Toroland Admin      [View Site] [Logout]       │
├──────────────┬──────────────────────────────────────┤
│ [Sidebar]    │  Dashboard                           │
│              │                                       │
│ 🏠 Dashboard │  ┌────────┐ ┌────────┐ ┌────────┐   │
│ 🖼️ Images    │  │  50    │ │   12   │ │   8    │   │
│ 🎨 Gallery   │  │ Images │ │ Blogs  │ │Enquiries│  │
│ 🎬 Hero      │  └────────┘ └────────┘ └────────┘   │
│ 📝 Blogs     │                                       │
│ 📧 Enquiries │  Quick Actions:                      │
│              │  [Upload Images] [Create Blog]       │
└──────────────┴──────────────────────────────────────┘
```

**Features:**
- Collapsible sidebar
- Stat cards with icons
- Quick action buttons
- Clean grid layout

---

## 🖼️ Images Manager

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Images Manager                                      │
│ Upload and manage your images                       │
├─────────────────────────────────────────────────────┤
│ Upload New Images                                   │
│ ┌───────────────────────────────────────────────┐   │
│ │                                                │   │
│ │         📤 Drag & drop images here            │   │
│ │        or click to select files               │   │
│ │                                                │   │
│ └───────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│ All Images (50)                                     │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                        │
│ │img │ │img │ │img │ │img │                        │
│ └────┘ └────┘ └────┘ └────┘                        │
│ [Copy] [Copy] [Copy] [Copy]                        │
│ [Del]  [Del]  [Del]  [Del]                         │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Drag & drop zone
- Grid of images
- Copy URL button
- Delete button
- Image preview modal

---

## 🎨 Gallery Manager

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Gallery Manager              [+ Add to Gallery]     │
├─────────────────────────────────────────────────────┤
│ Gallery Images (12)                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐                   │
│ │ Image  │ │ Image  │ │ Image  │                   │
│ │   [X]  │ │   [X]  │ │   [X]  │                   │
│ └────────┘ └────────┘ └────────┘                   │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Selected gallery images
- Remove button (X)
- Add images modal
- Visual selector

---

## 🎬 Hero Settings

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Hero Settings                                       │
├─────────────────────────────────────────────────────┤
│ Hero Type:                                          │
│ ┌──────────────┐  ┌──────────────┐                 │
│ │ 📹 Video     │  │ 🖼️ Carousel  │                 │
│ │ Background   │  │ Images       │                 │
│ └──────────────┘  └──────────────┘                 │
│                                                     │
│ [If Video selected]                                │
│ Video URL: [_____________________]                 │
│                                                     │
│ [If Carousel selected]                             │
│ Carousel Images (3)      [+ Add Image]            │
│ ┌────┐ ┌────┐ ┌────┐                              │
│ │ #1 │ │ #2 │ │ #3 │                              │
│ └────┘ └────┘ └────┘                              │
│                                                     │
│ [    Save Settings    ]                            │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Toggle buttons
- Video URL input
- Image carousel selector
- Save button

---

## 📝 Blogs Manager

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Blogs Manager                  [+ Create New Blog]  │
├─────────────────────────────────────────────────────┤
│ ┌──────┐                                            │
│ │Image │ Blog Title                                 │
│ │      │ Short excerpt text...                      │
│ │      │ By Admin • Jan 15, 2024 • travel           │
│ └──────┘ [Edit] [Delete]                            │
├─────────────────────────────────────────────────────┤
│ ┌──────┐                                            │
│ │Image │ Another Blog                               │
│ │      │ Another excerpt...                         │
│ └──────┘ [Edit] [Delete]                            │
└─────────────────────────────────────────────────────┘
```

**Blog Editor Modal:**
```
┌─────────────────────────────────────────────────────┐
│ Create New Blog                            [X]      │
├─────────────────────────────────────────────────────┤
│ Title: [________________________________]           │
│ Excerpt: [______________________________]           │
│ Featured Image: [Select Image]                     │
│ Content:                                            │
│ ┌───────────────────────────────────────────────┐   │
│ │                                                │   │
│ │ Write your blog content here...               │   │
│ │                                                │   │
│ └───────────────────────────────────────────────┘   │
│ Author: [Admin]      Tags: [_____________]          │
│ ☑ Publish immediately                              │
│                                                     │
│ [Cancel]                    [Create Blog]           │
└─────────────────────────────────────────────────────┘
```

**Features:**
- List of all blogs
- Featured image preview
- Edit/Delete buttons
- Full-screen editor modal
- Rich content area

---

## 📧 Enquiries Manager

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Enquiries                                           │
├─────────────────────────────────────────────────────┤
│ [All (25)] [Pending (8)] [Contacted (12)] [Done]   │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐     │
│ │ John Doe             [Pending]              │     │
│ │ 📧 john@email.com  📞 +91 12345 67890      │     │
│ │ 📅 Jan 15 - Jan 18   👥 2 guests           │     │
│ │ Received: Jan 10, 2024 10:30 AM            │     │
│ └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

**Enquiry Detail Modal:**
```
┌─────────────────────────────────────────────────────┐
│ Enquiry Details                            [X]      │
├─────────────────────────────────────────────────────┤
│ 👤 Personal Information                             │
│ Name: John Doe          Email: john@email.com      │
│ Phone: +91 12345 67890  Guests: 2                  │
│                                                     │
│ 📅 Trip Details                                     │
│ Check-in: Jan 15, 2024  Check-out: Jan 18, 2024   │
│                                                     │
│ 💬 Message                                          │
│ Looking for eco-friendly accommodation...          │
│                                                     │
│ Update Status:                                     │
│ [Pending] [Contacted] [Completed]                  │
│                                                     │
│ [Delete Enquiry]                       [Close]     │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Status filter tabs
- Enquiry cards
- Detail modal
- Status update buttons
- Delete option

---

## 🎨 Design Elements

### Cards
- White background
- Subtle shadow
- Sharp corners (no rounded)
- Border on hover

### Buttons
- Solid colors (no gradients for buttons)
- Blue (primary), Green (success), Red (delete)
- Sharp corners
- Hover effects

### Icons
- SVG stroke icons (from built-in set)
- Bordered icon containers
- Consistent sizing

### Modals
- Full-screen or centered
- White background
- Shadow overlay
- Smooth transitions

### Forms
- Sharp corner inputs
- 2px borders
- Focus ring on active
- Label above input

---

## 📱 Responsive Design

### Desktop (1024px+)
- Sidebar visible
- Grid layouts (3-4 columns)
- Full-width modals

### Tablet (768px - 1023px)
- Collapsible sidebar
- Grid layouts (2-3 columns)
- Adapted modals

### Mobile (<768px)
- Hidden sidebar (toggle)
- Single column
- Full-screen modals

---

## ✨ Animations

- **Fade in/out** - Modals, overlays
- **Slide** - Sidebar toggle
- **Scale** - Image hover
- **Spin** - Loading indicators
- **Smooth** - All transitions 200-300ms

---

This admin panel provides a professional, clean interface that's completely different from the main website's rustic theme, making it perfect for managing your content!
