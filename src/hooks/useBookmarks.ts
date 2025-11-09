import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserProfile,
  createUserProfile,
  getUserBookmarks,
  createBookmark,
  deleteBookmark,
  isBookmarked,
  trackUserActivity,
  type Bookmark,
} from '../lib/userService';

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch or create user profile
  useEffect(() => {
    const initUserProfile = async () => {
      if (!user) {
        setUserProfile(null);
        setBookmarks([]);
        return;
      }

      try {
        let profile = await getUserProfile(user.uid);

        if (!profile) {
          // Create profile if it doesn't exist
          profile = await createUserProfile({
            firebase_uid: user.uid,
            email: user.email!,
            display_name: user.displayName || undefined,
            photo_url: user.photoURL || undefined,
          });
        }

        setUserProfile(profile);
      } catch (error) {
        console.error('Error initializing user profile:', error);
      }
    };

    initUserProfile();
  }, [user]);

  // Fetch bookmarks when user profile is available
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!userProfile) return;

      try {
        setLoading(true);
        const data = await getUserBookmarks(userProfile.id);
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userProfile]);

  const addBookmark = useCallback(
    async (bookmark: {
      resource_type: Bookmark['resource_type'];
      resource_id: string;
      resource_title: string;
      resource_url?: string;
      resource_metadata?: Record<string, any>;
    }) => {
      if (!userProfile) return false;

      try {
        const newBookmark = await createBookmark({
          user_id: userProfile.id,
          ...bookmark,
        });

        if (newBookmark) {
          setBookmarks((prev) => [newBookmark, ...prev]);

          // Track activity
          await trackUserActivity({
            user_id: userProfile.id,
            activity_type: 'bookmark',
            resource_type: bookmark.resource_type,
            resource_id: bookmark.resource_id,
          });

          return true;
        }
        return false;
      } catch (error) {
        console.error('Error adding bookmark:', error);
        return false;
      }
    },
    [userProfile]
  );

  const removeBookmark = useCallback(
    async (resourceType: Bookmark['resource_type'], resourceId: string) => {
      if (!userProfile) return false;

      try {
        const success = await deleteBookmark(userProfile.id, resourceType, resourceId);

        if (success) {
          setBookmarks((prev) =>
            prev.filter(
              (b) => !(b.resource_type === resourceType && b.resource_id === resourceId)
            )
          );

          // Track activity
          await trackUserActivity({
            user_id: userProfile.id,
            activity_type: 'unbookmark',
            resource_type: resourceType,
            resource_id: resourceId,
          });

          return true;
        }
        return false;
      } catch (error) {
        console.error('Error removing bookmark:', error);
        return false;
      }
    },
    [userProfile]
  );

  const checkIsBookmarked = useCallback(
    async (resourceType: Bookmark['resource_type'], resourceId: string): Promise<boolean> => {
      if (!userProfile) return false;
      return await isBookmarked(userProfile.id, resourceType, resourceId);
    },
    [userProfile]
  );

  const isResourceBookmarked = useCallback(
    (resourceType: Bookmark['resource_type'], resourceId: string): boolean => {
      return bookmarks.some(
        (b) => b.resource_type === resourceType && b.resource_id === resourceId
      );
    },
    [bookmarks]
  );

  const getBookmarksByType = useCallback(
    (resourceType: Bookmark['resource_type']): Bookmark[] => {
      return bookmarks.filter((b) => b.resource_type === resourceType);
    },
    [bookmarks]
  );

  return {
    bookmarks,
    loading,
    userProfile,
    addBookmark,
    removeBookmark,
    checkIsBookmarked,
    isResourceBookmarked,
    getBookmarksByType,
  };
};
