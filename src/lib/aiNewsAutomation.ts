import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';

// Automated system configuration
const AUTOMATION_CONFIG = {
  FETCH_INTERVAL_HOURS: 3,
  SUMMARY_DELAY_MINUTES: 15,
  MAX_ARTICLES_PER_BATCH: 10,
  CLEANUP_DAYS: 30,
  PROJECT_ID: 'gjvtncdjcslnkfctqnfy',
  SUPABASE_URL: 'https://gjvtncdjcslnkfctqnfy.supabase.co'
};

export interface AutomationStatus {
  isRunning: boolean;
  lastFetch: string | null;
  lastSummary: string | null;
  nextScheduledFetch: string | null;
  articlesInQueue: number;
  systemHealth: 'healthy' | 'warning' | 'error';
  errors: string[];
}

// Initialise automation system
export const initializeAINewsAutomation = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Initialising the AI news automation service...');
    
    // Ensure required tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('ai_news')
      .select('id')
      .limit(1);
    
    if (tablesError) {
      return {
        success: false,
        message: 'Error: Required database tables not found. Please run the migrations first.'
      };
    }

    // Check active news sources
    const { data: sources, error: sourcesError } = await supabase
      .from('news_sources')
      .select('*')
      .eq('is_active', true);

    if (sourcesError || !sources || sources.length === 0) {
      await setupReliableNewsSources();
    }

    // Configure Supabase automation (Edge Functions + schedules)
    await setupSupabaseAutomation();

    // Trigger an initial fetch when no published articles exist
    const { data: existingNews } = await supabase
      .from('ai_news')
      .select('id')
      .eq('status', 'published')
      .limit(1);

    if (!existingNews || existingNews.length === 0) {
      console.log('📰 Starting first news fetch...');
      await triggerInitialNewsFetch();
    }

    return {
      success: true,
      message: 'AI news automation initialised successfully.'
    };

  } catch (error) {
    console.error('❌ Initialisation error:', error);
    return {
      success: false,
      message: `Initialisation error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// Register reliable news sources
const setupReliableNewsSources = async () => {
  const reliableSources = [
    {
      name: 'OpenAI Official Blog',
      url: 'https://openai.com/blog/rss.xml',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '02:00:00'
    },
    {
      name: 'Google AI Research',
      url: 'https://ai.googleblog.com/feeds/posts/default',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '03:00:00'
    },
    {
      name: 'Anthropic Blog',
      url: 'https://www.anthropic.com/blog/rss.xml',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '04:00:00'
    },
    {
      name: 'MIT Technology Review AI',
      url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '03:00:00'
    },
    {
      name: 'DeepMind Blog',
      url: 'https://deepmind.google/blog/rss.xml',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '06:00:00'
    },
    {
      name: 'AI News',
      url: 'https://www.artificialintelligence-news.com/feed/',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '04:00:00'
    },
    {
      name: 'VentureBeat AI',
      url: 'https://venturebeat.com/ai/feed/',
      source_type: 'rss',
      is_active: true,
      fetch_interval: '04:00:00'
    }
  ];

  // Remove existing sources
  await supabase.from('news_sources').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // Insert the curated list
  for (const source of reliableSources) {
    const { error } = await supabase.from('news_sources').insert(source);
    if (error) {
      console.error(`❌ Erro ao inserir fonte ${source.name}:`, error);
    } else {
      console.log(`✅ Source registered: ${source.name}`);
    }
  }
};

// Configure automation in Supabase (Edge Functions + cron)
const setupSupabaseAutomation = async () => {
  try {
    // Log configuration
    await supabase.from('pipeline_logs').insert({
      operation: 'setup_automation',
      status: 'started',
      message: 'Configuring AI news automation',
      details: {
        project_id: AUTOMATION_CONFIG.PROJECT_ID,
        fetch_interval: AUTOMATION_CONFIG.FETCH_INTERVAL_HOURS,
        summary_delay: AUTOMATION_CONFIG.SUMMARY_DELAY_MINUTES
      }
    });

    console.log('⚙️ Automation configured in Supabase');
    console.log(`🔄 Automatic fetch cadence: every ${AUTOMATION_CONFIG.FETCH_INTERVAL_HOURS} hours`);
    console.log(`🤖 AI summaries: ${AUTOMATION_CONFIG.SUMMARY_DELAY_MINUTES} minutes after each fetch`);

  } catch (error) {
    console.error('❌ Automation configuration error:', error);
  }
};

// Bootstrap fetch
const triggerInitialNewsFetch = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-ai-news', {
      body: { 
        trigger: 'initial_setup',
        project_id: AUTOMATION_CONFIG.PROJECT_ID
      }
    });

    if (error) {
      console.error('❌ Initial fetch error:', error);
      return;
    }

    console.log('✅ Initial fetch complete:', data);

    // Aguardar e processar resumos
    setTimeout(async () => {
      await triggerSummaryProcessing();
    }, 5000);

  } catch (error) {
    console.error('❌ Initial fetch error:', error);
  }
};

// Process AI summaries
const triggerSummaryProcessing = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('process-ai-summaries', {
      body: { 
        trigger: 'automated_processing',
        project_id: AUTOMATION_CONFIG.PROJECT_ID
      }
    });

    if (error) {
      console.error('❌ Erro no processamento de resumos:', error);
      return;
    }

    console.log('✅ Resumos processados:', data);

  } catch (error) {
    console.error('❌ Erro no processamento de resumos:', error);
  }
};

// Retrieve automation status
export const getAutomationStatus = async (): Promise<AutomationStatus> => {
  try {
    // Review last fetch
    const { data: lastFetch } = await supabase
      .from('pipeline_logs')
      .select('created_at')
      .eq('operation', 'fetch_enhanced_global_news')
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Review last summary batch
    const { data: lastSummary } = await supabase
      .from('pipeline_logs')
      .select('created_at')
      .eq('operation', 'process_summaries_openai_first')
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Contar artigos pendentes
    const { data: pendingArticles } = await supabase
      .from('ai_news')
      .select('id')
      .eq('status', 'pending');

    // Verificar erros recentes
    const { data: recentErrors } = await supabase
      .from('pipeline_logs')
      .select('message')
      .eq('status', 'error')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(5);

    // Calculate next scheduled fetch
    const nextFetch = lastFetch?.created_at 
      ? new Date(new Date(lastFetch.created_at).getTime() + AUTOMATION_CONFIG.FETCH_INTERVAL_HOURS * 60 * 60 * 1000)
      : new Date();

    // Determine system health
    let systemHealth: 'healthy' | 'warning' | 'error' = 'healthy';
    if (recentErrors && recentErrors.length > 3) {
      systemHealth = 'error';
    } else if (recentErrors && recentErrors.length > 0) {
      systemHealth = 'warning';
    }

    return {
      isRunning: true,
      lastFetch: lastFetch?.created_at || null,
      lastSummary: lastSummary?.created_at || null,
      nextScheduledFetch: nextFetch.toISOString(),
      articlesInQueue: pendingArticles?.length || 0,
      systemHealth,
      errors: recentErrors?.map(e => e.message) || []
    };

  } catch (error) {
    console.error('❌ Erro ao obter status:', error);
    return {
      isRunning: false,
      lastFetch: null,
      lastSummary: null,
      nextScheduledFetch: null,
      articlesInQueue: 0,
      systemHealth: 'error',
      errors: [error instanceof Error ? error.message : String(error)]
    };
  }
};

// Manual fetch trigger
export const triggerManualNewsFetch = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🔄 Starting manual news fetch...');

    const { data, error } = await supabase.functions.invoke('fetch-ai-news', {
      body: { 
        trigger: 'manual_user_request',
        project_id: AUTOMATION_CONFIG.PROJECT_ID
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
        message: `Fetch complete: ${data.articles_fetched} new articles`
    };

  } catch (error) {
    console.error('❌ Manual fetch error:', error);
    return {
      success: false,
      message: `Fetch error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// Manual summary processing
export const triggerManualSummaryProcessing = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🤖 Starting manual summary processing...');

    const { data, error } = await supabase.functions.invoke('process-ai-summaries', {
      body: { 
        trigger: 'manual_user_request',
        project_id: AUTOMATION_CONFIG.PROJECT_ID
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: `Summaries processed: ${data.processed} articles`
    };

  } catch (error) {
    console.error('❌ Manual processing error:', error);
    return {
      success: false,
      message: `Processing error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// Automatic clean-up of stale data
export const performAutomaticCleanup = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🧹 Running automatic clean-up...');

    // Remover logs antigos
    const { error: logsError } = await supabase
      .from('pipeline_logs')
      .delete()
      .lt('created_at', new Date(Date.now() - AUTOMATION_CONFIG.CLEANUP_DAYS * 24 * 60 * 60 * 1000).toISOString());

    // Remover artigos com falha antigos
    const { error: failedError } = await supabase
      .from('ai_news')
      .delete()
      .eq('status', 'failed')
      .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    // Remover dados corrompidos
    const { error: corruptedError } = await supabase
      .from('ai_news')
      .delete()
      .or('published_at.gte.2025-01-01,title.ilike.*&#8217;*,title.ilike.*&#8216;*');

    if (logsError || failedError || corruptedError) {
      throw new Error('Error during clean-up');
    }

    return {
      success: true,
      message: 'Automatic clean-up complete'
    };

  } catch (error) {
    console.error('❌ Clean-up error:', error);
    return {
      success: false,
      message: `Clean-up error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// Evaluate system health
export const checkSystemHealth = async (): Promise<{ healthy: boolean; issues: string[] }> => {
  const issues: string[] = [];

  try {
    // Verify Supabase connectivity
    const { error: connectionError } = await supabase
      .from('ai_news')
      .select('id')
      .limit(1);

    if (connectionError) {
      issues.push('Supabase connection error');
    }

    // Check active sources
    const { data: activeSources, error: sourcesError } = await supabase
      .from('news_sources')
      .select('id')
      .eq('is_active', true);

    if (sourcesError || !activeSources || activeSources.length === 0) {
      issues.push('No active news sources configured');
    }

    // Check recent errors
    const { data: recentErrors } = await supabase
      .from('pipeline_logs')
      .select('id')
      .eq('status', 'error')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (recentErrors && recentErrors.length > 5) {
      issues.push(`Multiple errors recorded: ${recentErrors.length} in the last 24h`);
    }

    return {
      healthy: issues.length === 0,
      issues
    };

  } catch (error) {
    return {
      healthy: false,
      issues: [`Verification error: ${error instanceof Error ? error.message : String(error)}`]
    };
  }
};

// Monitoramento em tempo real
export const startRealtimeMonitoring = () => {
  // Monitorar novos artigos
  const newsSubscription = supabase
    .channel('ai_news_changes')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'ai_news' },
      (payload) => {
        console.log('📰 Novo artigo inserido:', payload.new);
      }
    )
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'ai_news' },
      (payload) => {
        if (payload.new.status === 'published') {
          console.log('✅ Artigo publicado:', payload.new.title);
        }
      }
    )
    .subscribe();

  // Monitorar logs do pipeline
  const logsSubscription = supabase
    .channel('pipeline_logs_changes')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'pipeline_logs' },
      (payload) => {
        const log = payload.new;
        if (log.status === 'error') {
          console.error('❌ Erro no pipeline:', log.message);
        } else if (log.status === 'completed') {
          console.log('✅ Operation complete:', log.operation);
        }
      }
    )
    .subscribe();

  return {
    newsSubscription,
    logsSubscription,
    stop: () => {
      newsSubscription.unsubscribe();
      logsSubscription.unsubscribe();
    }
  };
};

// Export configuration
export { AUTOMATION_CONFIG }; 
