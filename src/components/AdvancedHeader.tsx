import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import SearchModal from './SearchModal';

const navItems = [
  { label: 'AI Tools', href: '/', icon: '🤖' },
  { label: 'Explore AI Tools', href: '/tools', icon: '🚀' },
  { label: 'Learn AI Tools', href: '/learn', icon: '📚' },
  { label: 'Library', href: '/library', icon: '📖' },
  { label: 'Videos', href: '/videos', icon: '🎥' },
  { label: 'About', href: '/about', icon: 'ℹ️' }
];

const AdvancedHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderBottom: '1px solid transparent',
      padding: '1.25rem 0'
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 12px 30px rgba(0, 29, 49, 0.08)',
      padding: '0.9rem 0',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="flex items-center justify-center bg-white rounded-2xl shadow-lg shadow-sps-indigo/10 border border-white/60">
                  <img
                    src="https://nyc.cloud.appwrite.io/v1/storage/buckets/68a52c57000dac1b04b3/files/68a52c6800384645c80c/view?project=680e68b10024125b5c0b&mode=admin"
                    alt="St. Paul's School logo"
                    className="h-10 w-auto p-1"
                    loading="lazy"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/80">
                    St. Paul's School · São Paulo
                  </p>
                  <p className="text-lg font-heading font-semibold text-sps-indigo">
                    AI Learning Platform
                  </p>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div key={item.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={item.href}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-1 text-sm ${
                      location.pathname === item.href
                        ? 'bg-gradient-to-r from-sps-ruby to-sps-indigo text-white shadow-lg shadow-sps-indigo/20'
                        : 'text-sps-indigo/80 hover:text-sps-indigo hover:bg-sps-indigo/5'
                    }`}
                  >
                    <span className="text-xs" aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-sps-indigo/5 text-sps-indigo hover:bg-sps-indigo/10 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search platform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>

              <DarkModeToggle />

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-sps-indigo/5 text-sps-indigo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle navigation menu"
              >
                <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden overflow-hidden bg-white/95 border-t border-sps-indigo/10"
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: isMenuOpen ? 0 : -40, opacity: isMenuOpen ? 1 : 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
              >
                <Link
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                    location.pathname === item.href
                      ? 'bg-gradient-to-r from-sps-ruby to-sps-indigo text-white'
                      : 'text-sps-indigo hover:bg-sps-indigo/5'
                  }`}
                >
                  <span className="text-sm" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default AdvancedHeader;
