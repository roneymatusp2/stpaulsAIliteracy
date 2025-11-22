# St Paul's AI Teachers - Gamification Implementation Plan

## Executive Summary

Transform the platform into the definitive AI literacy experience for educators through sophisticated progression systems, recognition mechanics, and cutting-edge pedagogical features.

---

## Phase 1: Foundation (Authentication & Core Infrastructure)

### 1.1 User Authentication System
- Supabase Auth integration (email/password, Google SSO)
- User profile management with teacher metadata
- Role-based access (Teacher, Department Head, Administrator)
- Session persistence and secure token handling

### 1.2 Core Database Schema

```sql
-- User Profiles (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  department TEXT,
  school TEXT DEFAULT 'St Paul''s School',
  role TEXT DEFAULT 'teacher',
  bio TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'::jsonb,
  is_public BOOLEAN DEFAULT true
);

-- XP & Levelling System
CREATE TABLE user_xp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_to_next_level INTEGER DEFAULT 100,
  rank TEXT DEFAULT 'AI Apprentice',
  prestige_level INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- XP Transaction Log
CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  source_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Phase 2: Badge System

### 2.1 Badge Taxonomy

#### Skill-Based Badges
| Badge | Description | Requirement |
|-------|-------------|-------------|
| Prompt Pioneer | Master of AI prompting | Complete Prompting skill tree |
| Ethics Guardian | AI ethics expert | Complete Ethics modules |
| Classroom Innovator | Integration specialist | Complete Integration pathway |
| Assessment Architect | AI assessment expert | Complete Assessment modules |
| Creator Champion | AI content creator | Complete Creation pathway |

#### Milestone Badges
| Badge | Tiers | Requirements |
|-------|-------|--------------|
| First Steps | Bronze | Complete first lesson |
| Knowledge Seeker | Bronze→Diamond | Complete 5/25/50/100/200 lessons |
| Dedicated Learner | Bronze→Diamond | 7/30/90/180/365 day streaks |
| Social Butterfly | Bronze→Diamond | 5/25/50/100/250 peer endorsements |

#### Mastery Badges
| Badge | Requirement |
|-------|-------------|
| AI Literacy Master | Complete all core modules |
| Triple Threat | Master 3 skill domains |
| Polymath | Master all 5 skill domains |
| Perfectionist | Score 100% on any assessment |

#### Secret/Hidden Badges
| Badge | Requirement |
|-------|-------------|
| Night Owl | Complete lesson after midnight |
| Early Bird | Complete lesson before 6 AM |
| Weekend Warrior | Complete 5 lessons on weekend |
| Speed Demon | Complete module in under 10 mins |
| Comeback Kid | Return after 30+ day absence |

### 2.2 Badge Database Schema

```sql
-- Badge Definitions
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- skill, milestone, mastery, secret
  tier TEXT DEFAULT 'bronze', -- bronze, silver, gold, platinum, diamond
  icon_url TEXT,
  xp_reward INTEGER DEFAULT 50,
  rarity TEXT DEFAULT 'common', -- common, uncommon, rare, epic, legendary
  is_hidden BOOLEAN DEFAULT false,
  requirements JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Badge Awards
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  progress JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  UNIQUE(user_id, badge_id)
);
```

---

## Phase 3: Levelling & Progression System

### 3.1 XP Sources

| Activity | XP Reward |
|----------|-----------|
| Complete lesson | 25-100 XP (based on difficulty) |
| Pass assessment | 100-500 XP (based on score) |
| Daily login | 10 XP |
| Maintain streak (7 days) | 50 XP bonus |
| Maintain streak (30 days) | 200 XP bonus |
| Earn badge | 50-500 XP (based on rarity) |
| Give peer endorsement | 5 XP |
| Receive peer endorsement | 15 XP |
| Complete challenge | 100-1000 XP |
| First of the day bonus | 25 XP |

### 3.2 Level Progression

| Level | Rank | Total XP Required | Unlocks |
|-------|------|-------------------|---------|
| 1-5 | AI Apprentice | 0-500 | Basic features |
| 6-10 | AI Practitioner | 501-1,500 | Peer endorsements |
| 11-20 | AI Specialist | 1,501-5,000 | Custom avatar frames |
| 21-35 | AI Champion | 5,001-15,000 | Leaderboard entry |
| 36-50 | AI Architect | 15,001-40,000 | Certificate generation |
| 51+ | AI Visionary | 40,001+ | Prestige system unlock |

### 3.3 Prestige System
After reaching Level 50, users can "prestige" to:
- Reset to Level 1 with prestige badge
- Gain permanent XP multiplier (+10% per prestige)
- Unlock exclusive prestige badges
- Special leaderboard category

---

## Phase 4: Skill Trees

### 4.1 Five AI Literacy Domains

```
                    ┌─────────────────┐
                    │   AI LITERACY   │
                    │     MASTERY     │
                    └────────┬────────┘
         ┌───────────┬───────┼───────┬───────────┐
         ▼           ▼       ▼       ▼           ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
    │PROMPTING│ │ ETHICS  │ │CLASSROOM│ │ASSESSMENT│ │CREATION │
    │ MASTERY │ │ MASTERY │ │INTEGRAT.│ │ MASTERY  │ │ MASTERY │
    └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
         │           │           │           │           │
    ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
    │Advanced │ │Advanced │ │Advanced │ │Advanced │ │Advanced │
    │Prompting│ │ Ethics  │ │Workflows│ │Analytics│ │ Content │
    └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
         │           │           │           │           │
    ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
    │ Expert  │ │  Bias   │ │ Student │ │ Rubric  │ │Multi-   │
    │Techniques│ │Detection│ │Engagement│ │ Design │ │ modal   │
    └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
         │           │           │           │           │
    ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
    │Intermed.│ │ Privacy │ │Lesson   │ │Formative│ │ Visual  │
    │Prompting│ │& Safety │ │Planning │ │Assessment│ │ Content │
    └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
         │           │           │           │           │
    ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
    │ Basic   │ │ Core    │ │ Tool    │ │ Basic   │ │ Text    │
    │Prompting│ │ Ethics  │ │Selection│ │Feedback │ │Generation│
    └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
```

### 4.2 Skill Tree Database Schema

```sql
-- Skill Domains
CREATE TABLE skill_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  colour TEXT,
  order_index INTEGER DEFAULT 0
);

-- Skill Nodes
CREATE TABLE skill_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_id UUID REFERENCES skill_domains(id),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tier INTEGER DEFAULT 1, -- 1=foundation, 2=intermediate, 3=advanced, 4=expert, 5=mastery
  xp_reward INTEGER DEFAULT 100,
  prerequisites UUID[] DEFAULT '{}',
  lesson_ids UUID[] DEFAULT '{}',
  assessment_id UUID,
  is_locked BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Skill Progress
CREATE TABLE user_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  node_id UUID REFERENCES skill_nodes(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'locked', -- locked, available, in_progress, completed, mastered
  progress_percent INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  mastery_score INTEGER,
  attempts INTEGER DEFAULT 0,
  UNIQUE(user_id, node_id)
);
```

---

## Phase 5: Social & Competitive Features

### 5.1 Leaderboards

```sql
-- Leaderboard Entries (Materialised View refreshed hourly)
CREATE MATERIALIZED VIEW leaderboard_weekly AS
SELECT
  user_id,
  SUM(amount) as weekly_xp,
  COUNT(*) as activities,
  RANK() OVER (ORDER BY SUM(amount) DESC) as rank
FROM xp_transactions
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY user_id;

-- Departmental Leaderboards
CREATE VIEW department_leaderboard AS
SELECT
  p.department,
  COUNT(DISTINCT p.id) as members,
  SUM(x.total_xp) as total_xp,
  AVG(x.total_xp) as avg_xp,
  RANK() OVER (ORDER BY SUM(x.total_xp) DESC) as rank
FROM user_profiles p
JOIN user_xp x ON p.id = x.user_id
GROUP BY p.department;
```

### 5.2 Peer Endorsements

```sql
CREATE TABLE peer_endorsements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  skill_domain_id UUID REFERENCES skill_domains(id),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id, skill_domain_id)
);
```

### 5.3 Team Challenges

```sql
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  challenge_type TEXT NOT NULL, -- individual, team, department
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  target_metric TEXT NOT NULL,
  target_value INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 500,
  badge_reward_id UUID REFERENCES badges(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  team_name TEXT,
  current_progress INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  UNIQUE(challenge_id, user_id)
);
```

---

## Phase 6: Streaks & Consistency

### 6.1 Streak System

```sql
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  streak_started_at DATE,
  freeze_tokens INTEGER DEFAULT 0, -- Allow 1 day skip
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.2 Streak Rewards

| Streak Days | Reward |
|-------------|--------|
| 3 days | 25 XP bonus |
| 7 days | 50 XP + Bronze Streak badge |
| 14 days | 100 XP |
| 30 days | 200 XP + Silver Streak badge |
| 60 days | 400 XP |
| 90 days | 600 XP + Gold Streak badge |
| 180 days | 1000 XP + Platinum Streak badge |
| 365 days | 2500 XP + Diamond Streak badge |

---

## Phase 7: Certificates & Credentials

### 7.1 Certificate System

```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL, -- course_completion, skill_mastery, achievement
  title TEXT NOT NULL,
  description TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  verification_code TEXT UNIQUE NOT NULL,
  metadata JSONB DEFAULT '{}',
  pdf_url TEXT,
  is_public BOOLEAN DEFAULT true
);
```

### 7.2 Certificate Types

1. **Course Completion** - Issued upon completing all modules in a skill domain
2. **Skill Mastery** - Issued upon achieving mastery in a skill node
3. **Level Achievement** - Issued at major level milestones (10, 25, 50)
4. **Challenge Champion** - Issued for winning challenges
5. **Annual Recognition** - Issued for yearly achievements

---

## Phase 8: Adaptive Learning

### 8.1 Learning Analytics

```sql
CREATE TABLE learning_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  lesson_id UUID,
  time_spent_seconds INTEGER,
  quiz_score INTEGER,
  difficulty_rating INTEGER, -- 1-5 user feedback
  engagement_score FLOAT,
  completion_rate FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_learning_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE UNIQUE,
  learning_pace TEXT DEFAULT 'moderate', -- slow, moderate, fast
  preferred_content_type TEXT DEFAULT 'mixed', -- video, text, interactive
  strongest_domains TEXT[] DEFAULT '{}',
  weakest_domains TEXT[] DEFAULT '{}',
  recommended_next_steps JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.2 Spaced Repetition

```sql
CREATE TABLE spaced_repetition_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  ease_factor FLOAT DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review_date DATE,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Implementation Timeline

### Week 1-2: Foundation
- [ ] Supabase Auth integration
- [ ] User profile creation
- [ ] Core database migrations
- [ ] Basic UI components (ProfileCard, AuthModal)

### Week 3-4: Badge System
- [ ] Badge definitions seeding
- [ ] Badge award logic
- [ ] Badge display components
- [ ] Badge notification system

### Week 5-6: XP & Levelling
- [ ] XP transaction system
- [ ] Level calculation logic
- [ ] Progress bar components
- [ ] Rank display system

### Week 7-8: Skill Trees
- [ ] Skill domain definitions
- [ ] Skill tree visualisation
- [ ] Progress tracking
- [ ] Prerequisite logic

### Week 9-10: Social Features
- [ ] Leaderboard implementation
- [ ] Peer endorsement system
- [ ] Team challenges
- [ ] Social sharing

### Week 11-12: Polish & Launch
- [ ] Streak system
- [ ] Certificate generation
- [ ] Adaptive difficulty
- [ ] Performance optimisation
- [ ] Accessibility audit

---

## Technical Stack Additions

### New Dependencies
```json
{
  "@supabase/auth-helpers-react": "^0.5.0",
  "react-confetti": "^6.1.0",
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.1",
  "recharts": "^2.12.0",
  "react-force-graph": "^1.44.0",
  "date-fns": "^3.6.0",
  "zustand": "^4.5.0"
}
```

### State Management
- **Zustand** for global state (user, XP, badges, notifications)
- **React Query** for server state caching

### New Components Required
- `AuthModal.tsx` - Login/signup modal
- `ProfileCard.tsx` - User profile display
- `BadgeGrid.tsx` - Badge collection display
- `BadgeNotification.tsx` - Badge award popup
- `XPBar.tsx` - Experience progress bar
- `LevelBadge.tsx` - Current level display
- `SkillTree.tsx` - Interactive skill tree
- `Leaderboard.tsx` - Rankings display
- `StreakCounter.tsx` - Daily streak display
- `ChallengeCard.tsx` - Challenge details
- `CertificateViewer.tsx` - Certificate display/download
- `EndorsementButton.tsx` - Peer endorsement UI

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Daily Active Users | +200% | Analytics |
| Session Duration | +150% | Time tracking |
| Course Completion Rate | +100% | Progress data |
| Return Rate (7-day) | 80%+ | Login tracking |
| Badge Earned Rate | 5+ per user/month | Badge awards |
| Peer Endorsements | 3+ per user/month | Endorsement data |
| NPS Score | 50+ | User surveys |

---

*Document Version: 1.0*
*Created: November 2025*
*Author: Claude Code AI Assistant*
