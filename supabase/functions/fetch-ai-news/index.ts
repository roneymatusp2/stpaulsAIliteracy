import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

interface NewsItem {
  title: string
  link: string
  description: string
  pubDate: string
  source: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    console.log('🌍 Starting ENHANCED AI news fetch with influential X accounts and international events...')
    
    // Log start of operation
    await supabase.from('pipeline_logs').insert({
      operation: 'fetch_enhanced_global_news',
      status: 'started',
      message: 'Beginning enhanced global AI news fetch including influential X accounts and international events'
    })

    // Get active news sources
    const { data: sources, error: sourcesError } = await supabase
      .from('news_sources')
      .select('*')
      .eq('is_active', true)

    if (sourcesError) {
      throw new Error(`Failed to fetch sources: ${sourcesError.message}`)
    }

    console.log(`📰 Found ${sources?.length || 0} active global news sources`)

    let totalFetched = 0
    let totalErrors = 0

    for (const source of sources || []) {
      try {
        console.log(`🌐 Fetching from: ${source.name} (${source.url})`)
        
        const startTime = Date.now()
        
        // Fetch based on source type
        let articles: NewsItem[] = []
        
        if (source.source_type === 'rss') {
          articles = await fetchRSSFeed(source)
        }
        
        console.log(`📄 Parsed ${articles.length} articles from ${source.name}`)

        // Process each article
        for (const article of articles) {
          try {
            // Check if article already exists
            const { data: existing } = await supabase
              .from('ai_news')
              .select('id')
              .eq('source_url', article.link)
              .single()

            if (existing) {
              console.log(`⏭️  Article already exists: ${article.title.substring(0, 50)}...`)
              continue
            }

            // Enhanced AI filtering with influential accounts and events
            if (!isAIRelatedEnhanced(article.title, article.description)) {
              console.log(`🚫 Not AI-related: ${article.title.substring(0, 50)}...`)
              continue
            }

            // Insert new article
            const { error: insertError } = await supabase
              .from('ai_news')
              .insert({
                title: article.title.substring(0, 255), // Prevent title too long
                original_content: article.description,
                source_url: article.link,
                source_name: source.name,
                published_at: new Date(article.pubDate).toISOString(),
                status: 'pending',
                tags: extractEnhancedTags(article.title, article.description)
              })

            if (insertError) {
              console.error(`❌ Failed to insert article: ${insertError.message}`)
              totalErrors++
            } else {
              console.log(`✅ Inserted: ${article.title.substring(0, 50)}...`)
              totalFetched++
            }

          } catch (articleError) {
            console.error(`❌ Error processing article: ${articleError}`)
            totalErrors++
          }
        }

        // Update source last_fetched
        await supabase
          .from('news_sources')
          .update({ last_fetched: new Date().toISOString() })
          .eq('id', source.id)

        const processingTime = Date.now() - startTime
        console.log(`⏱️  Processed ${source.name} in ${processingTime}ms`)

        // Rate limiting - wait 2 seconds between sources
        await new Promise(resolve => setTimeout(resolve, 2000))

      } catch (sourceError) {
        console.error(`❌ Error fetching from ${source.name}: ${sourceError}`)
        totalErrors++
        
        await supabase.from('pipeline_logs').insert({
          operation: 'fetch_enhanced_global_news',
          status: 'error',
          message: `Failed to fetch from ${source.name}`,
          details: { error: sourceError.message, source_id: source.id }
        })
      }
    }

    // Log completion
    await supabase.from('pipeline_logs').insert({
      operation: 'fetch_enhanced_global_news',
      status: 'completed',
      message: `Enhanced global fetch completed: ${totalFetched} new articles, ${totalErrors} errors`,
      details: { 
        articles_fetched: totalFetched, 
        errors: totalErrors,
        sources_processed: sources?.length || 0,
        enhancement: 'influential_x_accounts_and_international_events'
      }
    })

    console.log(`🎉 Enhanced global fetch completed: ${totalFetched} new articles`)

    return new Response(
      JSON.stringify({
        success: true,
        articles_fetched: totalFetched,
        errors: totalErrors,
        message: 'Enhanced global AI news fetch completed successfully',
        enhancements: ['influential_x_accounts', 'international_ai_events']
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Fatal error in fetch-enhanced-ai-news:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function fetchRSSFeed(source: any): Promise<NewsItem[]> {
  const response = await fetch(source.url, {
    headers: {
      'User-Agent': 'StPauls-AI-Learning/1.0 (+https://www.stpauls.br)',
      'Accept': 'application/rss+xml, application/atom+xml, text/xml, application/xml',
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const content = await response.text()
  
  // Check if it's Atom or RSS
  if (content.includes('<feed') || content.includes('xmlns="http://www.w3.org/2005/Atom"')) {
    return parseAtomFeed(content, source.name)
  } else {
    return parseRSSFeed(content, source.name)
  }
}

function parseAtomFeed(atomText: string, sourceName: string): NewsItem[] {
  const articles: NewsItem[] = []
  
  try {
    const entryRegex = /<entry[^>]*>(.*?)<\/entry>/gs
    const entries = atomText.match(entryRegex) || []
    
    for (const entry of entries) {
      const title = extractXMLContent(entry, 'title')
      const linkMatch = entry.match(/<link[^>]*href="([^"]*)"/)
      const link = linkMatch ? linkMatch[1] : ''
      const summary = extractXMLContent(entry, 'summary') || extractXMLContent(entry, 'content')
      const published = extractXMLContent(entry, 'published') || extractXMLContent(entry, 'updated')
      
      if (title && link) {
        articles.push({
          title: cleanText(title),
          link: link.trim(),
          description: cleanText(summary || ''),
          pubDate: published || new Date().toISOString(),
          source: sourceName
        })
      }
    }
  } catch (error) {
    console.error(`Error parsing Atom from ${sourceName}:`, error)
  }
  
  return articles
}

function parseRSSFeed(rssText: string, sourceName: string): NewsItem[] {
  const articles: NewsItem[] = []
  
  try {
    const itemRegex = /<item[^>]*>(.*?)<\/item>/gs
    const items = rssText.match(itemRegex) || []
    
    for (const item of items) {
      const title = extractXMLContent(item, 'title')
      const link = extractXMLContent(item, 'link')
      const description = extractXMLContent(item, 'description')
      const pubDate = extractXMLContent(item, 'pubDate')
      
      if (title && link) {
        articles.push({
          title: cleanText(title),
          link: link.trim(),
          description: cleanText(description || ''),
          pubDate: pubDate || new Date().toISOString(),
          source: sourceName
        })
      }
    }
  } catch (error) {
    console.error(`Error parsing RSS from ${sourceName}:`, error)
  }
  
  return articles
}

function extractXMLContent(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'is')
  const match = xml.match(regex)
  return match ? match[1] : ''
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/"/g, '"')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/"/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

function isAIRelatedEnhanced(title: string, description: string): boolean {
  const content = `${title} ${description}`.toLowerCase()
  
  // Influential Individual Accounts (Top 10 + Additional)
  const influentialAccounts = [
    // Top 10 Individual Accounts
    'lex fridman', 'lexfridman', '@lexfridman',
    'andrew ng', 'andrewng', '@andrewng',
    'sam altman', 'sama', '@sama',
    'yann lecun', 'ylecun', '@ylecun',
    'andrej karpathy', 'karpathy', '@karpathy',
    'fei-fei li', 'drfeifei', '@drfeifei',
    'demis hassabis', 'demishassabis', '@demishassabis',
    'allie k. miller', 'alliekmiller', '@alliekmiller',
    'geoffrey hinton', 'geoffreyhinton', '@geoffreyhinton',
    'marc andreessen', 'pmarca', '@pmarca',
    
    // Additional Accounts
    'manusai', '@manusai_hq',
    'minimax', '@minimax__ai',
    'btibor91', '@btibor91',
    'kent c. dodds', 'kentcdodds', '@kentcdodds'
  ]
  
  // Organizational Accounts
  const organizationalAccounts = [
    'openai', '@openai',
    'deepmind', '@deepmind',
    'google ai', 'googleai', '@googleai',
    'meta ai', 'metaai', '@metaai'
  ]
  
  // Core AI terms (multilingual)
  const aiKeywords = [
    // English
    'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
    'ai', 'ml', 'nlp', 'computer vision', 'robotics', 'automation',
    
    // Companies and models
    'chatgpt', 'openai', 'anthropic', 'claude', 'gemini', 'bard', 'copilot',
    'midjourney', 'dalle', 'gpt', 'bert', 'llama', 'palm', 'llm',
    'hugging face', 'stability ai', 'cohere', 'inflection',
    
    // Technical terms
    'generative ai', 'large language model', 'transformer', 'diffusion',
    'tensorflow', 'pytorch', 'stable diffusion', 'prompt engineering',
    'fine-tuning', 'reinforcement learning', 'supervised learning',
    
    // Research and development
    'arxiv', 'paper', 'research', 'breakthrough', 'algorithm',
    'dataset', 'model', 'training', 'inference', 'github',
    
    // Educational AI
    'ai in education', 'educational technology', 'personalized learning',
    'adaptive learning', 'intelligent tutoring', 'automated grading',
    
    // International Events and Conferences
    'neurips', 'icml', 'iclr', 'aaai', 'ijcai', 'aied', 'edm',
    'ai conference', 'machine learning conference', 'education conference',
    'ai summit', 'tech conference', 'innovation summit',
    'ieee', 'acm', 'educational data mining', 'learning analytics',
    
    // International Organizations
    'unesco', 'oecd', 'european commission', 'ai4education',
    'partnership on ai', 'ai now institute', 'future of humanity institute',
    
    // Multilingual awareness terms
    'intelligence artificielle', 'apprentissage automatique',
    'künstliche intelligenz', 'maschinelles lernen',
    
    // Social indicators
    '#ai', '#machinelearning', '#artificialintelligence', '#deeplearning',
    '#aieducation', '#edtech', '#futureoflearning'
  ]
  
  // Check for influential accounts
  const hasInfluentialAccount = influentialAccounts.some(account => content.includes(account.toLowerCase()))
  const hasOrganizationalAccount = organizationalAccounts.some(account => content.includes(account.toLowerCase()))
  
  // Check for AI keywords
  const hasAIKeywords = aiKeywords.some(keyword => content.includes(keyword.toLowerCase()))
  
  // Enhanced filtering: must have AI keywords OR be from influential accounts
  return hasAIKeywords || hasInfluentialAccount || hasOrganizationalAccount
}

function extractEnhancedTags(title: string, description: string): string[] {
  const content = `${title} ${description}`.toLowerCase()
  const tags: string[] = []
  
  const tagMap = {
    // Core AI
    'machine learning': ['machine-learning', 'ml'],
    'deep learning': ['deep-learning'],
    'neural network': ['neural-networks'],
    'computer vision': ['computer-vision'],
    'natural language processing': ['nlp'],
    'generative ai': ['generative-ai'],
    'large language model': ['llm'],
    
    // Influential Individuals
    'lex fridman': ['lex-fridman', 'influential'],
    'andrew ng': ['andrew-ng', 'influential'],
    'sam altman': ['sam-altman', 'openai', 'influential'],
    'yann lecun': ['yann-lecun', 'meta', 'influential'],
    'andrej karpathy': ['andrej-karpathy', 'influential'],
    'fei-fei li': ['fei-fei-li', 'stanford', 'influential'],
    'demis hassabis': ['demis-hassabis', 'deepmind', 'influential'],
    'allie k. miller': ['allie-miller', 'influential'],
    'geoffrey hinton': ['geoffrey-hinton', 'influential'],
    'marc andreessen': ['marc-andreessen', 'vc', 'influential'],
    
    // Companies
    'openai': ['openai', 'company'],
    'google': ['google', 'company'],
    'microsoft': ['microsoft', 'company'],
    'anthropic': ['anthropic', 'company'],
    'meta': ['meta', 'company'],
    'deepmind': ['deepmind', 'company'],
    
    // Models
    'chatgpt': ['chatgpt', 'openai'],
    'claude': ['claude', 'anthropic'],
    'gemini': ['gemini', 'google'],
    'gpt': ['gpt', 'openai'],
    
    // Educational Events & Conferences
    'neurips': ['neurips', 'conference', 'research'],
    'icml': ['icml', 'conference', 'research'],
    'iclr': ['iclr', 'conference', 'research'],
    'aaai': ['aaai', 'conference', 'research'],
    'ijcai': ['ijcai', 'conference', 'research'],
    'aied': ['aied', 'conference', 'education'],
    'edm': ['edm', 'conference', 'education'],
    'conference': ['conference', 'event'],
    'summit': ['summit', 'event'],
    'symposium': ['symposium', 'event'],
    
    // Sources
    'github': ['github', 'open-source'],
    'arxiv': ['research', 'academic'],
    'reddit': ['community', 'discussion'],
    'paper': ['research', 'academic'],
    
    // Education
    'education': ['education', 'teaching'],
    'learning': ['learning'],
    'student': ['education', 'student'],
    'teacher': ['education', 'teacher'],
    'classroom': ['education', 'classroom'],
    'curriculum': ['education', 'curriculum'],
    'pedagogy': ['education', 'pedagogy'],
    
    // International
    'unesco': ['unesco', 'international', 'organization'],
    'oecd': ['oecd', 'international', 'organization'],
    'european commission': ['eu', 'international', 'policy'],
    
    // Languages
    'spanish': ['spanish', 'international'],
    'francais': ['french', 'international'],
    'deutsch': ['german', 'international'],
    
    // Other
    'breakthrough': ['breakthrough', 'innovation'],
    'release': ['release', 'product'],
    'announcement': ['announcement', 'news'],
    'research': ['research', 'academic'],
    'funding': ['funding', 'investment'],
    'partnership': ['partnership', 'collaboration']
  }
  
  for (const [keyword, relatedTags] of Object.entries(tagMap)) {
    if (content.includes(keyword)) {
      tags.push(...relatedTags)
    }
  }
  
  // Always add 'ai' tag
  if (!tags.includes('ai')) {
    tags.push('ai')
  }
  
  // Add enhanced tag for influential content
  const influentialKeywords = ['lex fridman', 'andrew ng', 'sam altman', 'yann lecun', 'geoffrey hinton']
  if (influentialKeywords.some(keyword => content.includes(keyword))) {
    tags.push('influential-expert')
  }
  
  // Add international tag for global events/content
  const internationalKeywords = ['conference', 'summit', 'global', 'international', 'worldwide', 'unesco', 'oecd']
  if (internationalKeywords.some(keyword => content.includes(keyword))) {
    tags.push('international-event')
  }
  
  // Add global tag for non-English content
  if (content.match(/[àáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ]/)) {
    tags.push('international')
  }
  
  return [...new Set(tags)] // Remove duplicates
}
