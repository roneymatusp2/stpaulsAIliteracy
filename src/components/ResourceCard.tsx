import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DrawerDetail from './DrawerDetail';
import QRModal from './QRModal';
import { Resource } from '../lib/supabase';

interface ResourceCardProps {
  resource: Resource;
  viewMode?: 'grid' | 'list';
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  viewMode = 'grid',
  className = ''
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

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
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    course: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    certification: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    book: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    site: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    youtube: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 000-5H9.5M15 10h1.5a2.5 2.5 0 010 5H15m-6 0l6-10" />
      </svg>
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

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrawerOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  if (viewMode === 'list') {
    return (
      <>
        <motion.div
          className={`glass-card p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sps-ruby focus:ring-offset-2 rounded-lg overflow-hidden group hover:shadow-lg ${className}`}
          onClick={handleCardClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${resource.title}`}
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          layout
        >
          <div className="flex items-center space-x-3">
            {/* Compact Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[resource.category]} flex items-center justify-center text-white shadow-sm`}>
              {categoryIcons[resource.category]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-sps-ruby transition-colors">
                  {resource.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsQRModalOpen(true);
                  }}
                  className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Generate QR code"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h.01M12 12v4.01" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-white bg-gradient-to-r ${categoryColors[resource.category]}`}>
                  {categoryLabels[resource.category]}
                </span>
                
                {resource.provider_meta?.pricing && (
                  <span className="text-xs text-sps-ruby font-medium">
                    {resource.provider_meta.pricing}
                  </span>
                )}
              </div>

              {resource.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-1">
                  {resource.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <DrawerDetail
          resource={resource}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        <QRModal
          resource={resource}
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        className={`glass-card overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sps-ruby focus:ring-offset-2 rounded-lg group ${className}`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${resource.title}`}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {/* Compact Header */}
        <div className="relative p-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700">
          {/* Top Row: Category Badge and QR Button */}
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[resource.category]} shadow-sm`}>
              <span className="mr-1">{categoryIcons[resource.category]}</span>
              {categoryLabels[resource.category]}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsQRModalOpen(true);
              }}
              className="p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-600"
              aria-label="Generate QR code"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h.01M12 12v4.01" />
              </svg>
            </button>
          </div>

          {/* Central Icon */}
          <div className="flex justify-center">
            <motion.div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[resource.category]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
              whileHover={{ rotate: 5 }}
            >
              <div className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {resource.category === 'ai_tool' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                  {resource.category === 'course' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                  {resource.category === 'certification' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
                  {resource.category === 'book' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                  {resource.category === 'site' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />}
                  {resource.category === 'youtube' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 000-5H9.5M15 10h1.5a2.5 2.5 0 010 5H15m-6 0l6-10" />}
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content - Much More Compact */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-sps-ruby transition-colors leading-tight">
            {resource.title}
          </h3>
          
          {resource.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {resource.description}
            </p>
          )}

          {/* Bottom Row: Tags and Metadata */}
          <div className="flex items-center justify-between">
            {/* Tags - Only show 2 */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {resource.tags.length > 2 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    +{resource.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Pricing */}
            {resource.provider_meta?.pricing && (
              <span className="text-xs font-semibold text-sps-ruby">
                {resource.provider_meta.pricing}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <DrawerDetail
        resource={resource}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <QRModal
        resource={resource}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </>
  );
};

export default ResourceCard;
