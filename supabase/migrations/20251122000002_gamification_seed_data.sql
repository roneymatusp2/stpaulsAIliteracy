-- ============================================================================
-- ST PAUL'S AI TEACHERS - GAMIFICATION SEED DATA
-- Migration: Badge Definitions & Skill Domains
-- Created: 2025-11-22
-- ============================================================================

-- ============================================================================
-- SKILL DOMAINS (5 Core Areas)
-- ============================================================================

INSERT INTO skill_domains (slug, name, description, icon_name, colour, order_index) VALUES
  ('prompting', 'AI Prompting', 'Master the art of communicating effectively with AI systems through well-crafted prompts', 'message-square', '#3B82F6', 1),
  ('ethics', 'AI Ethics & Safety', 'Understand the ethical implications, biases, and responsible use of AI in education', 'shield-check', '#10B981', 2),
  ('integration', 'Classroom Integration', 'Learn to seamlessly integrate AI tools into your teaching practice and curriculum', 'layout-grid', '#8B5CF6', 3),
  ('assessment', 'AI-Enhanced Assessment', 'Leverage AI for formative and summative assessment, feedback, and analytics', 'clipboard-check', '#F59E0B', 4),
  ('creation', 'AI Content Creation', 'Create engaging educational content using generative AI tools', 'sparkles', '#EC4899', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SKILL NODES - PROMPTING DOMAIN
-- ============================================================================

INSERT INTO skill_nodes (domain_id, slug, name, description, tier, xp_reward, estimated_minutes, sort_order) VALUES
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'basic-prompting', 'Basic Prompting', 'Learn the fundamentals of writing effective AI prompts', 1, 50, 20, 1),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'prompt-structure', 'Prompt Structure', 'Understand how to structure prompts for clarity and precision', 1, 75, 25, 2),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'context-setting', 'Context Setting', 'Master the art of providing relevant context to AI systems', 2, 100, 30, 3),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'role-prompting', 'Role-Based Prompting', 'Use role assignment to guide AI behaviour and responses', 2, 100, 30, 4),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'chain-of-thought', 'Chain of Thought', 'Apply step-by-step reasoning prompts for complex tasks', 3, 150, 40, 5),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'few-shot-learning', 'Few-Shot Learning', 'Provide examples to guide AI output format and style', 3, 150, 40, 6),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'advanced-techniques', 'Advanced Techniques', 'Master meta-prompting, prompt chaining, and iterative refinement', 4, 200, 50, 7),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'domain-specific', 'Domain-Specific Prompting', 'Specialise prompts for different subjects and educational contexts', 4, 200, 50, 8),
  ((SELECT id FROM skill_domains WHERE slug = 'prompting'), 'prompting-mastery', 'Prompting Mastery', 'Demonstrate comprehensive mastery of AI prompting techniques', 5, 300, 60, 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SKILL NODES - ETHICS DOMAIN
-- ============================================================================

INSERT INTO skill_nodes (domain_id, slug, name, description, tier, xp_reward, estimated_minutes, sort_order) VALUES
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'ai-fundamentals', 'AI Fundamentals', 'Understand how AI systems work and their limitations', 1, 50, 25, 1),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'bias-awareness', 'Bias Awareness', 'Recognise and understand AI biases and their sources', 1, 75, 30, 2),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'privacy-safety', 'Privacy & Data Safety', 'Protect student data and maintain privacy when using AI', 2, 100, 35, 3),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'academic-integrity', 'Academic Integrity', 'Navigate AI use policies and maintain academic honesty', 2, 100, 30, 4),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'bias-mitigation', 'Bias Detection & Mitigation', 'Identify and address biases in AI outputs', 3, 150, 40, 5),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'ethical-frameworks', 'Ethical Frameworks', 'Apply ethical decision-making frameworks to AI use', 3, 150, 40, 6),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'policy-development', 'Policy Development', 'Contribute to school AI policies and guidelines', 4, 200, 50, 7),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'student-education', 'Teaching AI Ethics', 'Educate students about responsible AI use', 4, 200, 45, 8),
  ((SELECT id FROM skill_domains WHERE slug = 'ethics'), 'ethics-mastery', 'Ethics Mastery', 'Demonstrate comprehensive understanding of AI ethics in education', 5, 300, 60, 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SKILL NODES - INTEGRATION DOMAIN
-- ============================================================================

INSERT INTO skill_nodes (domain_id, slug, name, description, tier, xp_reward, estimated_minutes, sort_order) VALUES
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'tool-selection', 'AI Tool Selection', 'Evaluate and select appropriate AI tools for educational purposes', 1, 50, 25, 1),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'basic-integration', 'Basic Integration', 'Introduce AI tools into simple classroom activities', 1, 75, 30, 2),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'lesson-planning', 'AI-Enhanced Lesson Planning', 'Use AI to assist in creating and refining lesson plans', 2, 100, 35, 3),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'differentiation', 'AI for Differentiation', 'Personalise learning experiences using AI tools', 2, 100, 35, 4),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'student-engagement', 'Student Engagement Strategies', 'Use AI to boost student engagement and participation', 3, 150, 40, 5),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'workflow-automation', 'Workflow Automation', 'Streamline administrative tasks with AI assistance', 3, 150, 40, 6),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'curriculum-design', 'AI-Informed Curriculum Design', 'Design curricula that leverage AI capabilities effectively', 4, 200, 50, 7),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'advanced-workflows', 'Advanced AI Workflows', 'Create sophisticated multi-tool AI workflows', 4, 200, 50, 8),
  ((SELECT id FROM skill_domains WHERE slug = 'integration'), 'integration-mastery', 'Integration Mastery', 'Demonstrate expert-level AI integration in teaching practice', 5, 300, 60, 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SKILL NODES - ASSESSMENT DOMAIN
-- ============================================================================

INSERT INTO skill_nodes (domain_id, slug, name, description, tier, xp_reward, estimated_minutes, sort_order) VALUES
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'feedback-basics', 'AI Feedback Basics', 'Use AI to provide basic feedback on student work', 1, 50, 25, 1),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'formative-assessment', 'Formative Assessment Tools', 'Implement AI-powered formative assessment strategies', 1, 75, 30, 2),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'rubric-design', 'AI-Assisted Rubric Design', 'Create effective rubrics with AI assistance', 2, 100, 35, 3),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'automated-grading', 'Automated Grading', 'Implement AI grading for appropriate assessment types', 2, 100, 35, 4),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'learning-analytics', 'Learning Analytics', 'Interpret AI-generated learning analytics and insights', 3, 150, 40, 5),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'personalised-feedback', 'Personalised Feedback Systems', 'Develop sophisticated AI-enhanced feedback mechanisms', 3, 150, 40, 6),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'assessment-design', 'AI-Informed Assessment Design', 'Design assessments that appropriately account for AI', 4, 200, 50, 7),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'predictive-analytics', 'Predictive Analytics', 'Use AI to identify at-risk students and intervention points', 4, 200, 50, 8),
  ((SELECT id FROM skill_domains WHERE slug = 'assessment'), 'assessment-mastery', 'Assessment Mastery', 'Demonstrate comprehensive mastery of AI-enhanced assessment', 5, 300, 60, 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SKILL NODES - CREATION DOMAIN
-- ============================================================================

INSERT INTO skill_nodes (domain_id, slug, name, description, tier, xp_reward, estimated_minutes, sort_order) VALUES
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'text-generation', 'Text Generation Basics', 'Create educational text content with AI assistance', 1, 50, 25, 1),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'question-generation', 'Question Generation', 'Generate effective questions and quizzes using AI', 1, 75, 30, 2),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'visual-content', 'Visual Content Creation', 'Create images, diagrams, and visual aids with AI', 2, 100, 35, 3),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'presentation-design', 'AI Presentation Design', 'Design engaging presentations with AI assistance', 2, 100, 35, 4),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'interactive-content', 'Interactive Content', 'Create interactive learning experiences with AI', 3, 150, 40, 5),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'video-audio', 'Video & Audio Creation', 'Generate educational video and audio content', 3, 150, 40, 6),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'adaptive-content', 'Adaptive Content Systems', 'Create content that adapts to learner needs', 4, 200, 50, 7),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'multimodal-creation', 'Multimodal Content Creation', 'Combine multiple AI tools for rich content creation', 4, 200, 50, 8),
  ((SELECT id FROM skill_domains WHERE slug = 'creation'), 'creation-mastery', 'Creation Mastery', 'Demonstrate expert-level AI content creation skills', 5, 300, 60, 9)
ON CONFLICT (slug) DO NOTHING;

-- Update prerequisites
UPDATE skill_nodes SET prerequisites = ARRAY[(SELECT id FROM skill_nodes WHERE slug = 'basic-prompting')] WHERE slug = 'prompt-structure';
UPDATE skill_nodes SET prerequisites = ARRAY[(SELECT id FROM skill_nodes WHERE slug = 'prompt-structure')] WHERE slug = 'context-setting';
UPDATE skill_nodes SET prerequisites = ARRAY[(SELECT id FROM skill_nodes WHERE slug = 'prompt-structure')] WHERE slug = 'role-prompting';
UPDATE skill_nodes SET prerequisites = ARRAY[(SELECT id FROM skill_nodes WHERE slug = 'context-setting'), (SELECT id FROM skill_nodes WHERE slug = 'role-prompting')] WHERE slug = 'chain-of-thought';

-- ============================================================================
-- BADGE DEFINITIONS
-- ============================================================================

-- Milestone Badges - First Steps
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('first-steps', 'First Steps', 'Complete your first lesson on the AI literacy journey', 'milestone', 'bronze', 'footprints', '#CD7F32', 25, 'common', '{"type": "lessons_completed", "count": 1}', 1)
ON CONFLICT (slug) DO NOTHING;

-- Milestone Badges - Knowledge Seeker (Tiered)
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('knowledge-seeker-bronze', 'Knowledge Seeker', 'Complete 5 lessons', 'milestone', 'bronze', 'book-open', '#CD7F32', 50, 'common', '{"type": "lessons_completed", "count": 5}', 10),
  ('knowledge-seeker-silver', 'Knowledge Seeker', 'Complete 25 lessons', 'milestone', 'silver', 'book-open', '#C0C0C0', 100, 'uncommon', '{"type": "lessons_completed", "count": 25}', 11),
  ('knowledge-seeker-gold', 'Knowledge Seeker', 'Complete 50 lessons', 'milestone', 'gold', 'book-open', '#FFD700', 200, 'rare', '{"type": "lessons_completed", "count": 50}', 12),
  ('knowledge-seeker-platinum', 'Knowledge Seeker', 'Complete 100 lessons', 'milestone', 'platinum', 'book-open', '#E5E4E2', 400, 'epic', '{"type": "lessons_completed", "count": 100}', 13),
  ('knowledge-seeker-diamond', 'Knowledge Seeker', 'Complete 200 lessons', 'milestone', 'diamond', 'book-open', '#B9F2FF', 800, 'legendary', '{"type": "lessons_completed", "count": 200}', 14)
ON CONFLICT (slug) DO NOTHING;

-- Milestone Badges - Dedicated Learner (Streaks)
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('dedicated-learner-bronze', 'Dedicated Learner', 'Maintain a 7-day learning streak', 'milestone', 'bronze', 'flame', '#CD7F32', 50, 'common', '{"type": "streak_days", "count": 7}', 20),
  ('dedicated-learner-silver', 'Dedicated Learner', 'Maintain a 30-day learning streak', 'milestone', 'silver', 'flame', '#C0C0C0', 200, 'uncommon', '{"type": "streak_days", "count": 30}', 21),
  ('dedicated-learner-gold', 'Dedicated Learner', 'Maintain a 90-day learning streak', 'milestone', 'gold', 'flame', '#FFD700', 600, 'rare', '{"type": "streak_days", "count": 90}', 22),
  ('dedicated-learner-platinum', 'Dedicated Learner', 'Maintain a 180-day learning streak', 'milestone', 'platinum', 'flame', '#E5E4E2', 1000, 'epic', '{"type": "streak_days", "count": 180}', 23),
  ('dedicated-learner-diamond', 'Dedicated Learner', 'Maintain a 365-day learning streak', 'milestone', 'diamond', 'flame', '#B9F2FF', 2500, 'legendary', '{"type": "streak_days", "count": 365}', 24)
ON CONFLICT (slug) DO NOTHING;

-- Milestone Badges - Social Butterfly (Endorsements)
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('social-butterfly-bronze', 'Social Butterfly', 'Receive 5 peer endorsements', 'social', 'bronze', 'users', '#CD7F32', 50, 'common', '{"type": "endorsements_received", "count": 5}', 30),
  ('social-butterfly-silver', 'Social Butterfly', 'Receive 25 peer endorsements', 'social', 'silver', 'users', '#C0C0C0', 100, 'uncommon', '{"type": "endorsements_received", "count": 25}', 31),
  ('social-butterfly-gold', 'Social Butterfly', 'Receive 50 peer endorsements', 'social', 'gold', 'users', '#FFD700', 200, 'rare', '{"type": "endorsements_received", "count": 50}', 32)
ON CONFLICT (slug) DO NOTHING;

-- Skill Mastery Badges
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('prompt-pioneer', 'Prompt Pioneer', 'Master the AI Prompting skill domain', 'skill', 'gold', 'message-square', '#3B82F6', 500, 'rare', '{"type": "domain_mastery", "domain": "prompting"}', 40),
  ('ethics-guardian', 'Ethics Guardian', 'Master the AI Ethics & Safety skill domain', 'skill', 'gold', 'shield-check', '#10B981', 500, 'rare', '{"type": "domain_mastery", "domain": "ethics"}', 41),
  ('classroom-innovator', 'Classroom Innovator', 'Master the Classroom Integration skill domain', 'skill', 'gold', 'layout-grid', '#8B5CF6', 500, 'rare', '{"type": "domain_mastery", "domain": "integration"}', 42),
  ('assessment-architect', 'Assessment Architect', 'Master the AI-Enhanced Assessment skill domain', 'skill', 'gold', 'clipboard-check', '#F59E0B', 500, 'rare', '{"type": "domain_mastery", "domain": "assessment"}', 43),
  ('creator-champion', 'Creator Champion', 'Master the AI Content Creation skill domain', 'skill', 'gold', 'sparkles', '#EC4899', 500, 'rare', '{"type": "domain_mastery", "domain": "creation"}', 44)
ON CONFLICT (slug) DO NOTHING;

-- Mastery Badges
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('ai-literacy-master', 'AI Literacy Master', 'Complete all core modules across all skill domains', 'mastery', 'diamond', 'graduation-cap', '#820021', 2000, 'legendary', '{"type": "all_domains_complete"}', 50),
  ('triple-threat', 'Triple Threat', 'Achieve mastery in three different skill domains', 'mastery', 'platinum', 'trophy', '#E5E4E2', 1000, 'epic', '{"type": "domains_mastered", "count": 3}', 51),
  ('polymath', 'Polymath', 'Achieve mastery in all five skill domains', 'mastery', 'diamond', 'crown', '#B9F2FF', 3000, 'legendary', '{"type": "domains_mastered", "count": 5}', 52),
  ('perfectionist', 'Perfectionist', 'Score 100% on any assessment', 'mastery', 'gold', 'target', '#FFD700', 250, 'rare', '{"type": "perfect_score"}', 53)
ON CONFLICT (slug) DO NOTHING;

-- Secret/Hidden Badges
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, is_hidden, requirements, sort_order) VALUES
  ('night-owl', 'Night Owl', 'Complete a lesson after midnight', 'secret', 'silver', 'moon', '#6366F1', 75, 'uncommon', true, '{"type": "time_based", "condition": "after_midnight"}', 60),
  ('early-bird', 'Early Bird', 'Complete a lesson before 6 AM', 'secret', 'silver', 'sunrise', '#F97316', 75, 'uncommon', true, '{"type": "time_based", "condition": "before_6am"}', 61),
  ('weekend-warrior', 'Weekend Warrior', 'Complete 5 lessons on a single weekend', 'secret', 'gold', 'swords', '#EF4444', 150, 'rare', true, '{"type": "weekend_lessons", "count": 5}', 62),
  ('speed-demon', 'Speed Demon', 'Complete a module in under 10 minutes', 'secret', 'silver', 'zap', '#FBBF24', 100, 'uncommon', true, '{"type": "speed_completion", "minutes": 10}', 63),
  ('comeback-kid', 'Comeback Kid', 'Return after 30+ days of inactivity', 'secret', 'gold', 'heart', '#EC4899', 100, 'rare', true, '{"type": "return_after_absence", "days": 30}', 64),
  ('explorer', 'Explorer', 'Visit every section of the platform', 'secret', 'bronze', 'compass', '#14B8A6', 50, 'common', true, '{"type": "platform_exploration"}', 65),
  ('helping-hand', 'Helping Hand', 'Give 10 peer endorsements', 'secret', 'silver', 'hand-helping', '#8B5CF6', 75, 'uncommon', true, '{"type": "endorsements_given", "count": 10}', 66)
ON CONFLICT (slug) DO NOTHING;

-- Level Achievement Badges
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('level-10', 'Rising Star', 'Reach Level 10', 'milestone', 'silver', 'star', '#C0C0C0', 100, 'uncommon', '{"type": "level_reached", "level": 10}', 70),
  ('level-25', 'Established Expert', 'Reach Level 25', 'milestone', 'gold', 'star', '#FFD700', 250, 'rare', '{"type": "level_reached", "level": 25}', 71),
  ('level-50', 'Master Educator', 'Reach Level 50', 'milestone', 'diamond', 'star', '#B9F2FF', 1000, 'legendary', '{"type": "level_reached", "level": 50}', 72)
ON CONFLICT (slug) DO NOTHING;

-- Event/Special Badges
INSERT INTO badges (slug, name, description, category, tier, icon_name, icon_colour, xp_reward, rarity, requirements, sort_order) VALUES
  ('founding-member', 'Founding Member', 'Joined during the platform launch period', 'event', 'platinum', 'flag', '#820021', 500, 'epic', '{"type": "joined_before", "date": "2025-12-31"}', 80),
  ('beta-tester', 'Beta Tester', 'Helped test the platform before official launch', 'event', 'gold', 'flask', '#F59E0B', 300, 'rare', '{"type": "beta_tester"}', 81)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- INITIAL CHALLENGES
-- ============================================================================

INSERT INTO challenges (slug, name, description, challenge_type, status, start_date, end_date, target_metric, target_value, xp_reward) VALUES
  ('november-sprint', 'November Learning Sprint', 'Complete 10 lessons before the end of November 2025', 'individual', 'active', '2025-11-01', '2025-11-30', 'lessons_completed', 10, 500),
  ('first-week-challenge', 'First Week Challenge', 'Earn 500 XP in your first week on the platform', 'individual', 'active', '2025-11-01', '2025-12-31', 'xp_earned', 500, 250)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- UPDATE DOMAIN TOTALS
-- ============================================================================

UPDATE skill_domains SET total_nodes = (
  SELECT COUNT(*) FROM skill_nodes WHERE domain_id = skill_domains.id
);

-- ============================================================================
-- CREATE UNIQUE INDEXES FOR LEADERBOARD VIEWS
-- ============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_leaderboard_weekly_user ON leaderboard_weekly(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leaderboard_monthly_user ON leaderboard_monthly(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leaderboard_alltime_user ON leaderboard_alltime(user_id);

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
