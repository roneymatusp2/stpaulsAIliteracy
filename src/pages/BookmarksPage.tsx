import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../hooks/useBookmarks';
import type { Bookmark } from '../lib/userService';

const BookmarksPage: React.FC = () => {
  const { user } = useAuth();
  const { bookmarks, loading, removeBookmark, getBookmarksByType } = useBookmarks();
  const [selectedFilter, setSelectedFilter] = useState<'all' | Bookmark['resource_type']>('all');

  const filteredBookmarks = selectedFilter === 'all'
    ? bookmarks
    : getBookmarksByType(selectedFilter);

  const filterOptions: Array<{ value: 'all' | Bookmark['resource_type'], label: string, icon: string }> = [
    { value: 'all', label: 'All', icon: '📚' },
    { value: 'tool', label: 'Tools', icon: '🔧' },
    { value: 'course', label: 'Courses', icon: '🎓' },
    { value: 'book', label: 'Books', icon: '📖' },
    { value: 'video', label: 'Videos', icon: '🎥' },
    { value: 'article', label: 'Articles', icon: '📄' },
    { value: 'news', label: 'News', icon: '📰' },
  ];

  const handleRemoveBookmark = async (bookmark: Bookmark) => {
    if (confirm(`Remove "${bookmark.resource_title}" from bookmarks?`)) {
      await removeBookmark(bookmark.resource_type, bookmark.resource_id);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-ruby-red to-sps-indigo rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In to View Bookmarks
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Save your favorite AI tools, courses, and resources for quick access later.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Click "Sign In" in the header to get started
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ruby-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {bookmarks.length} saved {bookmarks.length === 1 ? 'item' : 'items'}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {filterOptions.map((option) => {
            const count = option.value === 'all'
              ? bookmarks.length
              : getBookmarksByType(option.value as Bookmark['resource_type']).length;

            return (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === option.value
                    ? 'bg-gradient-to-r from-ruby-red to-sps-indigo text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
                <span className="ml-2 text-sm opacity-75">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedFilter === 'all'
                ? 'Start exploring and bookmark your favorite resources!'
                : `No ${selectedFilter}s bookmarked yet`
              }
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
              >
                {/* Resource Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-ruby-red to-sps-indigo text-white">
                    {bookmark.resource_type}
                  </span>
                  <button
                    onClick={() => handleRemoveBookmark(bookmark)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove bookmark"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {bookmark.resource_title}
                </h3>

                {/* Metadata */}
                {bookmark.resource_metadata && (
                  <div className="space-y-2 mb-4">
                    {bookmark.resource_metadata.category && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Category: {bookmark.resource_metadata.category}
                      </p>
                    )}
                    {bookmark.resource_metadata.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {bookmark.resource_metadata.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Notes */}
                {bookmark.notes && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "{bookmark.notes}"
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {bookmark.resource_url && (
                    <a
                      href={bookmark.resource_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-ruby-red to-sps-indigo text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow text-center"
                    >
                      Open
                    </a>
                  )}
                  <button
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Share"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>

                {/* Saved Date */}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                  Saved {new Date(bookmark.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
