// ============================================================================
// LEADERBOARD COMPONENT
// ============================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users, Building } from 'lucide-react';
import { useGamificationStore } from '../../stores/gamificationStore';
import type { LeaderboardEntry } from '../../types/gamification';
import { RANK_COLOURS } from '../../types/gamification';

type LeaderboardPeriod = 'weekly' | 'monthly' | 'alltime';

interface LeaderboardProps {
  className?: string;
  maxEntries?: number;
  showPeriodTabs?: boolean;
  highlightUserId?: string;
}

export function Leaderboard({
  className = '',
  maxEntries = 10,
  showPeriodTabs = true,
  highlightUserId,
}: LeaderboardProps) {
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  const weeklyLeaderboard = useGamificationStore((state) => state.weeklyLeaderboard);
  const monthlyLeaderboard = useGamificationStore((state) => state.monthlyLeaderboard);
  const allTimeLeaderboard = useGamificationStore((state) => state.allTimeLeaderboard);
  const currentUser = useGamificationStore((state) => state.user);

  const leaderboards: Record<LeaderboardPeriod, LeaderboardEntry[]> = {
    weekly: weeklyLeaderboard,
    monthly: monthlyLeaderboard,
    alltime: allTimeLeaderboard,
  };

  const entries = leaderboards[period].slice(0, maxEntries);
  const userId = highlightUserId || currentUser?.id;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Leaderboard</h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {entries.length} educators
          </span>
        </div>

        {/* Period tabs */}
        {showPeriodTabs && (
          <div className="flex gap-1 mt-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {(['weekly', 'monthly', 'alltime'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  period === p
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {p === 'weekly' && 'This Week'}
                {p === 'monthly' && 'This Month'}
                {p === 'alltime' && 'All Time'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard entries */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, index) => (
            <LeaderboardRow
              key={entry.user_id}
              entry={entry}
              index={index}
              isCurrentUser={entry.user_id === userId}
              period={period}
            />
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No entries yet</p>
            <p className="text-sm">Be the first to appear!</p>
          </div>
        )}
      </div>

      {/* Current user's position if not in top */}
      {userId && !entries.find((e) => e.user_id === userId) && (
        <div className="p-3 bg-sps-ruby/5 border-t border-sps-ruby/20">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Your rank: <span className="font-semibold">#{findUserRank(leaderboards[period], userId) || '—'}</span>
          </p>
        </div>
      )}
    </div>
  );
}

// Individual leaderboard row
function LeaderboardRow({
  entry,
  index,
  isCurrentUser,
  period,
}: {
  entry: LeaderboardEntry;
  index: number;
  isCurrentUser: boolean;
  period: LeaderboardPeriod;
}) {
  const rank = entry.rank || index + 1;
  const rankColour = entry.user_rank ? RANK_COLOURS[entry.user_rank] : '#9CA3AF';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
        isCurrentUser ? 'bg-sps-ruby/5 dark:bg-sps-ruby/10' : ''
      }`}
    >
      {/* Rank */}
      <div className="w-8 flex justify-center">
        {rank === 1 ? (
          <Trophy className="w-6 h-6 text-yellow-500" />
        ) : rank === 2 ? (
          <Medal className="w-6 h-6 text-gray-400" />
        ) : rank === 3 ? (
          <Award className="w-6 h-6 text-amber-600" />
        ) : (
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            #{rank}
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative">
        {entry.avatar_url ? (
          <img
            src={entry.avatar_url}
            alt={entry.display_name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: rankColour }}
          >
            {entry.display_name?.charAt(0).toUpperCase() || '?'}
          </div>
        )}
        {isCurrentUser && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sps-ruby rounded-full border-2 border-white dark:border-gray-800" />
        )}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${
          isCurrentUser ? 'text-sps-ruby' : 'text-gray-900 dark:text-white'
        }`}>
          {entry.display_name}
          {isCurrentUser && <span className="ml-1 text-xs">(You)</span>}
        </p>
        {entry.department && (
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Building className="w-3 h-3" />
            {entry.department}
          </p>
        )}
      </div>

      {/* XP */}
      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-white">
          {(period === 'alltime' ? entry.xp : entry.xp).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {period === 'alltime' ? 'Total XP' : 'XP'}
        </p>
      </div>

      {/* Level (all-time only) */}
      {period === 'alltime' && entry.current_level && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: rankColour }}
        >
          {entry.current_level}
        </div>
      )}
    </motion.div>
  );
}

// Helper to find user's rank
function findUserRank(entries: LeaderboardEntry[], userId: string): number | null {
  const entry = entries.find((e) => e.user_id === userId);
  return entry?.rank || null;
}

export default Leaderboard;
