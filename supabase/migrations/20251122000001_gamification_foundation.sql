-- ============================================================================
-- ST PAUL'S AI TEACHERS - GAMIFICATION SYSTEM
-- Migration: Foundation Schema
-- Created: 2025-11-22
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SECTION 1: USER PROFILES & AUTHENTICATION
-- ============================================================================

-- User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  department TEXT,
  school TEXT DEFAULT 'St Paul''s School',
  role TEXT DEFAULT 'teacher' CHECK (role IN ('teacher', 'department_head', 'administrator', 'guest')),
  bio TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  preferences JSONB DEFAULT '{
    "notifications": true,
    "publicProfile": true,
    "showOnLeaderboard": true,
    "emailDigest": "weekly"
  }'::jsonb,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, display_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- SECTION 2: XP & LEVELLING SYSTEM
-- ============================================================================

-- Rank definitions
CREATE TYPE user_rank AS ENUM (
  'AI Apprentice',
  'AI Practitioner',
  'AI Specialist',
  'AI Champion',
  'AI Architect',
  'AI Visionary'
);

-- User XP totals
CREATE TABLE IF NOT EXISTS user_xp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  current_level INTEGER DEFAULT 1 CHECK (current_level >= 1),
  xp_to_next_level INTEGER DEFAULT 100,
  rank user_rank DEFAULT 'AI Apprentice',
  prestige_level INTEGER DEFAULT 0 CHECK (prestige_level >= 0),
  xp_multiplier FLOAT DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- XP transaction history
CREATE TABLE IF NOT EXISTS xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL CHECK (source IN (
    'lesson_complete', 'assessment_pass', 'daily_login', 'streak_bonus',
    'badge_earned', 'endorsement_given', 'endorsement_received',
    'challenge_complete', 'first_of_day', 'skill_mastered', 'prestige_bonus',
    'admin_grant', 'referral_bonus', 'event_participation'
  )),
  source_id UUID,
  description TEXT,
  balance_after INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Level thresholds lookup
CREATE TABLE IF NOT EXISTS level_thresholds (
  level INTEGER PRIMARY KEY,
  xp_required INTEGER NOT NULL,
  rank user_rank NOT NULL,
  title TEXT,
  unlocks TEXT[]
);

-- Seed level thresholds
INSERT INTO level_thresholds (level, xp_required, rank, title, unlocks) VALUES
  (1, 0, 'AI Apprentice', 'Novice Explorer', ARRAY['Basic lessons']),
  (2, 100, 'AI Apprentice', 'Curious Mind', ARRAY[]::TEXT[]),
  (3, 250, 'AI Apprentice', 'Quick Learner', ARRAY[]::TEXT[]),
  (4, 450, 'AI Apprentice', 'Rising Star', ARRAY[]::TEXT[]),
  (5, 700, 'AI Apprentice', 'Foundation Builder', ARRAY['Profile customisation']),
  (6, 1000, 'AI Practitioner', 'Emerging Practitioner', ARRAY['Peer endorsements']),
  (7, 1350, 'AI Practitioner', 'Steady Progress', ARRAY[]::TEXT[]),
  (8, 1750, 'AI Practitioner', 'Knowledge Seeker', ARRAY[]::TEXT[]),
  (9, 2200, 'AI Practitioner', 'Skill Builder', ARRAY[]::TEXT[]),
  (10, 2700, 'AI Practitioner', 'Confident User', ARRAY['Avatar frames']),
  (11, 3300, 'AI Specialist', 'Specialist Candidate', ARRAY['Intermediate lessons']),
  (12, 4000, 'AI Specialist', 'Growing Expert', ARRAY[]::TEXT[]),
  (13, 4800, 'AI Specialist', 'Domain Explorer', ARRAY[]::TEXT[]),
  (14, 5700, 'AI Specialist', 'Multi-skilled', ARRAY[]::TEXT[]),
  (15, 6700, 'AI Specialist', 'Advanced Learner', ARRAY['Leaderboard entry']),
  (16, 7800, 'AI Specialist', 'Integration Expert', ARRAY[]::TEXT[]),
  (17, 9000, 'AI Specialist', 'Practice Leader', ARRAY[]::TEXT[]),
  (18, 10300, 'AI Specialist', 'Department Guide', ARRAY[]::TEXT[]),
  (19, 11700, 'AI Specialist', 'Mentor Candidate', ARRAY[]::TEXT[]),
  (20, 13200, 'AI Specialist', 'Specialist Elite', ARRAY['Certificate generation']),
  (21, 14800, 'AI Champion', 'Rising Champion', ARRAY['Advanced lessons']),
  (25, 20000, 'AI Champion', 'Proven Champion', ARRAY['Team challenges']),
  (30, 28000, 'AI Champion', 'Master Champion', ARRAY['Mentorship tools']),
  (35, 38000, 'AI Champion', 'Elite Champion', ARRAY['Custom badges']),
  (40, 50000, 'AI Architect', 'Junior Architect', ARRAY['Course creation']),
  (45, 65000, 'AI Architect', 'Senior Architect', ARRAY['Analytics dashboard']),
  (50, 85000, 'AI Architect', 'Master Architect', ARRAY['Prestige unlock']),
  (51, 100000, 'AI Visionary', 'Visionary I', ARRAY['Prestige tier 1'])
ON CONFLICT (level) DO NOTHING;

-- Function to calculate level from XP
CREATE OR REPLACE FUNCTION calculate_level(p_total_xp INTEGER)
RETURNS TABLE(level INTEGER, rank user_rank, xp_to_next INTEGER) AS $$
DECLARE
  v_level INTEGER;
  v_rank user_rank;
  v_next_threshold INTEGER;
BEGIN
  SELECT lt.level, lt.rank INTO v_level, v_rank
  FROM level_thresholds lt
  WHERE lt.xp_required <= p_total_xp
  ORDER BY lt.level DESC
  LIMIT 1;

  SELECT lt.xp_required INTO v_next_threshold
  FROM level_thresholds lt
  WHERE lt.level = v_level + 1;

  IF v_next_threshold IS NULL THEN
    v_next_threshold := p_total_xp + 10000; -- Continuous progression
  END IF;

  RETURN QUERY SELECT v_level, v_rank, v_next_threshold - p_total_xp;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update level on XP change
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
DECLARE
  v_level_data RECORD;
BEGIN
  SELECT * INTO v_level_data FROM calculate_level(NEW.total_xp);

  NEW.current_level := v_level_data.level;
  NEW.rank := v_level_data.rank;
  NEW.xp_to_next_level := v_level_data.xp_to_next;
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_user_level ON user_xp;
CREATE TRIGGER trg_update_user_level
  BEFORE UPDATE OF total_xp ON user_xp
  FOR EACH ROW EXECUTE FUNCTION update_user_level();

-- ============================================================================
-- SECTION 3: BADGE SYSTEM
-- ============================================================================

CREATE TYPE badge_category AS ENUM ('skill', 'milestone', 'mastery', 'secret', 'event', 'social');
CREATE TYPE badge_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'diamond');
CREATE TYPE badge_rarity AS ENUM ('common', 'uncommon', 'rare', 'epic', 'legendary');

-- Badge definitions
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category badge_category NOT NULL,
  tier badge_tier DEFAULT 'bronze',
  icon_name TEXT DEFAULT 'award', -- Lucide icon name
  icon_colour TEXT DEFAULT '#820021', -- St Paul's Ruby
  xp_reward INTEGER DEFAULT 50 CHECK (xp_reward >= 0),
  rarity badge_rarity DEFAULT 'common',
  is_hidden BOOLEAN DEFAULT false,
  requirements JSONB NOT NULL DEFAULT '{}',
  parent_badge_id UUID REFERENCES badges(id), -- For tiered badges
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User badge awards
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  progress JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  UNIQUE(user_id, badge_id)
);

-- Badge progress tracking (for badges requiring multiple steps)
CREATE TABLE IF NOT EXISTS badge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  current_value INTEGER DEFAULT 0,
  target_value INTEGER NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ============================================================================
-- SECTION 4: SKILL DOMAINS & TREES
-- ============================================================================

-- Skill domains (5 main areas)
CREATE TABLE IF NOT EXISTS skill_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  colour TEXT,
  order_index INTEGER DEFAULT 0,
  total_nodes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill nodes within domains
CREATE TABLE IF NOT EXISTS skill_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_id UUID REFERENCES skill_domains(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tier INTEGER DEFAULT 1 CHECK (tier BETWEEN 1 AND 5), -- 1=foundation to 5=mastery
  xp_reward INTEGER DEFAULT 100,
  prerequisites UUID[] DEFAULT '{}',
  lesson_ids UUID[] DEFAULT '{}',
  assessment_id UUID,
  estimated_minutes INTEGER DEFAULT 30,
  is_locked BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User skill progress
CREATE TABLE IF NOT EXISTS user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  node_id UUID REFERENCES skill_nodes(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed', 'mastered')),
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  mastery_score INTEGER CHECK (mastery_score IS NULL OR mastery_score BETWEEN 0 AND 100),
  attempts INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  UNIQUE(user_id, node_id)
);

-- ============================================================================
-- SECTION 5: STREAKS & CONSISTENCY
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_activity_date DATE,
  streak_started_at DATE,
  freeze_tokens INTEGER DEFAULT 1 CHECK (freeze_tokens >= 0),
  total_active_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily activity log
CREATE TABLE IF NOT EXISTS daily_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  lessons_completed INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  badges_earned INTEGER DEFAULT 0,
  first_activity_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_last_date DATE;
  v_current_streak INTEGER;
  v_longest_streak INTEGER;
  v_today DATE := CURRENT_DATE;
BEGIN
  SELECT last_activity_date, current_streak, longest_streak
  INTO v_last_date, v_current_streak, v_longest_streak
  FROM user_streaks
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    INSERT INTO user_streaks (user_id, current_streak, last_activity_date, streak_started_at, total_active_days)
    VALUES (p_user_id, 1, v_today, v_today, 1);
    RETURN;
  END IF;

  IF v_last_date = v_today THEN
    RETURN; -- Already logged today
  ELSIF v_last_date = v_today - 1 THEN
    -- Continue streak
    v_current_streak := v_current_streak + 1;
    UPDATE user_streaks SET
      current_streak = v_current_streak,
      longest_streak = GREATEST(v_longest_streak, v_current_streak),
      last_activity_date = v_today,
      total_active_days = total_active_days + 1,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  ELSE
    -- Streak broken (check for freeze token)
    IF v_last_date = v_today - 2 THEN
      -- Check if user has freeze tokens
      UPDATE user_streaks SET
        freeze_tokens = GREATEST(0, freeze_tokens - 1),
        last_activity_date = v_today,
        total_active_days = total_active_days + 1,
        updated_at = NOW()
      WHERE user_id = p_user_id AND freeze_tokens > 0;

      IF FOUND THEN RETURN; END IF;
    END IF;

    -- Reset streak
    UPDATE user_streaks SET
      current_streak = 1,
      last_activity_date = v_today,
      streak_started_at = v_today,
      total_active_days = total_active_days + 1,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 6: LEADERBOARDS
-- ============================================================================

-- Weekly leaderboard (materialised view)
CREATE MATERIALIZED VIEW IF NOT EXISTS leaderboard_weekly AS
SELECT
  u.user_id,
  p.display_name,
  p.avatar_url,
  p.department,
  SUM(u.amount) as weekly_xp,
  COUNT(*) as activities,
  RANK() OVER (ORDER BY SUM(u.amount) DESC) as rank
FROM xp_transactions u
JOIN user_profiles p ON u.user_id = p.id
WHERE u.created_at > NOW() - INTERVAL '7 days'
  AND p.is_public = true
GROUP BY u.user_id, p.display_name, p.avatar_url, p.department;

-- Monthly leaderboard
CREATE MATERIALIZED VIEW IF NOT EXISTS leaderboard_monthly AS
SELECT
  u.user_id,
  p.display_name,
  p.avatar_url,
  p.department,
  SUM(u.amount) as monthly_xp,
  COUNT(*) as activities,
  RANK() OVER (ORDER BY SUM(u.amount) DESC) as rank
FROM xp_transactions u
JOIN user_profiles p ON u.user_id = p.id
WHERE u.created_at > NOW() - INTERVAL '30 days'
  AND p.is_public = true
GROUP BY u.user_id, p.display_name, p.avatar_url, p.department;

-- All-time leaderboard
CREATE MATERIALIZED VIEW IF NOT EXISTS leaderboard_alltime AS
SELECT
  x.user_id,
  p.display_name,
  p.avatar_url,
  p.department,
  x.total_xp,
  x.current_level,
  x.rank as user_rank,
  RANK() OVER (ORDER BY x.total_xp DESC) as rank
FROM user_xp x
JOIN user_profiles p ON x.user_id = p.id
WHERE p.is_public = true;

-- Department leaderboard
CREATE VIEW department_leaderboard AS
SELECT
  p.department,
  COUNT(DISTINCT p.id) as members,
  SUM(x.total_xp) as total_xp,
  ROUND(AVG(x.total_xp)) as avg_xp,
  MAX(x.current_level) as top_level,
  RANK() OVER (ORDER BY SUM(x.total_xp) DESC) as rank
FROM user_profiles p
JOIN user_xp x ON p.id = x.user_id
WHERE p.department IS NOT NULL
GROUP BY p.department;

-- ============================================================================
-- SECTION 7: PEER ENDORSEMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS peer_endorsements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  skill_domain_id UUID REFERENCES skill_domains(id),
  message TEXT CHECK (char_length(message) <= 280),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id, skill_domain_id),
  CHECK(from_user_id != to_user_id)
);

-- ============================================================================
-- SECTION 8: CHALLENGES
-- ============================================================================

CREATE TYPE challenge_type AS ENUM ('individual', 'team', 'department', 'global');
CREATE TYPE challenge_status AS ENUM ('upcoming', 'active', 'completed', 'cancelled');

CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  challenge_type challenge_type NOT NULL,
  status challenge_status DEFAULT 'upcoming',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  target_metric TEXT NOT NULL,
  target_value INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 500,
  badge_reward_id UUID REFERENCES badges(id),
  max_participants INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  team_name TEXT,
  current_progress INTEGER DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(challenge_id, user_id)
);

-- ============================================================================
-- SECTION 9: CERTIFICATES
-- ============================================================================

CREATE TYPE certificate_type AS ENUM (
  'course_completion', 'skill_mastery', 'level_achievement',
  'challenge_champion', 'annual_recognition', 'special_award'
);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  certificate_type certificate_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  verification_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(12), 'hex'),
  metadata JSONB DEFAULT '{}',
  pdf_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 10: NOTIFICATIONS
-- ============================================================================

CREATE TYPE notification_type AS ENUM (
  'badge_earned', 'level_up', 'streak_milestone', 'challenge_complete',
  'endorsement_received', 'certificate_issued', 'leaderboard_rank',
  'system_announcement', 'reminder'
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 11: LEARNING ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS learning_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  lesson_id UUID,
  session_id UUID,
  time_spent_seconds INTEGER DEFAULT 0,
  quiz_score INTEGER,
  difficulty_rating INTEGER CHECK (difficulty_rating IS NULL OR difficulty_rating BETWEEN 1 AND 5),
  engagement_score FLOAT,
  completion_rate FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_learning_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  learning_pace TEXT DEFAULT 'moderate' CHECK (learning_pace IN ('slow', 'moderate', 'fast')),
  preferred_content_type TEXT DEFAULT 'mixed' CHECK (preferred_content_type IN ('video', 'text', 'interactive', 'mixed')),
  strongest_domains TEXT[] DEFAULT '{}',
  weakest_domains TEXT[] DEFAULT '{}',
  recommended_next_steps JSONB DEFAULT '[]',
  total_learning_hours FLOAT DEFAULT 0,
  average_session_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 12: INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_xp_total ON user_xp(total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_user_xp_level ON user_xp(current_level DESC);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user ON xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_created ON xp_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_source ON xp_transactions(source);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge ON user_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_badges_category ON badges(category);
CREATE INDEX IF NOT EXISTS idx_skill_progress_user ON user_skill_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_progress_node ON user_skill_progress(node_id);
CREATE INDEX IF NOT EXISTS idx_user_streaks_streak ON user_streaks(current_streak DESC);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);
CREATE INDEX IF NOT EXISTS idx_endorsements_to_user ON peer_endorsements(to_user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_status ON challenges(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id) WHERE is_read = false;

-- ============================================================================
-- SECTION 13: ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE peer_endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_profile ENABLE ROW LEVEL SECURITY;

-- Public read for profiles (if public)
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles FOR SELECT
  USING (is_public = true);

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- XP policies
CREATE POLICY "Users can view own XP"
  ON user_xp FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public XP for leaderboards"
  ON user_xp FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles WHERE id = user_id AND is_public = true
  ));

-- Badge policies
CREATE POLICY "Anyone can view badge definitions"
  ON badges FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public badges viewable"
  ON user_badges FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_profiles WHERE id = user_id AND is_public = true
  ));

-- Skill progress policies
CREATE POLICY "Users can view own skill progress"
  ON user_skill_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own skill progress"
  ON user_skill_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Streak policies
CREATE POLICY "Users can view own streaks"
  ON user_streaks FOR SELECT
  USING (auth.uid() = user_id);

-- Endorsement policies
CREATE POLICY "Users can view endorsements they received"
  ON peer_endorsements FOR SELECT
  USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

CREATE POLICY "Users can create endorsements"
  ON peer_endorsements FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

-- Certificate policies
CREATE POLICY "Users can view own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public certificates viewable"
  ON certificates FOR SELECT
  USING (is_public = true);

-- Notification policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- SECTION 14: HELPER FUNCTIONS
-- ============================================================================

-- Award XP to user
CREATE OR REPLACE FUNCTION award_xp(
  p_user_id UUID,
  p_amount INTEGER,
  p_source TEXT,
  p_source_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_multiplier FLOAT;
  v_final_amount INTEGER;
  v_new_total INTEGER;
BEGIN
  -- Get user's XP multiplier
  SELECT COALESCE(xp_multiplier, 1.0) INTO v_multiplier
  FROM user_xp WHERE user_id = p_user_id;

  v_final_amount := ROUND(p_amount * COALESCE(v_multiplier, 1.0));

  -- Update total XP
  INSERT INTO user_xp (user_id, total_xp)
  VALUES (p_user_id, v_final_amount)
  ON CONFLICT (user_id) DO UPDATE
  SET total_xp = user_xp.total_xp + v_final_amount
  RETURNING total_xp INTO v_new_total;

  -- Log transaction
  INSERT INTO xp_transactions (user_id, amount, source, source_id, description, balance_after)
  VALUES (p_user_id, v_final_amount, p_source, p_source_id, p_description, v_new_total);

  -- Update streak
  PERFORM update_user_streak(p_user_id);

  -- Update daily activity
  INSERT INTO daily_activity (user_id, activity_date, xp_earned)
  VALUES (p_user_id, CURRENT_DATE, v_final_amount)
  ON CONFLICT (user_id, activity_date) DO UPDATE
  SET xp_earned = daily_activity.xp_earned + v_final_amount,
      last_activity_at = NOW();

  RETURN v_final_amount;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Award badge to user
CREATE OR REPLACE FUNCTION award_badge(
  p_user_id UUID,
  p_badge_slug TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_badge_id UUID;
  v_xp_reward INTEGER;
  v_badge_name TEXT;
BEGIN
  -- Get badge info
  SELECT id, xp_reward, name INTO v_badge_id, v_xp_reward, v_badge_name
  FROM badges WHERE slug = p_badge_slug;

  IF v_badge_id IS NULL THEN
    RETURN false;
  END IF;

  -- Check if already awarded
  IF EXISTS (SELECT 1 FROM user_badges WHERE user_id = p_user_id AND badge_id = v_badge_id) THEN
    RETURN false;
  END IF;

  -- Award badge
  INSERT INTO user_badges (user_id, badge_id)
  VALUES (p_user_id, v_badge_id);

  -- Award XP
  PERFORM award_xp(p_user_id, v_xp_reward, 'badge_earned', v_badge_id, 'Earned badge: ' || v_badge_name);

  -- Create notification
  INSERT INTO notifications (user_id, type, title, message, data)
  VALUES (
    p_user_id,
    'badge_earned',
    'Badge Earned!',
    'You earned the "' || v_badge_name || '" badge!',
    jsonb_build_object('badge_id', v_badge_id, 'badge_slug', p_badge_slug)
  );

  -- Update daily activity
  UPDATE daily_activity
  SET badges_earned = badges_earned + 1
  WHERE user_id = p_user_id AND activity_date = CURRENT_DATE;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check and award milestone badges
CREATE OR REPLACE FUNCTION check_milestone_badges(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_lesson_count INTEGER;
  v_streak INTEGER;
  v_total_xp INTEGER;
  v_endorsement_count INTEGER;
BEGIN
  -- Get user stats
  SELECT COUNT(*) INTO v_lesson_count
  FROM user_skill_progress
  WHERE user_id = p_user_id AND status = 'completed';

  SELECT current_streak INTO v_streak
  FROM user_streaks WHERE user_id = p_user_id;

  SELECT total_xp INTO v_total_xp
  FROM user_xp WHERE user_id = p_user_id;

  SELECT COUNT(*) INTO v_endorsement_count
  FROM peer_endorsements WHERE to_user_id = p_user_id;

  -- Check lesson milestones
  IF v_lesson_count >= 1 THEN PERFORM award_badge(p_user_id, 'first-steps'); END IF;
  IF v_lesson_count >= 5 THEN PERFORM award_badge(p_user_id, 'knowledge-seeker-bronze'); END IF;
  IF v_lesson_count >= 25 THEN PERFORM award_badge(p_user_id, 'knowledge-seeker-silver'); END IF;
  IF v_lesson_count >= 50 THEN PERFORM award_badge(p_user_id, 'knowledge-seeker-gold'); END IF;
  IF v_lesson_count >= 100 THEN PERFORM award_badge(p_user_id, 'knowledge-seeker-platinum'); END IF;
  IF v_lesson_count >= 200 THEN PERFORM award_badge(p_user_id, 'knowledge-seeker-diamond'); END IF;

  -- Check streak milestones
  IF v_streak >= 7 THEN PERFORM award_badge(p_user_id, 'dedicated-learner-bronze'); END IF;
  IF v_streak >= 30 THEN PERFORM award_badge(p_user_id, 'dedicated-learner-silver'); END IF;
  IF v_streak >= 90 THEN PERFORM award_badge(p_user_id, 'dedicated-learner-gold'); END IF;
  IF v_streak >= 180 THEN PERFORM award_badge(p_user_id, 'dedicated-learner-platinum'); END IF;
  IF v_streak >= 365 THEN PERFORM award_badge(p_user_id, 'dedicated-learner-diamond'); END IF;

  -- Check endorsement milestones
  IF v_endorsement_count >= 5 THEN PERFORM award_badge(p_user_id, 'social-butterfly-bronze'); END IF;
  IF v_endorsement_count >= 25 THEN PERFORM award_badge(p_user_id, 'social-butterfly-silver'); END IF;
  IF v_endorsement_count >= 50 THEN PERFORM award_badge(p_user_id, 'social-butterfly-gold'); END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Refresh leaderboards (call via pg_cron)
CREATE OR REPLACE FUNCTION refresh_leaderboards()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_weekly;
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_monthly;
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_alltime;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
