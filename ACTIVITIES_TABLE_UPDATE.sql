-- Update Activities Table to Support Full Activity Details
-- Run this in your Supabase SQL Editor to add missing fields

-- Add new columns to activities table
ALTER TABLE activities 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '2-3 hours',
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'Easy',
ADD COLUMN IF NOT EXISTS group_size TEXT DEFAULT '4-8 people',
ADD COLUMN IF NOT EXISTS price TEXT;

-- Add comment for clarity
COMMENT ON COLUMN activities.subtitle IS 'Short subtitle or category for the activity';
COMMENT ON COLUMN activities.duration IS 'Expected duration of the activity';
COMMENT ON COLUMN activities.difficulty IS 'Difficulty level: Easy, Moderate, Challenging';
COMMENT ON COLUMN activities.group_size IS 'Recommended group size for the activity';
COMMENT ON COLUMN activities.price IS 'Price for the activity (null or 0 means included with stay)';

-- Update existing records to have default values
UPDATE activities 
SET 
  subtitle = COALESCE(subtitle, ''),
  duration = COALESCE(duration, '2-3 hours'),
  difficulty = COALESCE(difficulty, 'Easy'),
  group_size = COALESCE(group_size, '4-8 people')
WHERE subtitle IS NULL OR duration IS NULL OR difficulty IS NULL OR group_size IS NULL;
