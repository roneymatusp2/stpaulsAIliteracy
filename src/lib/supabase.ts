import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials (not placeholders)
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseAnonKey.includes('placeholder');

// Only create Supabase client if valid credentials are provided
export const supabase = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log warning if Supabase is not configured
if (!hasValidCredentials) {
  console.warn('⚠️ Supabase not configured. Using mock data. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}

export interface Resource {
  id: string;
  category: 'ai_tool' | 'course' | 'certification' | 'book' | 'site' | 'youtube';
  title: string;
  description?: string;
  url?: string;
  tags: string[];
  cover_url?: string;
  provider_meta?: {
    type?: string;
    eligibility?: string;
    geo_scope?: string;
    pricing?: string;
    key_features?: string;
    ai_relevance?: string;
    future_potential?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AINewsItem {
  id: string;
  title: string;
  slug: string;
  original_content?: string;
  summary_md?: string;
  tags: string[];
  source_url: string;
  source_name?: string;
  author?: string;
  published_at: string;
  processed_at?: string;
  status: 'pending' | 'processing' | 'published' | 'failed';
  featured: boolean;
  view_count: number;
  influence_score?: number;
  education_relevance?: number;
  content_type?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  source_type: 'rss' | 'api' | 'web_scraping';
  api_key?: string;
  is_active: boolean;
  last_fetched?: string;
  fetch_interval: string;
  created_at: string;
}

export interface PipelineLog {
  id: string;
  operation: string;
  status: string;
  message?: string;
  details?: any;
  execution_time_ms?: number;
  created_at: string;
}

// Fetch AI News
export const fetchAINews = async (category?: string, limit = 20) => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning empty array.');
    return [];
  }

  let query = supabase
    .from('ai_news')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (category && category !== 'all') {
    query = query.contains('tags', [category]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as AINewsItem[];
};

// Fetch Featured News
export const fetchFeaturedNews = async () => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning null.');
    return null;
  }

  const { data, error } = await supabase
    .from('ai_news')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data as AINewsItem | null;
};

// Increment article view count
export const incrementViewCount = async (articleId: string) => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Cannot increment view count.');
    return;
  }

  const { error } = await supabase.rpc('increment_view_count', {
    article_id: articleId
  });
  
  if (error) console.error('Error incrementing view count:', error);
};

// Trigger manual news fetch
export const triggerNewsFetch = async () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase.functions.invoke('fetch-ai-news', {
    body: { trigger: 'manual' }
  });
  
  if (error) throw error;
  return data;
};

// Trigger manual summary processing
export const triggerSummaryProcessing = async () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase.functions.invoke('process-ai-summaries', {
    body: { trigger: 'manual' }
  });
  
  if (error) throw error;
  return data;
};

// Fetch pipeline logs
export const fetchPipelineLogs = async (operation?: string, limit = 50) => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning empty array.');
    return [];
  }

  let query = supabase
    .from('pipeline_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (operation) {
    query = query.eq('operation', operation);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as PipelineLog[];
};

// News Sources Management
export const fetchNewsSources = async () => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning empty array.');
    return [];
  }

  const { data, error } = await supabase
    .from('news_sources')
    .select('*')
    .order('name');

  if (error) throw error;
  return data as NewsSource[];
};

export const updateNewsSource = async (id: string, updates: Partial<NewsSource>) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase
    .from('news_sources')
    .update(updates as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NewsSource;
};

// Validate URL function
export const validateUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    return response.ok;
  } catch (error) {
    console.error(`URL validation failed for ${url}:`, error);
    return false;
  }
};

// Curated AI Resources for Teachers: Real, Functional Tools Only
export const curatedResources: Resource[] = [
  {
    id: 'microsoft-educator-center',
    category: 'ai_tool',
    title: 'Microsoft Learn Educator Centre',
    description: 'Free learning pathways on AI fundamentals, including Azure AI and integration into educational curricula.',
    url: 'https://learn.microsoft.com/training/educator-center',
    tags: ['AI', 'Microsoft', 'Azure', 'curriculum', 'fundamentals', 'education', 'global', 'free'],
    cover_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Learning platform',
      eligibility: 'Educators aiming to teach AI or integrate it into technical subjects',
      geo_scope: 'Global',
      pricing: 'Free',
      key_features: 'Structured courses on AI concepts, machine learning, and AI ethics',
      ai_relevance: 'Offers structured courses on AI concepts, machine learning, and AI ethics',
      future_potential: 'Equips teachers with skills to develop AI-driven lessons and use cloud-based AI tools in classrooms'
    },
    created_at: '2024-06-13T10:00:00Z',
    updated_at: '2024-06-13T10:00:00Z'
  },
  {
    id: 'aws-educate',
    category: 'ai_tool',
    title: 'AWS Educate',
    description: 'Cloud computing and AI training, including machine learning courses and career pathways, free for students and educators.',
    url: 'https://aws.amazon.com/education/awseducate',
    tags: ['AI', 'AWS', 'cloud', 'machine-learning', 'career-pathways', 'education', 'global', 'free'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Cloud and AI training platform',
      eligibility: 'Students and educators',
      geo_scope: 'Global',
      pricing: 'Free',
      key_features: 'Machine learning courses, AI services, cloud-based AI applications',
      ai_relevance: 'Includes courses on machine learning, AI services, and cloud-based AI applications',
      future_potential: 'Prepares teachers to incorporate cloud-based AI solutions, such as AWS SageMaker, into future educational projects'
    },
    created_at: '2024-06-13T09:00:00Z',
    updated_at: '2024-06-13T09:00:00Z'
  },
  {
    id: 'teachable-machine',
    category: 'ai_tool',
    title: 'Teachable Machine by Google',
    description: 'A web-based tool that makes creating machine learning models fast, easy, and accessible to everyone.',
    url: 'https://teachablemachine.withgoogle.com/',
    tags: ['Machine Learning', 'Google', 'Web-based', 'Beginner-friendly', 'Visual'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      pricing: 'Free'
    },
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'openai-chatgpt',
    category: 'ai_tool',
    title: 'ChatGPT by OpenAI',
    description: 'Advanced conversational AI for educational support, lesson planning, and content creation.',
    url: 'https://chat.openai.com/',
    tags: ['ChatGPT', 'OpenAI', 'Conversational AI', 'Education', 'Content Creation'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      pricing: 'Free tier available, Plus subscription for enhanced features'
    },
    created_at: '2024-01-15T11:00:00Z',
    updated_at: '2024-01-15T11:00:00Z'
  }
];

// Mock resources for demonstration (only real, working tools)
export const mockResources: Resource[] = curatedResources;

// QR Code and Short Link functions
export const generateQRCodeUrl = (resourceId: string): string => {
  const baseUrl = window.location.origin;
  const resourceUrl = `${baseUrl}/resources/${resourceId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(resourceUrl)}`;
};

export const getShortLink = (resourceId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/r/${resourceId}`;
};

// AI Literacy Course Types and Functions
export interface AILiteracySkill {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  thinking_framework_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AILiteracyLesson {
  id: string;
  title: string;
  slug: string;
  description?: string;
  skill_id: string;
  skill?: AILiteracySkill;
  video_url?: string;
  video_duration_minutes?: number;
  content_markdown?: string;
  exercises: any[];
  resources: any[];
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AILiteracyProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  started_at?: string;
  completed_at?: string;
  time_spent_minutes: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AILiteracyAssessment {
  id: string;
  title: string;
  description?: string;
  questions: any[];
  passing_score: number;
  time_limit_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AILiteracyCertificate {
  id: string;
  user_id: string;
  assessment_attempt_id: string;
  certificate_number: string;
  issued_at: string;
  valid_until?: string;
  created_at: string;
}

// Fetch all AI Literacy skills
export const fetchAILiteracySkills = async (): Promise<AILiteracySkill[]> => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning empty array.');
    return [];
  }

  const { data, error } = await supabase
    .from('ai_literacy_skills')
    .select('*')
    .order('order_index');

  if (error) throw error;
  return data as AILiteracySkill[];
};

// Fetch all published lessons with their skills
export const fetchAILiteracyLessons = async (): Promise<AILiteracyLesson[]> => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning empty array.');
    return [];
  }

  const { data, error } = await supabase
    .from('ai_literacy_lessons')
    .select(`
      *,
      skill:ai_literacy_skills(*)
    `)
    .eq('is_published', true)
    .order('order_index');

  if (error) throw error;
  return data as any[];
};

// Fetch a single lesson by slug
export const fetchAILiteracyLessonBySlug = async (slug: string): Promise<AILiteracyLesson | null> => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning null.');
    return null;
  }

  const { data, error } = await supabase
    .from('ai_literacy_lessons')
    .select(`
      *,
      skill:ai_literacy_skills(*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as AILiteracyLesson | null;
};

// Fetch user progress for all lessons
export const fetchUserAILiteracyProgress = async (userId: string): Promise<AILiteracyProgress[]> => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Returning empty array.');
    return [];
  }

  const { data, error } = await supabase
    .from('ai_literacy_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data as AILiteracyProgress[];
};

// Update lesson progress
export const updateLessonProgress = async (
  userId: string,
  lessonId: string,
  status: 'not_started' | 'in_progress' | 'completed',
  timeSpentMinutes?: number
): Promise<AILiteracyProgress> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized.');
  }

  const updateData: any = {
    user_id: userId,
    lesson_id: lessonId,
    status,
    updated_at: new Date().toISOString()
  };

  if (status === 'in_progress' && !updateData.started_at) {
    updateData.started_at = new Date().toISOString();
  }

  if (status === 'completed') {
    updateData.completed_at = new Date().toISOString();
  }

  if (timeSpentMinutes !== undefined) {
    updateData.time_spent_minutes = timeSpentMinutes;
  }

  const { data, error } = await supabase
    .from('ai_literacy_progress')
    .upsert(updateData)
    .select()
    .single();

  if (error) throw error;
  return data as AILiteracyProgress;
};
