// ============================================================================
// GAMIFICATION PROVIDER - AUTH STATE & MODALS MANAGEMENT
// ============================================================================

import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { useGamificationStore } from '../stores/gamificationStore';
import { supabase } from '../lib/supabase';
import { LevelUpModal, BadgeEarnedModal, AuthModal } from '../components/gamification';
import type { Badge } from '../types/gamification';

// ============================================================================
// CONTEXT
// ============================================================================

interface GamificationContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: () => void;
  hideAuthModal: () => void;
  signOut: () => Promise<void>;
}

const GamificationContext = createContext<GamificationContextValue | null>(null);

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface GamificationProviderProps {
  children: ReactNode;
}

export function GamificationProvider({ children }: GamificationProviderProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Zustand store selectors
  const isAuthenticated = useGamificationStore((state) => state.isAuthenticated);
  const isLoading = useGamificationStore((state) => state.isLoading);
  const showLevelUpModal = useGamificationStore((state) => state.showLevelUpModal);
  const showBadgeModal = useGamificationStore((state) => state.showBadgeModal);
  const newLevel = useGamificationStore((state) => state.newLevel);
  const newBadge = useGamificationStore((state) => state.newBadge);

  // Zustand store actions
  const fetchUserData = useGamificationStore((state) => state.fetchUserData);
  const fetchBadges = useGamificationStore((state) => state.fetchBadges);
  const fetchSkillDomains = useGamificationStore((state) => state.fetchSkillDomains);
  const fetchLeaderboards = useGamificationStore((state) => state.fetchLeaderboards);
  const hideLevelUp = useGamificationStore((state) => state.hideLevelUp);
  const hideBadgeModal = useGamificationStore((state) => state.hideBadgeModal);
  const signOutStore = useGamificationStore((state) => state.signOut);
  const setLoading = useGamificationStore((state) => state.setLoading);

  // Initialise auth listener
  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase not configured. Gamification features disabled.');
      return;
    }

    // Check current session
    const initAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          await fetchUserData(session.user.id);
        }

        // Fetch global data
        await Promise.all([
          fetchBadges(),
          fetchSkillDomains(),
          fetchLeaderboards(),
        ]);
      } catch (error) {
        console.error('Error initialising gamification:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserData(session.user.id);
          setAuthModalOpen(false);
        } else if (event === 'SIGNED_OUT') {
          signOutStore();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserData, fetchBadges, fetchSkillDomains, fetchLeaderboards, setLoading, signOutStore]);

  // Context methods
  const showAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const hideAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    signOutStore();
  }, [signOutStore]);

  // Context value
  const contextValue: GamificationContextValue = {
    isAuthenticated,
    isLoading,
    showAuthModal,
    hideAuthModal,
    signOut,
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={hideAuthModal}
      />

      <LevelUpModal
        isOpen={showLevelUpModal}
        onClose={hideLevelUp}
        level={newLevel || 1}
      />

      <BadgeEarnedModal
        isOpen={showBadgeModal}
        onClose={hideBadgeModal}
        badge={newBadge}
      />
    </GamificationContext.Provider>
  );
}

export default GamificationProvider;
