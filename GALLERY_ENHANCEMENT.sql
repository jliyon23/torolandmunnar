-- Gallery Table Enhancement
-- Add category, title, and description fields to gallery table
-- Run this in Supabase SQL Editor

-- First, check if columns don't exist and add them
DO $$ 
BEGIN
    -- Add category column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'gallery' AND column_name = 'category'
    ) THEN
        ALTER TABLE gallery ADD COLUMN category VARCHAR(50) DEFAULT 'all';
    END IF;

    -- Add title column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'gallery' AND column_name = 'title'
    ) THEN
        ALTER TABLE gallery ADD COLUMN title VARCHAR(255);
    END IF;

    -- Add description column if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'gallery' AND column_name = 'description'
    ) THEN
        ALTER TABLE gallery ADD COLUMN description TEXT;
    END IF;
END $$;

-- Update existing records to have default category
UPDATE gallery SET category = 'all' WHERE category IS NULL;

COMMENT ON COLUMN gallery.category IS 'Gallery image category (all, nature, accommodation, activities)';
COMMENT ON COLUMN gallery.title IS 'Display title for the gallery image';
COMMENT ON COLUMN gallery.description IS 'Description or caption for the gallery image';
