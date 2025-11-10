import { supabase } from '../lib/supabase';

export const debugAINewsSystem = async () => {
  const debug = {
    supabaseConfig: false,
    tablesExist: false,
    edgeFunctionsAccessible: false,
    hasData: false,
    errors: [] as string[]
  };

  try {
    // 1. Check Supabase configuration
    console.log('🔍 Checking Supabase configuration...');
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      debug.errors.push('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
      console.error('❌ Supabase environment variables not configured');
      return debug;
    }

    if (!supabase) {
      debug.errors.push('Supabase client failed to initialize');
      console.error('❌ Supabase client is null');
      return debug;
    }

    debug.supabaseConfig = true;
    console.log('✅ Supabase config found');

    // 2. Check if tables exist and are accessible
    console.log('🔍 Checking database tables...');
    try {
      const { data: newsData, error: newsError } = await supabase
        .from('ai_news')
        .select('count(*)')
        .limit(1);

      const { data: sourcesData, error: sourcesError } = await supabase
        .from('news_sources')
        .select('count(*)')
        .limit(1);

      const { data: logsData, error: logsError } = await supabase
        .from('pipeline_logs')
        .select('count(*)')
        .limit(1);

      if (newsError) {
        debug.errors.push(`ai_news table error: ${newsError.message}`);
      }
      if (sourcesError) {
        debug.errors.push(`news_sources table error: ${sourcesError.message}`);
      }
      if (logsError) {
        debug.errors.push(`pipeline_logs table error: ${logsError.message}`);
      }

      if (!newsError && !sourcesError && !logsError) {
        debug.tablesExist = true;
        console.log('✅ Database tables accessible');
        
        // Check if we have any data
        const { data: actualNewsData } = await supabase
          .from('ai_news')
          .select('*')
          .limit(5);
          
        if (actualNewsData && actualNewsData.length > 0) {
          debug.hasData = true;
          console.log(`✅ Found ${actualNewsData.length} news articles`);
        } else {
          console.log('⚠️ No news articles found in database');
        }
      }
    } catch (tableError) {
      debug.errors.push(`Database connection error: ${tableError}`);
    }

    // 3. Check Edge Functions
    console.log('🔍 Checking Edge Functions...');
    try {
      const { data, error } = await supabase.functions.invoke('fetch-ai-news', {
        body: { test: true }
      });

      if (error) {
        debug.errors.push(`Edge function error: ${error.message}`);
      } else {
        debug.edgeFunctionsAccessible = true;
        console.log('✅ Edge functions accessible');
      }
    } catch (functionError) {
      debug.errors.push(`Edge function connection error: ${functionError}`);
    }

    // 4. Summary
    console.log('\n📊 AI News System Debug Summary:');
    console.log('==========================================');
    console.log(`Supabase Config: ${debug.supabaseConfig ? '✅' : '❌'}`);
    console.log(`Database Tables: ${debug.tablesExist ? '✅' : '❌'}`);
    console.log(`Edge Functions: ${debug.edgeFunctionsAccessible ? '✅' : '❌'}`);
    console.log(`Has News Data: ${debug.hasData ? '✅' : '❌'}`);
    console.log('\n🐛 Errors:');
    debug.errors.forEach(error => console.log(`  ❌ ${error}`));
    console.log('==========================================\n');

    return debug;

  } catch (error) {
    debug.errors.push(`Fatal error: ${error}`);
    console.error('❌ Fatal error in AI News debug:', error);
    return debug;
  }
};

export const fixAINewsSystem = async () => {
  console.log('🔧 Starting AI News System auto-fix...');
  
  // 1. Try to create missing environment variables guide
  const envExample = `
# Add these to your .env file:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For Edge Functions
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
`;

  console.log('📝 Environment variables needed:');
  console.log(envExample);

  // 2. Try to create basic news sources if tables exist
  try {
    const { data: existingSources } = await supabase
      .from('news_sources')
      .select('*')
      .limit(1);

    if (existingSources && existingSources.length === 0) {
      console.log('🔧 Creating basic news sources...');
      
      const basicSources = [
        {
          name: 'OpenAI Blog',
          url: 'https://openai.com/blog/rss/',
          source_type: 'rss',
          is_active: true,
          fetch_interval: '1 hour'
        },
        {
          name: 'Google AI Blog',
          url: 'https://ai.googleblog.com/feeds/posts/default',
          source_type: 'rss', 
          is_active: true,
          fetch_interval: '1 hour'
        },
        {
          name: 'DeepMind Blog',
          url: 'https://deepmind.com/blog/rss.xml',
          source_type: 'rss',
          is_active: true,
          fetch_interval: '1 hour'
        }
      ];

      for (const source of basicSources) {
        const { error } = await supabase
          .from('news_sources')
          .insert(source);
          
        if (error) {
          console.error(`❌ Failed to create source ${source.name}:`, error);
        } else {
          console.log(`✅ Created source: ${source.name}`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Failed to create news sources:', error);
  }

  console.log('🔧 Auto-fix complete. Run debugAINewsSystem() again to check status.');
};