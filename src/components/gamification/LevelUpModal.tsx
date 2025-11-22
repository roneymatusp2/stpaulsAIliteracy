// ============================================================================
// LEVEL UP CELEBRATION MODAL
// ============================================================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, Gift, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGamificationStore } from '../../stores/gamificationStore';
import { RANK_COLOURS, LEVEL_THRESHOLDS } from '../../types/gamification';
import type { UserRank } from '../../types/gamification';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
}

export function LevelUpModal({ isOpen, onClose, level }: LevelUpModalProps) {
  const [showRewards, setShowRewards] = useState(false);
  const xp = useGamificationStore((state) => state.xp);

  // Determine rank for this level
  const getRankForLevel = (lvl: number): UserRank => {
    if (lvl >= 45) return 'AI Visionary';
    if (lvl >= 35) return 'AI Architect';
    if (lvl >= 25) return 'AI Champion';
    if (lvl >= 15) return 'AI Specialist';
    if (lvl >= 8) return 'AI Practitioner';
    return 'AI Apprentice';
  };

  const currentRank = getRankForLevel(level);
  const previousRank = getRankForLevel(level - 1);
  const isRankUp = currentRank !== previousRank;
  const rankColour = RANK_COLOURS[currentRank];

  // Fire confetti on open
  useEffect(() => {
    if (isOpen) {
      // Delay rewards display
      const rewardsTimer = setTimeout(() => setShowRewards(true), 800);

      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: [rankColour, '#FFD700', '#FFA500'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: [rankColour, '#FFD700', '#FFA500'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

      return () => {
        clearTimeout(rewardsTimer);
        setShowRewards(false);
      };
    }
  }, [isOpen, rankColour]);

  // Calculate rewards for this level
  const getLevelRewards = (lvl: number) => {
    const rewards = [];

    // XP milestone bonuses
    if (lvl % 10 === 0) {
      rewards.push({ type: 'xp', amount: 500, label: 'Milestone Bonus' });
    }

    // Streak freeze tokens
    if (lvl % 5 === 0) {
      rewards.push({ type: 'freeze', amount: 1, label: 'Streak Freeze Token' });
    }

    // Unlock features at certain levels
    if (lvl === 5) {
      rewards.push({ type: 'unlock', label: 'Leaderboards Unlocked' });
    }
    if (lvl === 10) {
      rewards.push({ type: 'unlock', label: 'Skill Trees Unlocked' });
    }
    if (lvl === 15) {
      rewards.push({ type: 'unlock', label: 'Peer Endorsements Unlocked' });
    }
    if (lvl === 20) {
      rewards.push({ type: 'unlock', label: 'Team Challenges Unlocked' });
    }

    return rewards;
  };

  const rewards = getLevelRewards(level);

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
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header with gradient */}
            <div
              className="relative px-6 pt-8 pb-12 text-center"
              style={{
                background: `linear-gradient(135deg, ${rankColour}, ${adjustColour(rankColour, -30)})`,
              }}
            >
              {/* Animated sparkles */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Level badge */}
              <motion.div
                className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <span className="text-5xl font-bold text-white">{level}</span>
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-white/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <h2 className="text-2xl font-bold text-white">Level Up!</h2>
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-white/80">
                  You've reached Level {level}
                </p>
              </motion.div>

              {/* Rank up indicator */}
              {isRankUp && (
                <motion.div
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <TrendingUp className="w-5 h-5 text-yellow-300" />
                  <span className="text-white font-medium">
                    New Rank: {currentRank}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Rewards section */}
            <div className="p-6">
              <AnimatePresence>
                {showRewards && rewards.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Rewards Unlocked
                    </h3>
                    <div className="space-y-2">
                      {rewards.map((reward, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {reward.type === 'xp' && (
                            <>
                              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-yellow-500" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  +{reward.amount} XP
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {reward.label}
                                </p>
                              </div>
                            </>
                          )}
                          {reward.type === 'freeze' && (
                            <>
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <span className="text-lg">❄️</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  +{reward.amount} {reward.label}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Protect your streak
                                </p>
                              </div>
                            </>
                          )}
                          {reward.type === 'unlock' && (
                            <>
                              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <span className="text-lg">🔓</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {reward.label}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  New feature available
                                </p>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue button */}
              <motion.button
                className="w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{ backgroundColor: rankColour }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

export default LevelUpModal;
