import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Resource } from '../lib/supabase';

interface AdvancedResourceCardProps {
  resource: Resource;
  index: number;
  viewMode?: 'grid' | 'list';
  onCardClick?: () => void;
  onQRClick?: () => void;
}

const AdvancedResourceCard: React.FC<AdvancedResourceCardProps> = ({
  resource,
  index,
  viewMode = 'grid',
  onCardClick,
  onQRClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    ai_tool: 'from-sps-ruby via-sps-indigo to-sps-indigo',
    course: 'from-sps-indigo via-sps-green to-sps-green',
    certification: 'from-sps-ruby via-sps-green to-sps-indigo',
    book: 'from-sps-indigo via-purple-700 to-sps-ruby',
    site: 'from-sps-ruby via-pink-600 to-rose-500',
    youtube: 'from-red-700 via-red-500 to-sps-ruby'
  };

  const categoryIcons = {
    ai_tool: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    course: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
    certification: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    ),
    book: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
    site: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    ),
    youtube: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 000-5H9.5M15 10h1.5a2.5 2.5 0 010 5H15m-6 0l6-10" />
    )
  };

  const categoryLabels = {
    ai_tool: 'AI Tool',
    course: 'Course',
    certification: 'Certification',
    book: 'Book',
    site: 'Website',
    youtube: 'Video'
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 30,
      },
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        className="relative group cursor-pointer glass-card p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onCardClick}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[resource.category]} flex items-center justify-center flex-shrink-0`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {categoryIcons[resource.category]}
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                {resource.title}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQRClick?.();
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h.01M12 12v4.01" />
                </svg>
              </button>
            </div>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[resource.category]}`}>
              {categoryLabels[resource.category]}
            </span>
            
            {resource.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
                {resource.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden shadow-2xl">
        <div className="relative p-6 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-700/80">
          <div className="flex items-center justify-between mb-4">
            <motion.span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[resource.category]} shadow-lg`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {categoryIcons[resource.category]}
              </svg>
              {categoryLabels[resource.category]}
            </motion.span>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onQRClick?.();
              }}
              className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white shadow-lg border border-white/30 dark:border-gray-600/30"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h.01M12 12v4.01" />
              </svg>
            </motion.button>
          </div>

          <div className="flex justify-center mb-4">
            <motion.div 
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[resource.category]} flex items-center justify-center shadow-xl`}
              whileHover={{ scale: 1.15 }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {categoryIcons[resource.category]}
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <motion.h3 
            className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {resource.title}
          </motion.h3>

          {resource.description && (
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {resource.description}
            </motion.p>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: index * 0.1 + 0.6,
                  },
                },
              }}
            >
              {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
                  variants={{
                    hidden: { opacity: 0, scale: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.span>
              ))}
              {resource.tags.length > 3 && (
                <motion.span
                  className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg"
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  +{resource.tags.length - 3}
                </motion.span>
              )}
            </motion.div>
          )}

          {resource.provider_meta?.pricing && (
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              <span className="text-sm font-bold text-sps-ruby dark:text-sps-ruby">
                {resource.provider_meta.pricing}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedResourceCard;
