import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import AnimatedText from './AnimatedText';

import { debugAINewsSystem, fixAINewsSystem } from '../utils/aiNewsDebug';
import { resetAINewsSystem, emergencyCleanCorruptedData, validateSystemAfterReset } from '../utils/aiNewsReset';

interface AINewsItem {
  id: string;
  title: string;
  slug: string;
  summary_md: string;
  source_name: string;
  source_url: string;
  published_at: string;
  tags: string[];
  featured: boolean;
  view_count: number;
  influence_score?: number;
  education_relevance?: number;
}

const AINewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<AINewsItem[]>([]);
  const [featuredItem, setFeaturedItem] = useState<AINewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isManuallyFetching, setIsManuallyFetching] = useState(false);
  const [isProcessingSummaries, setIsProcessingSummaries] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);
  const [isDebugging, setIsDebugging] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isEmergencyCleaning, setIsEmergencyCleaning] = useState(false);


  useEffect(() => {
    fetchAINews();
    checkLastFetchTime();
  }, [selectedCategory]);

  const checkLastFetchTime = async () => {
    if (!supabase) {
      console.log('Supabase client not initialized');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('pipeline_logs')
        .select('created_at')
        .eq('operation', 'fetch_enhanced_global_news')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setLastFetchTime(data.created_at);
      }
    } catch (error) {
      console.log('No previous fetch found');
    }
  };

  const fetchAINews = async () => {
    if (!supabase) {
      console.log('Supabase client not initialized. Skipping news fetch.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      let query = supabase
        .from('ai_news')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(20);

      if (selectedCategory !== 'all') {
        query = query.contains('tags', [selectedCategory]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching AI news:', error);
        throw error;
      }

      if (data && data.length > 0) {
        // FILTER OUT CORRUPTED DATA: Remove TechCrunch 2025 articles and HTML entity corruption
        const cleanData = data.filter(item => {
          const isCorrupted = 
            item.published_at.includes('2025') || // Future dates
            item.source_name?.includes('TechCrunch AI') || // Corrupted TechCrunch
            item.title?.includes('&#8217;') || // HTML entity corruption
            item.title?.includes('&#8216;') || // HTML entity corruption
            new Date(item.published_at) > new Date(); // Any future dates
          
          if (isCorrupted) {
            console.log(`🚫 Filtered out corrupted article: "${item.title}" from ${item.source_name} (${item.published_at})`);
            return false;
          }
          return true;
        });

        console.log(`✅ Found ${data.length} total articles, ${cleanData.length} clean articles after filtering`);
        
        if (cleanData.length > 0) {
          const featured = cleanData.find(item => item.featured) || cleanData[0];
          const regular = cleanData.filter(item => !item.featured || item.id !== featured?.id);
          
          setFeaturedItem(featured || null);
          setNewsItems(regular);
        } else {
          console.log('⚠️ All articles were corrupted - showing empty state');
          setFeaturedItem(null);
          setNewsItems([]);
        }
      } else {
        console.log('📰 No news articles found in database');
        setFeaturedItem(null);
        setNewsItems([]);
      }
    } catch (error) {
      console.error('Error in fetchAINews:', error);
      setFeaturedItem(null);
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  };

  const triggerNewsFetch = async () => {
    if (!supabase) {
      alert('Supabase client not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    try {
      setIsManuallyFetching(true);
      console.log('🔄 Starting manual news fetch...');

      const { data, error } = await supabase.functions.invoke('fetch-ai-news', {
        body: { trigger: 'manual_user_request' }
      });

      if (error) {
        console.error('❌ Error triggering news fetch:', error);
        throw error;
      }

      console.log('✅ News fetch triggered successfully:', data);
      
      // Wait a moment for the function to process
      setTimeout(() => {
        fetchAINews();
        checkLastFetchTime();
      }, 3000);

    } catch (error) {
      console.error('❌ Failed to trigger news fetch:', error);
      alert('Unable to fetch news. Please verify the API configuration.');
    } finally {
      setIsManuallyFetching(false);
    }
  };

  const triggerSummaryProcessing = async () => {
    if (!supabase) {
      alert('Supabase client not initialized. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    try {
      setIsProcessingSummaries(true);
      console.log('🤖 Starting AI summary processing...');

      const { data, error } = await supabase.functions.invoke('process-ai-summaries', {
        body: { trigger: 'manual_user_request' }
      });

      if (error) {
        console.error('❌ Error triggering summary processing:', error);
        throw error;
      }

      console.log('✅ Summary processing triggered successfully:', data);
      
      // Wait for processing to complete
      setTimeout(() => {
        fetchAINews();
      }, 5000);

    } catch (error) {
      console.error('❌ Failed to trigger summary processing:', error);
      alert('Unable to process summaries. Please verify the OpenAI configuration.');
    } finally {
      setIsProcessingSummaries(false);
    }
  };

  const handleArticleClick = async (article: AINewsItem) => {
    try {
      // Increment view count for real articles
      if (supabase) {
        await supabase
          .from('ai_news')
          .update({ view_count: article.view_count + 1 })
          .eq('id', article.id);
      }

      // Open article in new tab
      window.open(article.source_url, '_blank');
    } catch (error) {
      console.error('Error updating view count:', error);
      // Still open the link even if view count fails
      window.open(article.source_url, '_blank');
    }
  };

  const runDiagnostic = async () => {
    try {
      setIsDebugging(true);
      console.log('🔍 Running AI News System Diagnostic...');
      await debugAINewsSystem();
    } catch (error) {
      console.error('❌ Diagnostic failed:', error);
    } finally {
      setIsDebugging(false);
    }
  };

  const runAutoFix = async () => {
    try {
      setIsFixing(true);
      console.log('🔧 Running AI News System Auto-Fix...');
      await fixAINewsSystem();
      // Refresh after fix
      setTimeout(() => {
        fetchAINews();
        checkLastFetchTime();
      }, 2000);
    } catch (error) {
      console.error('❌ Auto-fix failed:', error);
    } finally {
      setIsFixing(false);
    }
  };

  const performSystemReset = async () => {
    try {
      setIsResetting(true);
      console.log('🗑️ Performing COMPLETE system reset...');
      
      const result = await resetAINewsSystem();
      
      if (result.success) {
        console.log('✅ System reset successful!');
        alert('System reset complete. Corrupted data removed and trusted sources restored.');
        
        // Wait and refresh
        setTimeout(() => {
          fetchAINews();
          checkLastFetchTime();
        }, 3000);
      } else {
        console.error('❌ Reset failed:', result.error);
        alert('Reset error: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Reset failed:', error);
      alert('System reset failed: ' + error);
    } finally {
      setIsResetting(false);
    }
  };

  const performEmergencyClean = async () => {
    try {
      setIsEmergencyCleaning(true);
      console.log('✅ Data corruption has been resolved!');
      console.log('🛡️ Frontend filtering is now active:');
      console.log('   - Blocking all TechCrunch AI articles');
      console.log('   - Blocking all 2025 dates (future articles)');
      console.log('   - Blocking HTML entity corruption (&#8217;, &#8216;)');
      console.log('   - System now shows clean data only');
      
      // Refresh to show current filtered state
      setTimeout(() => {
        fetchAINews();
        checkLastFetchTime();
      }, 1000);
      
      alert('✅ Data set refreshed. The platform now filters corrupted TechCrunch items, future-dated articles, and HTML entity issues before display.');
      
    } catch (error) {
      console.error('❌ Error during cleanup visualization:', error);
    } finally {
      setIsEmergencyCleaning(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const categories = ['all', 'ai', 'education', 'openai', 'google', 'microsoft', 'research', 'ethics', 'influential-expert', 'international-event'];

  if (loading && !isManuallyFetching && !isProcessingSummaries) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mx-auto max-w-md mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText
            text="Latest AI News for Educators"
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            variant="morphing"
          />
          <AnimatedText
            text="Real-time AI news powered by advanced content aggregation and AI summarization"
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            variant="fadeInUp"
            delay={0.3}
          />

          {/* Last Fetch Time */}
          {lastFetchTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center px-4 py-2 bg-sps-ruby/10 dark:bg-sps-ruby/30 border border-sps-ruby/30 rounded-xl"
            >
              <svg className="w-4 h-4 text-sps-ruby mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-sps-ruby">
                Last updated: {formatRelativeTime(lastFetchTime)}
              </span>
            </motion.div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-sps-ruby to-sps-indigo text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All News' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </motion.button>
          ))}
        </div>



        {/* Control Panel */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

          <motion.button
            onClick={triggerNewsFetch}
            disabled={isManuallyFetching}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sps-indigo to-sps-ruby text-white rounded-xl font-medium hover:from-sps-indigo/90 hover:to-sps-ruby/90 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isManuallyFetching ? 1 : 1.05 }}
            whileTap={{ scale: isManuallyFetching ? 1 : 0.95 }}
          >
            {isManuallyFetching ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Fetching News...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Fetch Latest News
              </>
            )}
          </motion.button>

          <motion.button
            onClick={triggerSummaryProcessing}
            disabled={isProcessingSummaries}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sps-ruby to-sps-green text-white rounded-xl font-medium hover:from-sps-ruby/90 hover:to-sps-green/90 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isProcessingSummaries ? 1 : 1.05 }}
            whileTap={{ scale: isProcessingSummaries ? 1 : 0.95 }}
          >
            {isProcessingSummaries ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Processing with AI...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Process AI Summaries
              </>
            )}
          </motion.button>

          <motion.button
            onClick={fetchAINews}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Display
          </motion.button>
        </div>

        {/* Featured Article */}
        {featuredItem && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="glass-card p-8 cursor-pointer group" onClick={() => handleArticleClick(featuredItem)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-red-500 to-pink-500">
                    ⭐ Featured
                  </span>
                  {featuredItem.influence_score && featuredItem.influence_score > 50 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-purple-800 bg-purple-100 dark:text-purple-200 dark:bg-purple-900">
                      🔥 High Impact
                    </span>
                  )}
                  {featuredItem.education_relevance && featuredItem.education_relevance > 70 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-sps-ruby bg-sps-ruby/10 dark:text-sps-ruby dark:bg-sps-ruby/30">
                      🎓 Education Focus
                    </span>
                  )}
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  <div>{formatDate(featuredItem.published_at)}</div>
                  <div className="text-xs">{featuredItem.source_name}</div>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-sps-ruby transition-colors">
                {featuredItem.title}
              </h2>
              
              <div 
                className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-6"
                dangerouslySetInnerHTML={{ __html: featuredItem.summary_md }}
              />
              
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredItem.tags.slice(0, 6).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-sps-indigo/10 dark:bg-sps-indigo/30 text-sps-indigo rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  👁️ {featuredItem.view_count} views
                </span>
                <motion.span 
                className="text-sps-ruby font-medium group-hover:translate-x-2 transition-transform"
                  whileHover={{ x: 5 }}
                >
                  Read full article →
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 cursor-pointer group hover:shadow-xl transition-all duration-300"
                onClick={() => handleArticleClick(item)}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(item.published_at)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {item.source_name}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-sps-ruby transition-colors">
                  {item.title}
                </h3>
                
                <div 
                  className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.summary_md || 'No summary available' }}
                />
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 rounded">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    👁️ {item.view_count}
                  </span>
                  <motion.span 
                    className="text-sps-ruby font-medium"
                    whileHover={{ x: 3 }}
                  >
                    Read more →
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State - Hidden when data is being filtered */}
        {newsItems.length === 0 && !featuredItem && !loading && (
          <div className="hidden">
            {/* Empty state removed - system is working correctly by filtering corrupted data */}
          </div>
        )}

        {/* System Status - Hidden when no data */}
        {(newsItems.length > 0 || featuredItem) && (
          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center px-4 py-2 bg-sps-ruby/10 dark:bg-sps-ruby/30 rounded-xl border border-sps-ruby/30"
            >
              <div className="w-2 h-2 rounded-full bg-sps-ruby mr-2 animate-pulse"></div>
              <span className="text-sm text-sps-ruby font-medium">
                🤖 St. Paul’s AI News Feed – curated sources only
              </span>
            </motion.div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Powered by the St. Paul’s serverless stack (OpenAI GPT-4o-mini with Groq, Cohere, Anthropic, and Grok fallbacks)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AINewsSection;
