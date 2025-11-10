import { createClient } from '@supabase/supabase-js';
import type { NewsSource } from './supabase';

// Admin client for operations that require bypassing RLS
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

// Only create admin client if both URL and service role key are available
if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  console.warn('⚠️ Supabase credentials not found. Admin operations will be limited.');
  if (!supabaseUrl) console.warn('Missing: VITE_SUPABASE_URL');
  if (!supabaseServiceKey) console.warn('Missing: SUPABASE_SERVICE_ROLE_KEY');
}

export { supabaseAdmin };

// Helper function to check if admin client is available
export const isAdminAvailable = (): boolean => {
  return supabaseAdmin !== null;
};

// Admin-only functions for bypassing RLS
export const adminInsertNews = async (newsData: Record<string, unknown>) => {
  if (!supabaseAdmin) {
    throw new Error('Admin client not initialized. Please add SUPABASE_SERVICE_ROLE_KEY to .env');
  }
  
  const { data, error } = await (supabaseAdmin
    .from('ai_news') as any)
    .insert(newsData as any);
    
  if (error) throw error;
  return data;
};

export const adminInsertNewsSource = async (sourceData: Omit<NewsSource, 'id' | 'created_at'>) => {
  if (!supabaseAdmin) {
    throw new Error('Admin client not initialized. Please add SUPABASE_SERVICE_ROLE_KEY to .env');
  }
  
  const { data, error } = await (supabaseAdmin
    .from('news_sources') as any)
    .insert(sourceData as any);
    
  if (error) throw error;
  return data;
};

export const adminUpdateNewsSource = async (id: string, updates: Partial<NewsSource>) => {
  if (!supabaseAdmin) {
    throw new Error('Admin client not initialized. Please add SUPABASE_SERVICE_ROLE_KEY to .env');
  }
  
  const { data, error } = await (supabaseAdmin
    .from('news_sources') as any)
    .update(updates as any)
    .eq('id', id);
    
  if (error) throw error;
  return data;
};

export const adminDeleteCorruptedNews = async () => {
  if (!supabaseAdmin) {
    throw new Error('Admin client not initialized. Please add SUPABASE_SERVICE_ROLE_KEY to .env');
  }
  
  // Delete corrupted entries (future dates, malformed data, etc.)
  const { data, error } = await supabaseAdmin
    .from('ai_news')
    .delete()
    .gte('published_at', '2025-01-01');
    
  if (error) throw error;
  return data;
};