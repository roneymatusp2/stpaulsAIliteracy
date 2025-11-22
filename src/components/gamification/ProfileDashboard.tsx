// ============================================================================
// PROFILE DASHBOARD - MAIN GAMIFICATION HUB
// ============================================================================

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Settings, LogOut, Award, Flame, Trophy, BookOpen,
  Calendar, TrendingUp, Star, Medal, Crown, Target,
  ExternalLink, Share2, Download,
} from 'lucide-react';
import { useGamificationStore } from '../../stores/gamificationStore';
import { RANK_COLOURS } from '../../types/gamification';
import XPBar from './XPBar';
import StreakCounter from './StreakCounter';
import BadgeCard from './BadgeCard';
import Leaderboard from './Leaderboard';
import SkillTree from './SkillTree';

interface ProfileDashboardProps {
  className?: string;
  onSignOut?: () => void;
  onSettingsClick?: () => void;
}

export function ProfileDashboard({
  className = '',
  onSignOut,
  onSettingsClick,
}: ProfileDashboardProps) {
  const user = useGamificationStore((state) => state.user);
  const xp = useGamificationStore((state) => state.xp);
  const streak = useGamificationStore((state) => state.streak);
  const badges = useGamificationStore((state) => state.badges);
  const allBadges = useGamificationStore((state) => state.allBadges);
  const skillProgress = useGamificationStore((state) => state.skillProgress);
  const isLoading = useGamificationStore((state) => state.isLoading);
  const refreshAll = useGamificationStore((state) => state.refreshAll);

  // Refresh data on mount
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sps-ruby" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Sign in to view your profile
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress, earn badges, and compete on leaderboards
        </p>
      </div>
    );
  }

  const rankColour = RANK_COLOURS[xp?.rank || 'AI Apprentice'];
  const earnedBadges = badges.filter((b) => b.badge);
  const featuredBadges = badges.filter((b) => b.is_featured).slice(0, 3);
  const recentBadges = badges.slice(0, 6);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Profile Header */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Banner */}
        <div
          className="h-32 relative"
          style={{
            background: `linear-gradient(135deg, ${rankColour}, ${adjustColour(rankColour, -30)})`,
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="white" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onSignOut}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Profile info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700"
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.display_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: rankColour }}
                >
                  {user.display_name?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
            </div>

            {/* Level badge */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800"
              style={{ backgroundColor: rankColour }}
            >
              {xp?.current_level || 1}
            </div>
          </div>

          {/* Name and rank */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.display_name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-sm font-medium"
                  style={{ color: rankColour }}
                >
                  {xp?.rank || 'AI Apprentice'}
                </span>
                {user.department && (
                  <>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.department}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {xp?.total_xp?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">XP</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {earnedBadges.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {streak?.current_streak || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-4">
            <XPBar showDetails />
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Stats & Streak */}
        <div className="space-y-6">
          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StreakCounter />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sps-ruby" />
              Statistics
            </h3>
            <div className="space-y-3">
              <StatRow
                icon={Calendar}
                label="Member since"
                value={new Date(user.joined_at || user.created_at || new Date()).toLocaleDateString('en-GB', {
                  month: 'short',
                  year: 'numeric',
                })}
              />
              <StatRow
                icon={Target}
                label="Challenges completed"
                value="12"
              />
              <StatRow
                icon={Star}
                label="Skills mastered"
                value={String(skillProgress.filter((s) => s.status === 'mastered').length)}
              />
              <StatRow
                icon={Award}
                label="Rare badges"
                value={String(badges.filter((b) => ['rare', 'epic', 'legendary'].includes(b.badge?.rarity || '')).length)}
              />
            </div>
          </motion.div>

          {/* Featured badges */}
          {featuredBadges.length > 0 && (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Featured Badges
              </h3>
              <div className="flex justify-center gap-4">
                {featuredBadges.map((userBadge) => (
                  <BadgeCard
                    key={userBadge.id}
                    badge={userBadge.badge!}
                    userBadge={userBadge}
                    size="md"
                    showDetails={false}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Middle column - Badges & Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent badges */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-sps-ruby" />
                Recent Badges
              </h3>
              <a
                href="/badges"
                className="text-sm text-sps-ruby hover:underline flex items-center gap-1"
              >
                View all
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {recentBadges.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {recentBadges.map((userBadge) => (
                  <BadgeCard
                    key={userBadge.id}
                    badge={userBadge.badge!}
                    userBadge={userBadge}
                    size="sm"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Medal className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No badges earned yet</p>
                <p className="text-sm">Complete activities to earn your first badge!</p>
              </div>
            )}

            {/* Badge progress */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Badge collection progress</span>
                <span>
                  {earnedBadges.length} / {allBadges.length} badges
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sps-ruby to-red-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${allBadges.length > 0 ? (earnedBadges.length / allBadges.length) * 100 : 0}%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Skill Tree Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SkillTree />
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Leaderboard
              maxEntries={5}
              highlightUserId={user.id}
            />
          </motion.div>
        </div>
      </div>

      {/* Certificates section */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sps-ruby" />
            Certificates & Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder certificates */}
          <CertificateCard
            title="AI Literacy Foundations"
            date="Coming soon"
            isLocked
          />
          <CertificateCard
            title="Prompt Engineering Specialist"
            date="Coming soon"
            isLocked
          />
          <CertificateCard
            title="AI Ethics Champion"
            date="Coming soon"
            isLocked
          />
        </div>
      </motion.div>
    </div>
  );
}

// Stat row component
function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

// Certificate card component
function CertificateCard({
  title,
  date,
  isLocked = false,
  onDownload,
  onShare,
}: {
  title: string;
  date: string;
  isLocked?: boolean;
  onDownload?: () => void;
  onShare?: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-xl border-2 ${
        isLocked
          ? 'border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
          : 'border-sps-ruby/20 bg-sps-ruby/5'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isLocked
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'bg-sps-ruby/20'
        }`}>
          {isLocked ? (
            <span className="text-gray-400">🔒</span>
          ) : (
            <BookOpen className="w-5 h-5 text-sps-ruby" />
          )}
        </div>

        {!isLocked && (
          <div className="flex gap-1">
            <button
              onClick={onDownload}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={onShare}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      <h4 className={`mt-3 font-medium ${
        isLocked
          ? 'text-gray-500 dark:text-gray-400'
          : 'text-gray-900 dark:text-white'
      }`}>
        {title}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {date}
      </p>
    </div>
  );
}

// Helper to adjust colour brightness
function adjustColour(colour: string, amount: number): string {
  const hex = colour.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default ProfileDashboard;
