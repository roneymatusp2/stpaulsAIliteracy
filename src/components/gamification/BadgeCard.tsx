// ============================================================================
// BADGE CARD COMPONENT
// ============================================================================

import { motion } from 'framer-motion';
import {
  Award, Star, Trophy, Flame, BookOpen, Users, Shield, Target,
  MessageSquare, Sparkles, ClipboardCheck, LayoutGrid, GraduationCap,
  Crown, Zap, Moon, Sunrise, Swords, Heart, Compass, Hand, Flag, Flask,
  Footprints,
} from 'lucide-react';
import type { Badge, UserBadge, BadgeTier, BadgeRarity } from '../../types/gamification';
import { TIER_COLOURS, RARITY_COLOURS } from '../../types/gamification';

// Icon mapping
const ICON_MAP: Record<string, React.ElementType> = {
  award: Award,
  star: Star,
  trophy: Trophy,
  flame: Flame,
  'book-open': BookOpen,
  users: Users,
  'shield-check': Shield,
  target: Target,
  'message-square': MessageSquare,
  sparkles: Sparkles,
  'clipboard-check': ClipboardCheck,
  'layout-grid': LayoutGrid,
  'graduation-cap': GraduationCap,
  crown: Crown,
  zap: Zap,
  moon: Moon,
  sunrise: Sunrise,
  swords: Swords,
  heart: Heart,
  compass: Compass,
  'hand-helping': Hand,
  flag: Flag,
  flask: Flask,
  footprints: Footprints,
};

interface BadgeCardProps {
  badge: Badge;
  userBadge?: UserBadge;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  isLocked?: boolean;
  progress?: number;
  onClick?: () => void;
}

export function BadgeCard({
  badge,
  userBadge,
  size = 'md',
  showDetails = true,
  isLocked = false,
  progress,
  onClick,
}: BadgeCardProps) {
  const IconComponent = ICON_MAP[badge.icon_name] || Award;
  const tierColour = TIER_COLOURS[badge.tier];
  const rarityColour = RARITY_COLOURS[badge.rarity];
  const isEarned = !!userBadge;
  const isHidden = badge.is_hidden && !isEarned;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <motion.div
      className={`relative flex flex-col items-center cursor-pointer group ${
        onClick ? 'cursor-pointer' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Badge Container */}
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
          isLocked || isHidden
            ? 'bg-gray-200 dark:bg-gray-700'
            : isEarned
            ? 'shadow-lg'
            : 'bg-gray-100 dark:bg-gray-800 opacity-50'
        }`}
        style={{
          background: isEarned && !isHidden
            ? `linear-gradient(135deg, ${tierColour}20, ${tierColour}40)`
            : undefined,
          border: isEarned ? `3px solid ${tierColour}` : '3px solid transparent',
        }}
      >
        {/* Tier glow effect */}
        {isEarned && (
          <div
            className="absolute inset-0 opacity-20 blur-xl"
            style={{ backgroundColor: tierColour }}
          />
        )}

        {/* Icon */}
        {isHidden ? (
          <div className="text-gray-400 dark:text-gray-500">
            <span className={`${iconSizes[size]} flex items-center justify-center text-2xl`}>?</span>
          </div>
        ) : (
          <IconComponent
            className={`${iconSizes[size]} ${
              isLocked ? 'text-gray-400 dark:text-gray-500' : ''
            }`}
            style={{ color: isEarned ? badge.icon_colour : undefined }}
          />
        )}

        {/* Progress ring */}
        {progress !== undefined && progress < 100 && !isEarned && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={tierColour}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.89} 289`}
              className="transition-all duration-500"
            />
          </svg>
        )}

        {/* New badge indicator */}
        {userBadge?.is_new && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </div>

      {/* Badge Details */}
      {showDetails && (
        <div className="mt-2 text-center max-w-[120px]">
          <p
            className={`text-sm font-medium truncate ${
              isHidden
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {isHidden ? '???' : badge.name}
          </p>

          {/* Tier badge */}
          <div className="flex items-center justify-center gap-1 mt-1">
            <TierBadge tier={badge.tier} />
            {!isHidden && (
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${rarityColour}20`,
                  color: rarityColour,
                }}
              >
                {badge.rarity}
              </span>
            )}
          </div>

          {/* XP reward */}
          {!isHidden && isEarned && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 flex items-center justify-center gap-0.5">
              <Zap className="w-3 h-3" />
              +{badge.xp_reward} XP
            </p>
          )}

          {/* Earned date */}
          {userBadge && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(userBadge.awarded_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      )}

      {/* Tooltip on hover */}
      {!showDetails && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {isHidden ? 'Secret Badge' : badge.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </motion.div>
  );
}

// Tier badge component
function TierBadge({ tier }: { tier: BadgeTier }) {
  const colour = TIER_COLOURS[tier];

  return (
    <span
      className="text-xs px-1.5 py-0.5 rounded font-medium capitalize"
      style={{
        backgroundColor: `${colour}20`,
        color: colour,
      }}
    >
      {tier}
    </span>
  );
}

export default BadgeCard;
