// ============================================================================
// SKILL TREE VISUALISATION COMPONENT
// ============================================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, CheckCircle, Circle, Star, ChevronRight,
  MessageSquare, Shield, Puzzle, ClipboardCheck, Wand2,
  BookOpen, Zap, Trophy,
} from 'lucide-react';
import { useGamificationStore, selectSkillDomainProgress } from '../../stores/gamificationStore';
import type { SkillDomain, SkillNode, UserSkillProgress, SkillNodeStatus } from '../../types/gamification';

// Domain icons mapping
const DOMAIN_ICONS: Record<string, React.ElementType> = {
  prompting: MessageSquare,
  ethics: Shield,
  integration: Puzzle,
  assessment: ClipboardCheck,
  creation: Wand2,
};

// Domain colours
const DOMAIN_COLOURS: Record<string, string> = {
  prompting: '#3B82F6',
  ethics: '#10B981',
  integration: '#8B5CF6',
  assessment: '#F59E0B',
  creation: '#EC4899',
};

interface SkillTreeProps {
  className?: string;
  onNodeClick?: (node: SkillNode, status: SkillNodeStatus) => void;
}

export function SkillTree({ className = '', onNodeClick }: SkillTreeProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const skillDomains = useGamificationStore((state) => state.skillDomains);
  const skillProgress = useGamificationStore((state) => state.skillProgress);
  const xp = useGamificationStore((state) => state.xp);

  // Check if skill trees are unlocked (Level 10+)
  const isUnlocked = (xp?.current_level || 0) >= 10;

  if (!isUnlocked) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Skill Trees Locked
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Reach Level 10 to unlock skill trees and track your AI literacy journey
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Current Level: {xp?.current_level || 1}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Level 10
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sps-ruby" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              AI Literacy Skill Trees
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {skillDomains.length} domains
          </span>
        </div>
      </div>

      {/* Domain selector */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {skillDomains.map((domain) => (
            <DomainTab
              key={domain.id}
              domain={domain}
              isSelected={selectedDomain === domain.slug}
              onClick={() => setSelectedDomain(selectedDomain === domain.slug ? null : domain.slug)}
            />
          ))}
        </div>
      </div>

      {/* Tree visualisation */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {selectedDomain ? (
            <motion.div
              key={selectedDomain}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DomainTree
                domainSlug={selectedDomain}
                onNodeClick={onNodeClick}
              />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DomainsOverview
                domains={skillDomains}
                onDomainClick={setSelectedDomain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Domain tab component
function DomainTab({
  domain,
  isSelected,
  onClick,
}: {
  domain: SkillDomain;
  isSelected: boolean;
  onClick: () => void;
}) {
  const progress = useGamificationStore((state) => selectSkillDomainProgress(state, domain.slug));
  const Icon = DOMAIN_ICONS[domain.slug] || BookOpen;
  const colour = DOMAIN_COLOURS[domain.slug] || '#6B7280';

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isSelected
          ? 'text-white shadow-md'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
      style={isSelected ? { backgroundColor: colour } : undefined}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium text-sm whitespace-nowrap">{domain.name}</span>
      {progress && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded ${
            isSelected
              ? 'bg-white/20'
              : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          {progress.percent}%
        </span>
      )}
    </button>
  );
}

// Domains overview grid
function DomainsOverview({
  domains,
  onDomainClick,
}: {
  domains: SkillDomain[];
  onDomainClick: (slug: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {domains.map((domain) => (
        <DomainCard
          key={domain.id}
          domain={domain}
          onClick={() => onDomainClick(domain.slug)}
        />
      ))}
    </div>
  );
}

// Individual domain card
function DomainCard({
  domain,
  onClick,
}: {
  domain: SkillDomain;
  onClick: () => void;
}) {
  const progress = useGamificationStore((state) => selectSkillDomainProgress(state, domain.slug));
  const Icon = DOMAIN_ICONS[domain.slug] || BookOpen;
  const colour = DOMAIN_COLOURS[domain.slug] || '#6B7280';

  return (
    <motion.button
      className="p-4 rounded-xl border-2 text-left transition-all hover:shadow-lg group"
      style={{ borderColor: `${colour}30` }}
      whileHover={{ scale: 1.02, borderColor: colour }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${colour}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: colour }} />
        </div>
        <ChevronRight
          className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
        />
      </div>

      {/* Title & description */}
      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
        {domain.name}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {domain.description}
      </p>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            {progress?.completed || 0} / {progress?.total || domain.total_nodes} skills
          </span>
          <span className="font-medium" style={{ color: colour }}>
            {progress?.percent || 0}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colour }}
            initial={{ width: 0 }}
            animate={{ width: `${progress?.percent || 0}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.button>
  );
}

// Full domain tree visualisation
function DomainTree({
  domainSlug,
  onNodeClick,
}: {
  domainSlug: string;
  onNodeClick?: (node: SkillNode, status: SkillNodeStatus) => void;
}) {
  const skillDomains = useGamificationStore((state) => state.skillDomains);
  const skillProgress = useGamificationStore((state) => state.skillProgress);

  const domain = skillDomains.find((d) => d.slug === domainSlug);
  if (!domain) return null;

  const colour = DOMAIN_COLOURS[domainSlug] || '#6B7280';

  // Group nodes by tier
  const nodesByTier = useMemo(() => {
    const tiers: Record<number, Array<{ node: SkillNode; progress?: UserSkillProgress }>> = {};

    // For now, create mock nodes based on domain
    // In production, these would come from the database
    const mockNodes: SkillNode[] = [
      // Tier 1 - Foundation
      { id: '1', domain_id: domain.id, name: 'Introduction', slug: 'intro', description: 'Getting started', tier: 1, xp_reward: 25, order_index: 1, prerequisites: [], is_milestone: false },
      { id: '2', domain_id: domain.id, name: 'Core Concepts', slug: 'core', description: 'Fundamental concepts', tier: 1, xp_reward: 25, order_index: 2, prerequisites: [], is_milestone: false },
      { id: '3', domain_id: domain.id, name: 'Basic Practice', slug: 'basic-practice', description: 'Hands-on basics', tier: 1, xp_reward: 25, order_index: 3, prerequisites: [], is_milestone: false },
      // Tier 2 - Development
      { id: '4', domain_id: domain.id, name: 'Intermediate Skills', slug: 'intermediate', description: 'Building proficiency', tier: 2, xp_reward: 50, order_index: 4, prerequisites: ['1', '2'], is_milestone: false },
      { id: '5', domain_id: domain.id, name: 'Applied Learning', slug: 'applied', description: 'Real-world application', tier: 2, xp_reward: 50, order_index: 5, prerequisites: ['2', '3'], is_milestone: false },
      // Tier 3 - Advanced
      { id: '6', domain_id: domain.id, name: 'Advanced Techniques', slug: 'advanced', description: 'Expert methods', tier: 3, xp_reward: 100, order_index: 6, prerequisites: ['4', '5'], is_milestone: true },
      { id: '7', domain_id: domain.id, name: 'Specialisation', slug: 'specialisation', description: 'Deep expertise', tier: 3, xp_reward: 100, order_index: 7, prerequisites: ['4', '5'], is_milestone: false },
      // Tier 4 - Mastery
      { id: '8', domain_id: domain.id, name: 'Expert Practice', slug: 'expert', description: 'Professional level', tier: 4, xp_reward: 150, order_index: 8, prerequisites: ['6', '7'], is_milestone: false },
      // Tier 5 - Mastery milestone
      { id: '9', domain_id: domain.id, name: `${domain.name} Master`, slug: 'mastery', description: 'Complete mastery', tier: 5, xp_reward: 250, order_index: 9, prerequisites: ['8'], is_milestone: true },
    ];

    mockNodes.forEach((node) => {
      const progress = skillProgress.find((p) => p.node_id === node.id);
      if (!tiers[node.tier]) tiers[node.tier] = [];
      tiers[node.tier].push({ node, progress });
    });

    return tiers;
  }, [domain, skillProgress]);

  const tierLabels = ['', 'Foundation', 'Development', 'Advanced', 'Expert', 'Mastery'];

  return (
    <div className="space-y-6">
      {/* Domain header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => {}}
        >
          <ChevronRight className="w-5 h-5 text-gray-500 rotate-180" />
        </button>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {domain.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {domain.description}
          </p>
        </div>
      </div>

      {/* Tree visualisation */}
      <div className="relative">
        {Object.entries(nodesByTier)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([tier, nodes], tierIndex) => (
            <div key={tier} className="relative mb-8 last:mb-0">
              {/* Tier label */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{ backgroundColor: `${colour}20`, color: colour }}
                >
                  Tier {tier}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tierLabels[Number(tier)]}
                </span>
              </div>

              {/* Nodes grid */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {nodes.map(({ node, progress }) => (
                  <SkillNodeCard
                    key={node.id}
                    node={node}
                    progress={progress}
                    colour={colour}
                    onClick={() => onNodeClick?.(node, progress?.status || 'locked')}
                  />
                ))}
              </div>

              {/* Connection lines to next tier */}
              {tierIndex < Object.keys(nodesByTier).length - 1 && (
                <div className="flex justify-center my-4">
                  <div
                    className="w-0.5 h-8"
                    style={{ backgroundColor: `${colour}30` }}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

// Individual skill node card
function SkillNodeCard({
  node,
  progress,
  colour,
  onClick,
}: {
  node: SkillNode;
  progress?: UserSkillProgress;
  colour: string;
  onClick: () => void;
}) {
  const status: SkillNodeStatus = progress?.status || 'locked';

  const statusConfig = {
    locked: {
      icon: Lock,
      bg: 'bg-gray-100 dark:bg-gray-700',
      iconColor: 'text-gray-400',
      border: 'border-gray-200 dark:border-gray-600',
    },
    available: {
      icon: Circle,
      bg: 'bg-white dark:bg-gray-800',
      iconColor: 'text-gray-500',
      border: `border-2`,
    },
    in_progress: {
      icon: Circle,
      bg: 'bg-white dark:bg-gray-800',
      iconColor: '',
      border: 'border-2',
    },
    completed: {
      icon: CheckCircle,
      bg: '',
      iconColor: 'text-white',
      border: '',
    },
    mastered: {
      icon: Star,
      bg: '',
      iconColor: 'text-white',
      border: '',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;
  const isActive = ['available', 'in_progress', 'completed', 'mastered'].includes(status);
  const isDone = ['completed', 'mastered'].includes(status);

  return (
    <motion.button
      className={`relative flex flex-col items-center p-4 rounded-xl transition-all ${
        isDone ? '' : config.bg
      } ${config.border} ${
        isActive ? 'hover:shadow-md cursor-pointer' : 'cursor-not-allowed opacity-60'
      }`}
      style={{
        borderColor: isActive && !isDone ? colour : undefined,
        backgroundColor: isDone ? colour : undefined,
        minWidth: '120px',
      }}
      whileHover={isActive ? { scale: 1.05 } : {}}
      whileTap={isActive ? { scale: 0.95 } : {}}
      onClick={isActive ? onClick : undefined}
    >
      {/* Status icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
          isDone ? 'bg-white/20' : `${config.bg}`
        }`}
      >
        <Icon
          className={`w-5 h-5 ${config.iconColor}`}
          style={{ color: status === 'in_progress' ? colour : undefined }}
        />
      </div>

      {/* Node name */}
      <p
        className={`text-sm font-medium text-center ${
          isDone ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}
      >
        {node.name}
      </p>

      {/* XP reward */}
      <div
        className={`flex items-center gap-1 mt-1 text-xs ${
          isDone ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <Zap className="w-3 h-3" />
        {node.xp_reward} XP
      </div>

      {/* Progress indicator for in_progress */}
      {status === 'in_progress' && progress?.progress_percent !== undefined && (
        <div className="w-full mt-2">
          <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: colour }}
              initial={{ width: 0 }}
              animate={{ width: `${progress.progress_percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Milestone indicator */}
      {node.is_milestone && (
        <div className="absolute -top-1 -right-1">
          <Trophy className="w-4 h-4 text-yellow-500" />
        </div>
      )}
    </motion.button>
  );
}

export default SkillTree;
