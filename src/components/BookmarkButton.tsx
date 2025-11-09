import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../hooks/useBookmarks';
import type { Bookmark } from '../lib/userService';

interface BookmarkButtonProps {
  resourceType: Bookmark['resource_type'];
  resourceId: string;
  resourceTitle: string;
  resourceUrl?: string;
  resourceMetadata?: Record<string, any>;
  variant?: 'default' | 'icon-only' | 'compact';
  onAuthRequired?: () => void;
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  resourceType,
  resourceId,
  resourceTitle,
  resourceUrl,
  resourceMetadata,
  variant = 'default',
  onAuthRequired,
  className = '',
}) => {
  const { user } = useAuth();
  const { isResourceBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [isLoading, setIsLoading] = useState(false);

  const bookmarked = isResourceBookmarked(resourceType, resourceId);

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      onAuthRequired?.();
      return;
    }

    setIsLoading(true);
    try {
      if (bookmarked) {
        await removeBookmark(resourceType, resourceId);
      } else {
        await addBookmark({
          resource_type: resourceType,
          resource_id: resourceId,
          resource_title: resourceTitle,
          resource_url: resourceUrl,
          resource_metadata: resourceMetadata,
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'icon-only') {
    return (
      <motion.button
        onClick={handleToggleBookmark}
        disabled={isLoading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
          bookmarked
            ? 'text-ruby-red bg-ruby-red/10'
            : 'text-gray-500 dark:text-gray-400 hover:text-ruby-red hover:bg-ruby-red/5'
        } ${className}`}
        title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {bookmarked ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        )}
      </motion.button>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.button
        onClick={handleToggleBookmark}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
          bookmarked
            ? 'bg-ruby-red text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        } ${className}`}
      >
        {bookmarked ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Saved
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleToggleBookmark}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
        bookmarked
          ? 'bg-ruby-red text-white shadow-lg shadow-ruby-red/30'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-ruby-red hover:text-ruby-red'
      } ${className}`}
    >
      {bookmarked ? (
        <>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Bookmarked
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Bookmark
        </>
      )}
    </motion.button>
  );
};
