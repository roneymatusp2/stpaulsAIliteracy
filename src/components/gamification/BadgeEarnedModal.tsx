// ============================================================================
// BADGE EARNED CELEBRATION MODAL
// ============================================================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Zap, Share2, Star,
  Award, Trophy, Flame, BookOpen, Users, Shield, Target,
  MessageSquare, Sparkles, ClipboardCheck, LayoutGrid, GraduationCap,
  Crown, Moon, Sunrise, Swords, Heart, Compass, Hand, Flag, Flask, Footprints,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Badge } from '../../types/gamification';
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

interface BadgeEarnedModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: Badge | null;
}

export function BadgeEarnedModal({ isOpen, onClose, badge }: BadgeEarnedModalProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!badge) return null;

  const IconComponent = ICON_MAP[badge.icon_name] || Award;
  const tierColour = TIER_COLOURS[badge.tier];
  const rarityColour = RARITY_COLOURS[badge.rarity];

  // Fire confetti based on rarity
  useEffect(() => {
    if (isOpen && badge) {
      const detailsTimer = setTimeout(() => setShowDetails(true), 600);

      // Configure confetti based on rarity
      const confettiConfig = {
        common: { particleCount: 30, spread: 50 },
        uncommon: { particleCount: 50, spread: 60 },
        rare: { particleCount: 80, spread: 70 },
        epic: { particleCount: 120, spread: 80 },
        legendary: { particleCount: 200, spread: 100 },
      };

      const config = confettiConfig[badge.rarity] || confettiConfig.common;

      // Central burst
      confetti({
        ...config,
        origin: { y: 0.6 },
        colors: [tierColour, rarityColour, '#FFD700'],
      });

      // Side bursts for rare+
      if (['rare', 'epic', 'legendary'].includes(badge.rarity)) {
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 40,
            origin: { x: 0, y: 0.5 },
            colors: [tierColour, rarityColour],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 40,
            origin: { x: 1, y: 0.5 },
            colors: [tierColour, rarityColour],
          });
        }, 200);
      }

      return () => {
        clearTimeout(detailsTimer);
        setShowDetails(false);
      };
    }
  }, [isOpen, badge, tierColour, rarityColour]);

  // Share functionality
  const handleShare = async () => {
    const shareText = `I just earned the "${badge.name}" badge on St Paul's AI Teachers! 🎉 #AILiteracy #TeacherPD`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Badge Earned!',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Badge display area */}
            <div className="relative px-6 pt-10 pb-8 text-center overflow-hidden">
              {/* Background glow */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, ${tierColour}30 0%, transparent 70%)`,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Rarity label */}
              <motion.div
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{
                  backgroundColor: `${rarityColour}20`,
                  color: rarityColour,
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-3 h-3" />
                {badge.rarity.toUpperCase()} BADGE
              </motion.div>

              {/* Badge icon */}
              <motion.div
                className="relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${tierColour}20, ${tierColour}40)`,
                  border: `4px solid ${tierColour}`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                <IconComponent
                  className="w-16 h-16"
                  style={{ color: badge.icon_colour }}
                />

                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${tierColour}` }}
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Sparkles for epic/legendary */}
                {['epic', 'legendary'].includes(badge.rarity) && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        animate={{
                          x: [0, Math.cos((i * Math.PI) / 4) * 80],
                          y: [0, Math.sin((i * Math.PI) / 4) * 80],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      >
                        <Sparkles className="w-2 h-2 text-yellow-400" />
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>

              {/* Badge name */}
              <motion.h2
                className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {badge.name}
              </motion.h2>

              {/* Tier badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span
                  className="text-xs px-2 py-0.5 rounded font-medium capitalize"
                  style={{
                    backgroundColor: `${tierColour}20`,
                    color: tierColour,
                  }}
                >
                  {badge.tier}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {badge.category.replace(/_/g, ' ')}
                </span>
              </motion.div>
            </div>

            {/* Details section */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    {badge.description}
                  </p>

                  {/* XP reward */}
                  <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                      +{badge.xp_reward} XP Earned
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </motion.button>
                    <motion.button
                      className="flex-1 px-4 py-3 rounded-xl font-semibold text-white transition-all"
                      style={{ backgroundColor: tierColour }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                    >
                      Continue
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BadgeEarnedModal;
