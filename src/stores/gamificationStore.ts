// ============================================================================
// ST PAUL'S AI TEACHERS - GAMIFICATION ZUSTAND STORE
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProfile,
  UserXP,
  UserStreak,
  UserBadge,
  BadgeProgress,
  UserSkillProgress,
  Notification,
  XPTransaction,
  Badge,
  SkillDomain,
  LeaderboardEntry,
} from '../types/gamification';
import { supabase } from '../lib/supabase';

// ============================================================================
// STORE STATE INTERFACE
// ============================================================================

interface GamificationState {
  // User data
  user: UserProfile | null;
  xp: UserXP | null;
  streak: UserStreak | null;

  // Collections
  badges: UserBadge[];
  allBadges: Badge[];
  badgeProgress: BadgeProgress[];
  skillProgress: UserSkillProgress[];
  skillDomains: SkillDomain[];
  notifications: Notification[];
  recentTransactions: XPTransaction[];

  // Leaderboards
  weeklyLeaderboard: LeaderboardEntry[];
  monthlyLeaderboard: LeaderboardEntry[];
  allTimeLeaderboard: LeaderboardEntry[];

  // UI State
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  showLevelUpModal: boolean;
  showBadgeModal: boolean;
  newBadge: Badge | null;
  newLevel: number | null;

  // Actions
  setUser: (user: UserProfile | null) => void;
  setXP: (xp: UserXP | null) => void;
  setStreak: (streak: UserStreak | null) => void;
  setBadges: (badges: UserBadge[]) => void;
  setAllBadges: (badges: Badge[]) => void;
  setSkillDomains: (domains: SkillDomain[]) => void;
  setSkillProgress: (progress: UserSkillProgress[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // XP & Level actions
  addXP: (amount: number, source: string, description?: string) => Promise<void>;
  showLevelUp: (level: number) => void;
  hideLevelUp: () => void;

  // Badge actions
  awardBadge: (badge: Badge) => void;
  showBadgeEarned: (badge: Badge) => void;
  hideBadgeModal: () => void;

  // Data fetching
  fetchUserData: (userId: string) => Promise<void>;
  fetchBadges: () => Promise<void>;
  fetchSkillDomains: () => Promise<void>;
  fetchLeaderboards: () => Promise<void>;
  refreshAll: () => Promise<void>;

  // Auth
  signOut: () => void;
}

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      xp: null,
      streak: null,
      badges: [],
      allBadges: [],
      badgeProgress: [],
      skillProgress: [],
      skillDomains: [],
      notifications: [],
      recentTransactions: [],
      weeklyLeaderboard: [],
      monthlyLeaderboard: [],
      allTimeLeaderboard: [],
      isLoading: false,
      isAuthenticated: false,
      error: null,
      showLevelUpModal: false,
      showBadgeModal: false,
      newBadge: null,
      newLevel: null,

      // Setters
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setXP: (xp) => set({ xp }),
      setStreak: (streak) => set({ streak }),
      setBadges: (badges) => set({ badges }),
      setAllBadges: (allBadges) => set({ allBadges }),
      setSkillDomains: (skillDomains) => set({ skillDomains }),
      setSkillProgress: (skillProgress) => set({ skillProgress }),
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications].slice(0, 50),
        })),
      markNotificationRead: async (id) => {
        if (!supabase) return;
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', id);
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, is_read: true } : n
          ),
        }));
      },
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),

      // XP Actions
      addXP: async (amount, source, description) => {
        const { user, xp } = get();
        if (!user || !supabase) return;

        try {
          const { data, error } = await supabase.rpc('award_xp', {
            p_user_id: user.id,
            p_amount: amount,
            p_source: source,
            p_description: description,
          });

          if (error) throw error;

          // Refetch XP data
          const { data: newXP } = await supabase
            .from('user_xp')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (newXP) {
            const oldLevel = xp?.current_level || 1;
            set({ xp: newXP as UserXP });

            // Check for level up
            if (newXP.current_level > oldLevel) {
              get().showLevelUp(newXP.current_level);
            }
          }
        } catch (error) {
          console.error('Error awarding XP:', error);
        }
      },

      showLevelUp: (level) => set({ showLevelUpModal: true, newLevel: level }),
      hideLevelUp: () => set({ showLevelUpModal: false, newLevel: null }),

      // Badge Actions
      awardBadge: (badge) => {
        set((state) => ({
          badges: [
            ...state.badges,
            {
              id: crypto.randomUUID(),
              user_id: state.user?.id || '',
              badge_id: badge.id,
              badge,
              awarded_at: new Date().toISOString(),
              progress: {},
              is_featured: false,
              is_new: true,
            },
          ],
        }));
        get().showBadgeEarned(badge);
      },

      showBadgeEarned: (badge) => set({ showBadgeModal: true, newBadge: badge }),
      hideBadgeModal: () => set({ showBadgeModal: false, newBadge: null }),

      // Data Fetching
      fetchUserData: async (userId) => {
        if (!supabase) return;
        set({ isLoading: true, error: null });

        try {
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (profileError) throw profileError;

          // Fetch XP
          const { data: xp } = await supabase
            .from('user_xp')
            .select('*')
            .eq('user_id', userId)
            .single();

          // Fetch streak
          const { data: streak } = await supabase
            .from('user_streaks')
            .select('*')
            .eq('user_id', userId)
            .single();

          // Fetch user badges with badge details
          const { data: badges } = await supabase
            .from('user_badges')
            .select('*, badge:badges(*)')
            .eq('user_id', userId)
            .order('awarded_at', { ascending: false });

          // Fetch skill progress
          const { data: skillProgress } = await supabase
            .from('user_skill_progress')
            .select('*, node:skill_nodes(*, domain:skill_domains(*))')
            .eq('user_id', userId);

          // Fetch notifications
          const { data: notifications } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(50);

          // Fetch recent XP transactions
          const { data: transactions } = await supabase
            .from('xp_transactions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(20);

          set({
            user: profile as UserProfile,
            xp: xp as UserXP || null,
            streak: streak as UserStreak || null,
            badges: (badges as UserBadge[]) || [],
            skillProgress: (skillProgress as UserSkillProgress[]) || [],
            notifications: (notifications as Notification[]) || [],
            recentTransactions: (transactions as XPTransaction[]) || [],
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          set({ error: 'Failed to load user data', isLoading: false });
        }
      },

      fetchBadges: async () => {
        if (!supabase) return;

        try {
          const { data: badges, error } = await supabase
            .from('badges')
            .select('*')
            .order('sort_order', { ascending: true });

          if (error) throw error;
          set({ allBadges: (badges as Badge[]) || [] });
        } catch (error) {
          console.error('Error fetching badges:', error);
        }
      },

      fetchSkillDomains: async () => {
        if (!supabase) return;

        try {
          const { data: domains, error } = await supabase
            .from('skill_domains')
            .select('*')
            .order('order_index', { ascending: true });

          if (error) throw error;
          set({ skillDomains: (domains as SkillDomain[]) || [] });
        } catch (error) {
          console.error('Error fetching skill domains:', error);
        }
      },

      fetchLeaderboards: async () => {
        if (!supabase) return;

        try {
          // Weekly
          const { data: weekly } = await supabase
            .from('leaderboard_weekly')
            .select('*')
            .order('rank', { ascending: true })
            .limit(100);

          // Monthly
          const { data: monthly } = await supabase
            .from('leaderboard_monthly')
            .select('*')
            .order('rank', { ascending: true })
            .limit(100);

          // All-time
          const { data: allTime } = await supabase
            .from('leaderboard_alltime')
            .select('*')
            .order('rank', { ascending: true })
            .limit(100);

          set({
            weeklyLeaderboard: (weekly as LeaderboardEntry[]) || [],
            monthlyLeaderboard: (monthly as LeaderboardEntry[]) || [],
            allTimeLeaderboard: (allTime as LeaderboardEntry[]) || [],
          });
        } catch (error) {
          console.error('Error fetching leaderboards:', error);
        }
      },

      refreshAll: async () => {
        const { user, fetchBadges, fetchSkillDomains, fetchLeaderboards, fetchUserData } = get();
        set({ isLoading: true });

        await Promise.all([
          fetchBadges(),
          fetchSkillDomains(),
          fetchLeaderboards(),
          user ? fetchUserData(user.id) : Promise.resolve(),
        ]);

        set({ isLoading: false });
      },

      signOut: () => {
        set({
          user: null,
          xp: null,
          streak: null,
          badges: [],
          badgeProgress: [],
          skillProgress: [],
          notifications: [],
          recentTransactions: [],
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: 'stpauls-gamification',
      partialize: (state) => ({
        // Only persist essential data
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ============================================================================
// SELECTORS
// ============================================================================

export const selectUnreadNotifications = (state: GamificationState) =>
  state.notifications.filter((n) => !n.is_read);

export const selectBadgesByCategory = (state: GamificationState, category: string) =>
  state.badges.filter((b) => b.badge?.category === category);

export const selectSkillDomainProgress = (state: GamificationState, domainSlug: string) => {
  const domain = state.skillDomains.find((d) => d.slug === domainSlug);
  if (!domain) return null;

  const domainProgress = state.skillProgress.filter(
    (p) => p.node?.domain_id === domain.id
  );

  const completed = domainProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length;

  return {
    domain,
    completed,
    total: domain.total_nodes,
    percent: domain.total_nodes > 0 ? Math.round((completed / domain.total_nodes) * 100) : 0,
  };
};

export const selectNextLevelXP = (state: GamificationState) => {
  if (!state.xp) return { current: 0, required: 100, percent: 0 };

  const current = state.xp.total_xp;
  const toNext = state.xp.xp_to_next_level;
  const required = current + toNext;
  const levelStart = required - toNext - 100; // Approximate
  const progressInLevel = current - levelStart;
  const levelRange = required - levelStart;

  return {
    current: progressInLevel,
    required: levelRange,
    percent: Math.min(100, Math.round((progressInLevel / levelRange) * 100)),
  };
};
