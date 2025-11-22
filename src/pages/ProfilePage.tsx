// ============================================================================
// PROFILE PAGE - USER GAMIFICATION DASHBOARD
// ============================================================================

import { motion } from 'framer-motion';
import { ProfileDashboard } from '../components/gamification';
import { useGamification } from '../providers';

export default function ProfilePage() {
  const { signOut } = useGamification();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your AI literacy journey, view achievements, and compete on leaderboards
          </p>
        </div>

        {/* Profile dashboard */}
        <ProfileDashboard
          onSignOut={signOut}
          onSettingsClick={() => {
            // TODO: Implement settings modal
            console.log('Settings clicked');
          }}
        />
      </div>
    </motion.div>
  );
}
