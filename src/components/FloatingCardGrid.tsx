import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedResourceCard from './AdvancedResourceCard';
import FilterBar from './FilterBar';
import DrawerDetail from './DrawerDetail';
import QRModal from './QRModal';
import { Resource } from '../lib/supabase';
import AnimatedText from './AnimatedText';

interface FloatingCardGridProps {
  resources: Resource[];
  title?: string;
  subtitle?: string;
  allowedCategories?: string[];
  showFilters?: boolean;
  className?: string;
}

const FloatingCardGrid: React.FC<FloatingCardGridProps> = ({
  resources,
  title,
  subtitle,
  allowedCategories,
  showFilters = true,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      if (selectedCategory !== 'all' && resource.category !== selectedCategory) {
        return false;
      }

      if (allowedCategories && !allowedCategories.includes(resource.category)) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = resource.title.toLowerCase().includes(query);
        const matchesDescription = resource.description?.toLowerCase().includes(query) || false;
        const matchesTags = resource.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesTitle && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some(tag =>
          resource.tags.some(resourceTag => 
            resourceTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }, [resources, searchQuery, selectedCategory, selectedTags, allowedCategories]);

  const availableCategories = useMemo(() => {
    const categories = [...new Set(resources.map(r => r.category))];
    if (allowedCategories) {
      return categories.filter(cat => allowedCategories.includes(cat));
    }
    return categories;
  }, [resources, allowedCategories]);

  const availableTags = useMemo(() => {
    const allTags = resources.flatMap(r => r.tags);
    return [...new Set(allTags)].sort();
  }, [resources]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const handleCardClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDrawerOpen(true);
  };

  const handleQRClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsQRModalOpen(true);
  };

  return (
    <div className={`w-full ${className}`}>
      {(title || subtitle) && (
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title && (
            <AnimatedText
              text={title}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              variant="morphing"
              duration={1}
            />
          )}
          {subtitle && (
            <AnimatedText
              text={subtitle}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              variant="fadeInUp"
              delay={0.3}
            />
          )}
        </motion.div>
      )}

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            availableCategories={availableCategories}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            resultsCount={filteredResources.length}
          />
        </motion.div>
      )}

      <motion.div 
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-sps-ruby/15 to-sps-indigo/15 dark:from-sps-ruby/30 dark:to-sps-indigo/30 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
            
            <AnimatedText
              text="No resources found"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              variant="glitch"
            />
            
            <AnimatedText
              text="Try adjusting your search criteria or browse all resources."
              className="text-gray-600 dark:text-gray-400 mb-8"
              variant="fadeInUp"
              delay={0.3}
            />
            
            <motion.button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTags([]);
              }}
              className="px-8 py-4 bg-gradient-to-r from-sps-ruby to-sps-indigo text-white rounded-2xl font-medium hover:from-sps-ruby to-sps-indigo transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-6'
            }
          >
            <AnimatePresence mode="wait">
              {filteredResources.map((resource, index) => (
                <AdvancedResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index}
                  viewMode={viewMode}
                  onCardClick={() => handleCardClick(resource)}
                  onQRClick={() => handleQRClick(resource)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      {selectedResource && (
        <>
          <DrawerDetail
            resource={selectedResource}
            isOpen={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false);
              setSelectedResource(null);
            }}
          />

          <QRModal
            resource={selectedResource}
            isOpen={isQRModalOpen}
            onClose={() => {
              setIsQRModalOpen(false);
              setSelectedResource(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default FloatingCardGrid;
