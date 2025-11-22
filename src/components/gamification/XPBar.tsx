// ============================================================================
// XP PROGRESS BAR COMPONENT
// ============================================================================

import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import { useGamificationStore, selectNextLevelXP } from '../../stores/gamificationStore';
import { RANK_COLOURS } from '../../types/gamification';

interface XPBarProps {
  compact?: boolean;
  showDetails?: boolean;
  className?: string;
}

export function XPBar({ compact = false, showDetails = true, className = '' }: XPBarProps) {
  const xp = useGamificationStore((state) => state.xp);
  const levelProgress = useGamificationStore(selectNextLevelXP);

  if (!xp) return null;

  const rankColour = RANK_COLOURS[xp.rank] || '#9CA3AF';

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>{xp.total_xp.toLocaleString()} XP</span>
        </div>
        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress.percent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Lv.{xp.current_level}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: rankColour }}
          >
            {xp.current_level}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Level {xp.current_level}
            </p>
            <p className="text-sm" style={{ color: rankColour }}>
              {xp.rank}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-lg font-bold text-gray-900 dark:text-white">
            <Zap className="w-5 h-5 text-yellow-500" />
            {xp.total_xp.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total XP</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${rankColour}, ${adjustColour(rankColour, 20)})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress.percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 h-3 rounded-full opacity-50 blur-sm"
          style={{
            background: `linear-gradient(90deg, ${rankColour}, ${adjustColour(rankColour, 20)})`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${levelProgress.percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Details */}
      {showDetails && (
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {levelProgress.current.toLocaleString()} / {levelProgress.required.toLocaleString()} XP
          </span>
          <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {xp.xp_to_next_level.toLocaleString()} to Level {xp.current_level + 1}
          </span>
        </div>
      )}

      {/* Prestige indicator */}
      {xp.prestige_level > 0 && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium">
            Prestige {xp.prestige_level}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {Math.round((xp.xp_multiplier - 1) * 100)}% XP bonus
          </span>
        </div>
      )}
    </div>
  );
}

// Helper to adjust colour brightness
function adjustColour(colour: string, amount: number): string {
  const hex = colour.replace('#', '');
  const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default XPBar;
