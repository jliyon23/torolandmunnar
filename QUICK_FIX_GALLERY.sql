-- QUICK FIX: Add Gallery Images to Existing Rooms
-- Run this in your Supabase SQL Editor to immediately add gallery images

-- First, check current room data
SELECT 
  id,
  title,
  gallery_images,
  array_length(gallery_images, 1) as gallery_count,
  is_published
FROM rooms 
ORDER BY created_at DESC;

-- Add gallery images to ALL existing rooms (replace with your actual image URLs)
UPDATE rooms 
SET gallery_images = ARRAY[
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
]
WHERE gallery_images IS NULL OR array_length(gallery_images, 1) IS NULL OR array_length(gallery_images, 1) = 0;

-- If you want to add to a specific room, use this (replace 'your-room-id' with actual room ID):
-- UPDATE rooms 
-- SET gallery_images = ARRAY[
--   'https://your-image-1.jpg',
--   'https://your-image-2.jpg',
--   'https://your-image-3.jpg'
-- ]
-- WHERE id = 'your-room-id';

-- Verify the update
SELECT 
  id,
  title,
  gallery_images,
  array_length(gallery_images, 1) as gallery_count,
  is_published
FROM rooms 
ORDER BY created_at DESC;
