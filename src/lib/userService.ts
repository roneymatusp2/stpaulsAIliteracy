import { supabase } from './supabase';
import { getCurrentUserToken } from './firebase';

// Types
export interface UserProfile {
  id: string;
  firebase_uid: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  last_login: string;
  preferences: Record<string, any>;
}

export interface Bookmark {
  id: string;
  user_id: string;
  resource_type: 'tool' | 'course' | 'book' | 'video' | 'article' | 'news';
  resource_id: string;
  resource_title: string;
  resource_url: string | null;
  resource_metadata: Record<string, any>;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LearningProgress {
  id: string;
  user_id: string;
  course_id: string;
  course_title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress_percentage: number;
  started_at: string | null;
  completed_at: string | null;
  last_accessed: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// Helper to set Firebase token for RLS
const setAuthToken = async () => {
  const token = await getCurrentUserToken();
  if (token) {
    // Set the JWT token in the request context for RLS
    supabase.functions.setAuth(token);
  }
};

// User Profile Functions
export const getUserProfile = async (firebaseUid: string): Promise<UserProfile | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('firebase_uid', firebaseUid)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const createUserProfile = async (profile: {
  firebase_uid: string;
  email: string;
  display_name?: string;
  photo_url?: string;
}): Promise<UserProfile | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        firebase_uid: profile.firebase_uid,
        email: profile.email,
        display_name: profile.display_name || null,
        photo_url: profile.photo_url || null,
        last_login: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (
  firebaseUid: string,
  updates: Partial<Pick<UserProfile, 'display_name' | 'photo_url' | 'preferences'>>
): Promise<UserProfile | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('firebase_uid', firebaseUid)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};

export const updateLastLogin = async (firebaseUid: string): Promise<void> => {
  try {
    await setAuthToken();
    await supabase
      .from('user_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('firebase_uid', firebaseUid);
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

// Bookmark Functions
export const getUserBookmarks = async (userId: string): Promise<Bookmark[]> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};

export const getBookmarksByType = async (
  userId: string,
  resourceType: Bookmark['resource_type']
): Promise<Bookmark[]> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .eq('resource_type', resourceType)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bookmarks by type:', error);
    return [];
  }
};

export const isBookmarked = async (
  userId: string,
  resourceType: Bookmark['resource_type'],
  resourceId: string
): Promise<boolean> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};

export const createBookmark = async (bookmark: {
  user_id: string;
  resource_type: Bookmark['resource_type'];
  resource_id: string;
  resource_title: string;
  resource_url?: string;
  resource_metadata?: Record<string, any>;
  notes?: string;
}): Promise<Bookmark | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('bookmarks')
      .insert(bookmark)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return null;
  }
};

export const deleteBookmark = async (
  userId: string,
  resourceType: Bookmark['resource_type'],
  resourceId: string
): Promise<boolean> => {
  try {
    await setAuthToken();
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return false;
  }
};

export const updateBookmarkNotes = async (
  bookmarkId: string,
  notes: string
): Promise<Bookmark | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('bookmarks')
      .update({ notes })
      .eq('id', bookmarkId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating bookmark notes:', error);
    return null;
  }
};

// Learning Progress Functions
export const getLearningProgress = async (userId: string): Promise<LearningProgress[]> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching learning progress:', error);
    return [];
  }
};

export const getCourseProgress = async (
  userId: string,
  courseId: string
): Promise<LearningProgress | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return null;
  }
};

export const upsertLearningProgress = async (progress: {
  user_id: string;
  course_id: string;
  course_title: string;
  status: LearningProgress['status'];
  progress_percentage: number;
  notes?: string;
}): Promise<LearningProgress | null> => {
  try {
    await setAuthToken();

    const updateData: any = {
      ...progress,
      last_accessed: new Date().toISOString(),
    };

    // Set started_at if moving to in_progress
    if (progress.status === 'in_progress' && !progress.progress_percentage) {
      updateData.started_at = new Date().toISOString();
    }

    // Set completed_at if status is completed
    if (progress.status === 'completed') {
      updateData.completed_at = new Date().toISOString();
      updateData.progress_percentage = 100;
    }

    const { data, error } = await supabase
      .from('learning_progress')
      .upsert(updateData, { onConflict: 'user_id,course_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error upserting learning progress:', error);
    return null;
  }
};

// Collection Functions
export const getUserCollections = async (userId: string): Promise<Collection[]> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const createCollection = async (collection: {
  user_id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  is_public?: boolean;
}): Promise<Collection | null> => {
  try {
    await setAuthToken();
    const { data, error } = await supabase
      .from('collections')
      .insert(collection)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating collection:', error);
    return null;
  }
};

export const addBookmarkToCollection = async (
  collectionId: string,
  bookmarkId: string,
  position: number = 0
): Promise<boolean> => {
  try {
    await setAuthToken();
    const { error } = await supabase
      .from('collection_items')
      .insert({ collection_id: collectionId, bookmark_id: bookmarkId, position });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding bookmark to collection:', error);
    return false;
  }
};

// Activity Tracking
export const trackUserActivity = async (activity: {
  user_id: string;
  activity_type: 'view' | 'search' | 'bookmark' | 'unbookmark' | 'share' | 'download';
  resource_type: string;
  resource_id: string;
  metadata?: Record<string, any>;
}): Promise<void> => {
  try {
    await setAuthToken();
    await supabase.from('user_activity').insert(activity);
  } catch (error) {
    console.error('Error tracking user activity:', error);
  }
};
