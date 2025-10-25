-- Update Rooms Table for Enhanced Room Details
-- Run this in your Supabase SQL Editor

-- Add new columns to rooms table for enhanced details
ALTER TABLE rooms 
ADD COLUMN IF NOT EXISTS gallery_images TEXT[], -- Array of image URLs
ADD COLUMN IF NOT EXISTS amenities TEXT[], -- Array of amenities
ADD COLUMN IF NOT EXISTS price_per_night TEXT,
ADD COLUMN IF NOT EXISTS max_occupancy INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS room_area TEXT, -- e.g., "350 sq ft"
ADD COLUMN IF NOT EXISTS view_type TEXT, -- e.g., "Mountain View", "Garden View"
ADD COLUMN IF NOT EXISTS bathroom_details TEXT,
ADD COLUMN IF NOT EXISTS special_features TEXT,
ADD COLUMN IF NOT EXISTS booking_notes TEXT;

-- Update existing records to have default values for new fields
UPDATE rooms 
SET 
  gallery_images = COALESCE(gallery_images, ARRAY[]::TEXT[]),
  amenities = COALESCE(amenities, ARRAY['Wi-Fi', 'Daily Housekeeping', 'Hot Water']::TEXT[]),
  price_per_night = COALESCE(price_per_night, 'Contact for pricing'),
  max_occupancy = COALESCE(max_occupancy, 2),
  room_area = COALESCE(room_area, size),
  view_type = COALESCE(view_type, 'Nature View'),
  bathroom_details = COALESCE(bathroom_details, 'Private bathroom with hot water'),
  special_features = COALESCE(special_features, 'Eco-friendly amenities'),
  booking_notes = COALESCE(booking_notes, 'Advance booking recommended')
WHERE gallery_images IS NULL OR amenities IS NULL OR price_per_night IS NULL;

-- Add comments for clarity
COMMENT ON COLUMN rooms.gallery_images IS 'Array of additional room images (URLs)';
COMMENT ON COLUMN rooms.amenities IS 'Array of room amenities';
COMMENT ON COLUMN rooms.price_per_night IS 'Price per night or pricing note';
COMMENT ON COLUMN rooms.max_occupancy IS 'Maximum number of guests allowed';
COMMENT ON COLUMN rooms.room_area IS 'Room size/area description';
COMMENT ON COLUMN rooms.view_type IS 'Type of view from the room';
COMMENT ON COLUMN rooms.bathroom_details IS 'Bathroom facilities description';
COMMENT ON COLUMN rooms.special_features IS 'Special features or highlights';
COMMENT ON COLUMN rooms.booking_notes IS 'Important booking information';
