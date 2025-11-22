// ============================================================================
// STREAK COUNTER COMPONENT
// ============================================================================

import { motion } from 'framer-motion';
import { Flame, Snowflake, Calendar, TrendingUp } from 'lucide-react';
import { useGamificationStore } from '../../stores/gamificationStore';

interface StreakCounterProps {
  compact?: boolean;
  className?: string;
}

export function StreakCounter({ compact = false, className = '' }: StreakCounterProps) {
  const streak = useGamificationStore((state) => state.streak);

  if (!streak) return null;

  const streakColour = getStreakColour(streak.current_streak);
  const isOnFire = streak.current_streak >= 7;

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <motion.div
          animate={isOnFire ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          <Flame className="w-5 h-5" style={{ color: streakColour }} />
        </motion.div>
        <span className="font-bold" style={{ color: streakColour }}>
          {streak.current_streak}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Main streak display */}
      <div className="flex items-center gap-4">
        <motion.div
          className="relative"
          animate={isOnFire ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${streakColour}20, ${streakColour}40)`,
              border: `3px solid ${streakColour}`,
            }}
          >
            <Flame className="w-8 h-8" style={{ color: streakColour }} />
          </div>
          {/* Animated glow for long streaks */}
          {streak.current_streak >= 30 && (
            <motion.div
              className="absolute inset-0 rounded-full opacity-50"
              style={{ backgroundColor: streakColour }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </motion.div>

        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span
              className="text-3xl font-bold"
              style={{ color: streakColour }}
            >
              {streak.current_streak}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              day{streak.current_streak !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getStreakMessage(streak.current_streak)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Best</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {streak.longest_streak}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Total</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {streak.total_active_days}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
            <Snowflake className="w-4 h-4" />
            <span className="text-sm">Freezes</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {streak.freeze_tokens}
          </p>
        </div>
      </div>

      {/* Streak milestones progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Next milestone</span>
          <span>{getNextMilestone(streak.current_streak)} days</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: streakColour }}
            initial={{ width: 0 }}
            animate={{ width: `${getMilestoneProgress(streak.current_streak)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getStreakColour(streak: number): string {
  if (streak >= 365) return '#EC4899'; // Pink - legendary
  if (streak >= 180) return '#F59E0B'; // Amber - epic
  if (streak >= 90) return '#8B5CF6'; // Purple - rare
  if (streak >= 30) return '#3B82F6'; // Blue - uncommon
  if (streak >= 7) return '#F97316'; // Orange - on fire
  return '#6B7280'; // Gray - starting
}

function getStreakMessage(streak: number): string {
  if (streak >= 365) return 'Legendary dedication! A full year!';
  if (streak >= 180) return 'Incredible! Half a year strong!';
  if (streak >= 90) return 'Amazing! Three months of learning!';
  if (streak >= 30) return 'Fantastic! A whole month!';
  if (streak >= 14) return 'Brilliant! Two weeks going strong!';
  if (streak >= 7) return 'You\'re on fire! Keep it up!';
  if (streak >= 3) return 'Great start! Building momentum!';
  if (streak >= 1) return 'Keep going! Every day counts!';
  return 'Start your streak today!';
}

function getNextMilestone(streak: number): number {
  const milestones = [3, 7, 14, 30, 60, 90, 180, 365];
  return milestones.find((m) => m > streak) || streak + 30;
}

function getMilestoneProgress(streak: number): number {
  const milestones = [0, 3, 7, 14, 30, 60, 90, 180, 365];
  let prevMilestone = 0;
  let nextMilestone = 3;

  for (let i = 0; i < milestones.length - 1; i++) {
    if (streak >= milestones[i] && streak < milestones[i + 1]) {
      prevMilestone = milestones[i];
      nextMilestone = milestones[i + 1];
      break;
    }
  }

  if (streak >= 365) return 100;
  return Math.round(((streak - prevMilestone) / (nextMilestone - prevMilestone)) * 100);
}

export default StreakCounter;
