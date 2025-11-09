import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockResources } from '../lib/supabase';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = mockResources.filter(resource =>
      resource.title.toLowerCase().includes(searchQuery) ||
      resource.description?.toLowerCase().includes(searchQuery) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );

    setResults(filtered.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex]);
    }
  };

  const handleResultClick = (resource: any) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    }
    onClose();
    setQuery('');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      ai_tool: 'from-sps-ruby to-sps-indigo',
      course: 'from-sps-indigo to-sps-green',
      certification: 'from-sps-ruby to-sps-green',
      book: 'from-sps-indigo to-sps-ruby',
      site: 'from-sps-ruby to-pink-500',
      youtube: 'from-red-700 to-sps-ruby'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getQuickActions = () => [
    { label: 'View All AI Tools', action: () => navigate('/tools'), icon: '🤖' },
    { label: 'Browse Courses', action: () => navigate('/learn'), icon: '📚' },
    { label: 'Check Library', action: () => navigate('/library'), icon: '📖' },
    { label: 'Watch Videos', action: () => navigate('/videos'), icon: '🎥' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 mx-4"
          >
            <div className="glass-card overflow-hidden">
              {/* Search Input */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search AI tools, courses, resources..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-sps-ruby transition-all duration-200"
                  />
                  
                  {query && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {query && results.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2">
                      Results ({results.length})
                    </h3>
                    <div className="space-y-2">
                      {results.map((resource, index) => (
                        <motion.div
                          key={resource.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                            index === selectedIndex
                              ? 'bg-gradient-to-r from-sps-ruby/5 to-sps-indigo/5 dark:from-sps-ruby/20 dark:to-sps-indigo/20 border-2 border-sps-ruby/40 dark:border-sps-ruby/30'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent'
                          }`}
                          onClick={() => handleResultClick(resource)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(resource.category)} flex items-center justify-center flex-shrink-0`}>
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                                {resource.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                                {resource.description}
                              </p>
                              
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                  {resource.category.replace('_', ' ')}
                                </span>
                                {resource.provider_meta?.pricing && (
                                  <span className="text-xs text-sps-ruby dark:text-sps-ruby font-medium">
                                    {resource.provider_meta.pricing}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {query && results.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try searching for different keywords or browse our categories.
                    </p>
                  </div>
                )}

                {!query && (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      {getQuickActions().map((action, index) => (
                        <motion.button
                          key={action.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            action.action();
                            onClose();
                          }}
                          className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-left"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-sps-ruby to-sps-indigo rounded-lg flex items-center justify-center text-white">
                            <span className="text-lg">{action.icon}</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {action.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-sps-ruby/5 to-sps-indigo/5 dark:from-sps-ruby/15 dark:to-sps-indigo/15 rounded-xl">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        💡 Pro Tip
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use keyboard shortcuts: ↑↓ to navigate, Enter to select, Esc to close.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
