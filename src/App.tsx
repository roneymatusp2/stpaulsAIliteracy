import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedHeader from './components/AdvancedHeader';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import { useAnalytics, usePerformanceMonitoring } from './hooks/useAnalytics';
import './styles/globals.css';

// Lazy load pages for better performance and code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-ruby-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  useAnalytics();
  usePerformanceMonitoring();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 10,
      filter: 'blur(10px)'
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)'
    },
    out: {
      opacity: 0,
      scale: 1.02,
      y: -10,
      filter: 'blur(10px)'
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1],
    duration: 0.4
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-sps-indigo/5 dark:bg-sps-indigo/80 transition-colors duration-300 relative overflow-hidden">
        <AnimatedBackground />
        <AdvancedHeader />

        <main className="relative z-10 pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-screen"
            >
              <Suspense fallback={<PageLoader />}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tools" element={<ToolsPage />} />
                  <Route path="/learn" element={<LearnPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/videos" element={<VideosPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative z-10"
        >
          <Footer />
        </motion.div>

        <PerformanceMonitor />
      </div>
    </ErrorBoundary>
  );
}

export default App;
