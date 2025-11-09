-- User Profiles Table
-- Stores additional user information from Firebase Auth
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Bookmarks Table
-- Stores user bookmarks for AI tools, resources, courses, etc.
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('tool', 'course', 'book', 'video', 'article', 'news')),
  resource_id TEXT NOT NULL,
  resource_title TEXT NOT NULL,
  resource_url TEXT,
  resource_metadata JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, resource_type, resource_id)
);

-- User Learning Progress
-- Tracks course completion and learning milestones
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- User Activity Log
-- Tracks user interactions for analytics and personalization
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('view', 'search', 'bookmark', 'unbookmark', 'share', 'download')),
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites/Collections
-- Allows users to organize bookmarks into collections
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#820021',
  icon TEXT DEFAULT '📁',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection Items - Bridge table
CREATE TABLE IF NOT EXISTS public.collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
  bookmark_id UUID REFERENCES public.bookmarks(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_id, bookmark_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_firebase_uid ON public.user_profiles(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_resource_type ON public.bookmarks(resource_type);
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON public.learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON public.user_activity(created_at);
CREATE INDEX IF NOT EXISTS idx_collections_user_id ON public.collections(user_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON public.collection_items(collection_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT
  USING (firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub');

-- Users can insert their own profile
CREATE POLICY "Users can create own profile" ON public.user_profiles
  FOR INSERT
  WITH CHECK (firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub');

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE
  USING (firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub');

-- Bookmarks Policies
-- Users can manage their own bookmarks
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks
  FOR SELECT
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can create own bookmarks" ON public.bookmarks
  FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can update own bookmarks" ON public.bookmarks
  FOR UPDATE
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can delete own bookmarks" ON public.bookmarks
  FOR DELETE
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

-- Learning Progress Policies
-- Users can manage their own learning progress
CREATE POLICY "Users can view own learning progress" ON public.learning_progress
  FOR SELECT
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can create own learning progress" ON public.learning_progress
  FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can update own learning progress" ON public.learning_progress
  FOR UPDATE
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

-- User Activity Policies
-- Users can view and create their own activity
CREATE POLICY "Users can view own activity" ON public.user_activity
  FOR SELECT
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can create own activity" ON public.user_activity
  FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

-- Collections Policies
-- Users can manage their own collections
CREATE POLICY "Users can view own collections" ON public.collections
  FOR SELECT
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ) OR is_public = true);

CREATE POLICY "Users can create own collections" ON public.collections
  FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can update own collections" ON public.collections
  FOR UPDATE
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

CREATE POLICY "Users can delete own collections" ON public.collections
  FOR DELETE
  USING (user_id IN (
    SELECT id FROM public.user_profiles
    WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
  ));

-- Collection Items Policies
-- Users can manage items in their own collections
CREATE POLICY "Users can view own collection items" ON public.collection_items
  FOR SELECT
  USING (collection_id IN (
    SELECT id FROM public.collections
    WHERE user_id IN (
      SELECT id FROM public.user_profiles
      WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  ));

CREATE POLICY "Users can create own collection items" ON public.collection_items
  FOR INSERT
  WITH CHECK (collection_id IN (
    SELECT id FROM public.collections
    WHERE user_id IN (
      SELECT id FROM public.user_profiles
      WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  ));

CREATE POLICY "Users can update own collection items" ON public.collection_items
  FOR UPDATE
  USING (collection_id IN (
    SELECT id FROM public.collections
    WHERE user_id IN (
      SELECT id FROM public.user_profiles
      WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  ));

CREATE POLICY "Users can delete own collection items" ON public.collection_items
  FOR DELETE
  USING (collection_id IN (
    SELECT id FROM public.collections
    WHERE user_id IN (
      SELECT id FROM public.user_profiles
      WHERE firebase_uid = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  ));

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookmarks_updated_at
  BEFORE UPDATE ON public.bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at
  BEFORE UPDATE ON public.learning_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
