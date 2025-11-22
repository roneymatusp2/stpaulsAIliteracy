// ============================================================================
// ST PAUL'S AI TEACHERS - GAMIFICATION TYPE DEFINITIONS
// ============================================================================

// User Ranks
export type UserRank =
  | 'AI Apprentice'
  | 'AI Practitioner'
  | 'AI Specialist'
  | 'AI Champion'
  | 'AI Architect'
  | 'AI Visionary';

// Badge Types
export type BadgeCategory = 'skill' | 'milestone' | 'mastery' | 'secret' | 'event' | 'social';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Challenge Types
export type ChallengeType = 'individual' | 'team' | 'department' | 'global';
export type ChallengeStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

// Certificate Types
export type CertificateType =
  | 'course_completion'
  | 'skill_mastery'
  | 'level_achievement'
  | 'challenge_champion'
  | 'annual_recognition'
  | 'special_award';

// Notification Types
export type NotificationType =
  | 'badge_earned'
  | 'level_up'
  | 'streak_milestone'
  | 'challenge_complete'
  | 'endorsement_received'
  | 'certificate_issued'
  | 'leaderboard_rank'
  | 'system_announcement'
  | 'reminder';

// Skill Progress Status
export type SkillStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';

// Learning Pace
export type LearningPace = 'slow' | 'moderate' | 'fast';

// Content Preference
export type ContentPreference = 'video' | 'text' | 'interactive' | 'mixed';

// ============================================================================
// USER INTERFACES
// ============================================================================

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  avatar_url?: string;
  department?: string;
  school: string;
  role: 'teacher' | 'department_head' | 'administrator' | 'guest';
  bio?: string;
  joined_at: string;
  created_at?: string;
  last_active_at: string;
  preferences: UserPreferences;
  is_public: boolean;
}

export interface UserPreferences {
  notifications: boolean;
  publicProfile: boolean;
  showOnLeaderboard: boolean;
  emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
}

export interface UserXP {
  id: string;
  user_id: string;
  total_xp: number;
  current_level: number;
  xp_to_next_level: number;
  rank: UserRank;
  prestige_level: number;
  xp_multiplier: number;
}

export interface XPTransaction {
  id: string;
  user_id: string;
  amount: number;
  source: XPSource;
  source_id?: string;
  description?: string;
  balance_after: number;
  created_at: string;
}

export type XPSource =
  | 'lesson_complete'
  | 'assessment_pass'
  | 'daily_login'
  | 'streak_bonus'
  | 'badge_earned'
  | 'endorsement_given'
  | 'endorsement_received'
  | 'challenge_complete'
  | 'first_of_day'
  | 'skill_mastered'
  | 'prestige_bonus'
  | 'admin_grant'
  | 'referral_bonus'
  | 'event_participation';

// ============================================================================
// BADGE INTERFACES
// ============================================================================

export interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: BadgeCategory;
  tier: BadgeTier;
  icon_name: string;
  icon_colour: string;
  xp_reward: number;
  rarity: BadgeRarity;
  is_hidden: boolean;
  requirements: BadgeRequirement;
  parent_badge_id?: string;
  sort_order: number;
}

export interface BadgeRequirement {
  type: string;
  count?: number;
  domain?: string;
  level?: number;
  condition?: string;
  date?: string;
  minutes?: number;
  days?: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  badge?: Badge;
  awarded_at: string;
  progress: Record<string, unknown>;
  is_featured: boolean;
  is_new: boolean;
}

export interface BadgeProgress {
  id: string;
  user_id: string;
  badge_id: string;
  badge?: Badge;
  current_value: number;
  target_value: number;
  last_updated: string;
}

// ============================================================================
// SKILL TREE INTERFACES
// ============================================================================

export interface SkillDomain {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon_name?: string;
  colour?: string;
  order_index: number;
  total_nodes: number;
  // Computed fields
  completed_nodes?: number;
  progress_percent?: number;
}

export interface SkillNode {
  id: string;
  domain_id: string;
  domain?: SkillDomain;
  slug: string;
  name: string;
  description?: string;
  tier: 1 | 2 | 3 | 4 | 5;
  xp_reward: number;
  prerequisites?: string[];
  lesson_ids?: string[];
  assessment_id?: string;
  estimated_minutes?: number;
  is_locked?: boolean;
  is_milestone?: boolean;
  sort_order?: number;
  order_index?: number;
}

export interface UserSkillProgress {
  id: string;
  user_id: string;
  node_id: string;
  node?: SkillNode;
  status: SkillStatus;
  progress_percent: number;
  started_at?: string;
  completed_at?: string;
  mastery_score?: number;
  attempts: number;
  time_spent_minutes: number;
}

// ============================================================================
// STREAK INTERFACES
// ============================================================================

export interface UserStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  streak_started_at?: string;
  freeze_tokens: number;
  total_active_days: number;
}

export interface DailyActivity {
  id: string;
  user_id: string;
  activity_date: string;
  lessons_completed: number;
  xp_earned: number;
  time_spent_minutes: number;
  badges_earned: number;
  first_activity_at: string;
  last_activity_at: string;
}

// ============================================================================
// LEADERBOARD INTERFACES
// ============================================================================

export interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  avatar_url?: string;
  department?: string;
  xp: number;
  activities?: number;
  rank: number;
  current_level?: number;
  user_rank?: UserRank;
}

export interface DepartmentLeaderboardEntry {
  department: string;
  members: number;
  total_xp: number;
  avg_xp: number;
  top_level: number;
  rank: number;
}

// ============================================================================
// SOCIAL INTERFACES
// ============================================================================

export interface PeerEndorsement {
  id: string;
  from_user_id: string;
  from_user?: UserProfile;
  to_user_id: string;
  to_user?: UserProfile;
  skill_domain_id?: string;
  skill_domain?: SkillDomain;
  message?: string;
  created_at: string;
}

// ============================================================================
// CHALLENGE INTERFACES
// ============================================================================

export interface Challenge {
  id: string;
  slug: string;
  name: string;
  description?: string;
  challenge_type: ChallengeType;
  status: ChallengeStatus;
  start_date: string;
  end_date: string;
  target_metric: string;
  target_value: number;
  xp_reward: number;
  badge_reward_id?: string;
  badge_reward?: Badge;
  max_participants?: number;
  is_featured: boolean;
  participants_count?: number;
}

export interface ChallengeParticipant {
  id: string;
  challenge_id: string;
  challenge?: Challenge;
  user_id: string;
  user?: UserProfile;
  team_name?: string;
  current_progress: number;
  joined_at: string;
  completed_at?: string;
}

// ============================================================================
// CERTIFICATE INTERFACES
// ============================================================================

export interface Certificate {
  id: string;
  user_id: string;
  certificate_type: CertificateType;
  title: string;
  description?: string;
  issued_at: string;
  valid_until?: string;
  verification_code: string;
  metadata: Record<string, unknown>;
  pdf_url?: string;
  is_public: boolean;
}

// ============================================================================
// NOTIFICATION INTERFACES
// ============================================================================

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message?: string;
  data: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

// ============================================================================
// ANALYTICS INTERFACES
// ============================================================================

export interface LearningAnalytics {
  id: string;
  user_id: string;
  lesson_id?: string;
  session_id?: string;
  time_spent_seconds: number;
  quiz_score?: number;
  difficulty_rating?: 1 | 2 | 3 | 4 | 5;
  engagement_score?: number;
  completion_rate?: number;
  created_at: string;
}

export interface UserLearningProfile {
  id: string;
  user_id: string;
  learning_pace: LearningPace;
  preferred_content_type: ContentPreference;
  strongest_domains: string[];
  weakest_domains: string[];
  recommended_next_steps: RecommendedStep[];
  total_learning_hours: number;
  average_session_minutes: number;
}

export interface RecommendedStep {
  type: 'lesson' | 'skill' | 'challenge' | 'review';
  id: string;
  title: string;
  reason: string;
  priority: number;
}

// ============================================================================
// LEVEL THRESHOLD INTERFACE
// ============================================================================

export interface LevelThreshold {
  level: number;
  xp_required: number;
  rank: UserRank;
  title: string;
  unlocks: string[];
}

// ============================================================================
// COMBINED USER GAMIFICATION STATE
// ============================================================================

export interface UserGamificationState {
  profile: UserProfile | null;
  xp: UserXP | null;
  streak: UserStreak | null;
  badges: UserBadge[];
  badgeProgress: BadgeProgress[];
  skillProgress: UserSkillProgress[];
  notifications: Notification[];
  recentXPTransactions: XPTransaction[];
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface AwardXPResponse {
  success: boolean;
  amount_awarded: number;
  new_total: number;
  level_up?: {
    new_level: number;
    new_rank: UserRank;
  };
  badges_earned?: Badge[];
}

export interface AwardBadgeResponse {
  success: boolean;
  badge: Badge;
  xp_awarded: number;
}

// ============================================================================
// TIER COLOURS FOR UI
// ============================================================================

export const TIER_COLOURS: Record<BadgeTier, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
  diamond: '#B9F2FF',
};

export const RARITY_COLOURS: Record<BadgeRarity, string> = {
  common: '#9CA3AF',
  uncommon: '#22C55E',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F59E0B',
};

export const RANK_COLOURS: Record<UserRank, string> = {
  'AI Apprentice': '#9CA3AF',
  'AI Practitioner': '#22C55E',
  'AI Specialist': '#3B82F6',
  'AI Champion': '#A855F7',
  'AI Architect': '#F59E0B',
  'AI Visionary': '#EC4899',
};

// ============================================================================
// XP REWARDS CONSTANTS
// ============================================================================

export const XP_REWARDS = {
  LESSON_COMPLETE_MIN: 25,
  LESSON_COMPLETE_MAX: 100,
  ASSESSMENT_PASS_MIN: 100,
  ASSESSMENT_PASS_MAX: 500,
  DAILY_LOGIN: 10,
  STREAK_7_DAYS: 50,
  STREAK_30_DAYS: 200,
  STREAK_90_DAYS: 600,
  ENDORSEMENT_GIVEN: 5,
  ENDORSEMENT_RECEIVED: 15,
  FIRST_OF_DAY: 25,
} as const;

// ============================================================================
// LEVEL THRESHOLDS
// ============================================================================

export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, xp_required: 0, rank: 'AI Apprentice', title: 'Newcomer', unlocks: ['Basic tutorials'] },
  { level: 2, xp_required: 50, rank: 'AI Apprentice', title: 'Learner', unlocks: [] },
  { level: 3, xp_required: 100, rank: 'AI Apprentice', title: 'Explorer', unlocks: [] },
  { level: 4, xp_required: 175, rank: 'AI Apprentice', title: 'Student', unlocks: [] },
  { level: 5, xp_required: 275, rank: 'AI Apprentice', title: 'Beginner', unlocks: ['Intermediate content'] },
  { level: 6, xp_required: 400, rank: 'AI Apprentice', title: 'Novice', unlocks: [] },
  { level: 7, xp_required: 600, rank: 'AI Apprentice', title: 'Initiate', unlocks: [] },
  { level: 8, xp_required: 750, rank: 'AI Practitioner', title: 'Practitioner', unlocks: ['AI Practitioner badge'] },
  { level: 9, xp_required: 1000, rank: 'AI Practitioner', title: 'Developer', unlocks: [] },
  { level: 10, xp_required: 1300, rank: 'AI Practitioner', title: 'Implementer', unlocks: ['Advanced content'] },
  { level: 11, xp_required: 1650, rank: 'AI Practitioner', title: 'Contributor', unlocks: [] },
  { level: 12, xp_required: 2000, rank: 'AI Practitioner', title: 'Builder', unlocks: [] },
  { level: 13, xp_required: 2250, rank: 'AI Practitioner', title: 'Craftsman', unlocks: [] },
  { level: 14, xp_required: 2500, rank: 'AI Practitioner', title: 'Artisan', unlocks: [] },
  { level: 15, xp_required: 3000, rank: 'AI Specialist', title: 'Specialist', unlocks: ['AI Specialist badge'] },
  { level: 20, xp_required: 5000, rank: 'AI Specialist', title: 'Expert', unlocks: ['Expert content'] },
  { level: 25, xp_required: 10500, rank: 'AI Champion', title: 'Champion', unlocks: ['AI Champion badge'] },
  { level: 30, xp_required: 17500, rank: 'AI Champion', title: 'Leader', unlocks: ['Leadership features'] },
  { level: 35, xp_required: 27000, rank: 'AI Architect', title: 'Architect', unlocks: ['AI Architect badge'] },
  { level: 40, xp_required: 38000, rank: 'AI Architect', title: 'Master', unlocks: ['Master content'] },
  { level: 45, xp_required: 60000, rank: 'AI Visionary', title: 'Visionary', unlocks: ['AI Visionary badge'] },
  { level: 50, xp_required: 100000, rank: 'AI Visionary', title: 'Legend', unlocks: ['Prestige system'] },
];

// ============================================================================
// SKILL NODE STATUS TYPE ALIAS
// ============================================================================

export type SkillNodeStatus = SkillStatus;
