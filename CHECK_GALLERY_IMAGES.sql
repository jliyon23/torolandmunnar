-- Check and Fix Gallery Images for Rooms
-- Run this in your Supabase SQL Editor

-- First, check if the gallery_images column exists and see current data
SELECT 
  id,
  title,
  gallery_images,
  array_length(gallery_images, 1) as gallery_count
FROM rooms 
ORDER BY created_at DESC;

-- If gallery_images column doesn't exist, add it
ALTER TABLE rooms 
ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';

-- Update existing rooms with some sample gallery images (replace with your actual image URLs)
-- You can replace these URLs with your actual uploaded images
UPDATE rooms 
SET gallery_images = ARRAY[
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
]
WHERE gallery_images IS NULL OR array_length(gallery_images, 1) IS NULL;

-- Check the updated data
SELECT 
  id,
  title,
  image as featured_image,
  gallery_images,
  array_length(gallery_images, 1) as gallery_count,
  is_published
FROM rooms 
ORDER BY display_order, created_at DESC;

-- If you want to add gallery images to a specific room (replace room_id with actual ID)
-- UPDATE rooms 
-- SET gallery_images = ARRAY[
--   'https://your-image-url-1.jpg',
--   'https://your-image-url-2.jpg',
--   'https://your-image-url-3.jpg'
-- ]
-- WHERE id = 'your-room-id';
