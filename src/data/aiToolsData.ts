import { Resource } from '../lib/supabase';

// Comprehensive AI Tools Database from "AI Teacher Pro" Book
export const aiToolsData: Resource[] = [
  // General large-context chat / reasoning
  {
    id: 'chatgpt-gpt4o',
    category: 'ai_tool',
    title: 'ChatGPT (GPT-4o)',
    description: 'Flagship multimodal LLM with 128k-token context and integrated image/audio tools.',
    url: 'https://chat.openai.com/',
    tags: ['General AI', 'Multimodal', 'Large Context', 'OpenAI'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Conversational AI',
      pricing: 'Free tier + Plus subscription',
      key_features: 'Image analysis, code execution, file uploads, web browsing',
      ai_relevance: 'Premier AI assistant for lesson planning, content creation, and student support',
      future_potential: 'Continuous updates with new capabilities for education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'claude-3-5-sonnet',
    category: 'ai_tool',
    title: 'Claude 3.5 Sonnet',
    description: 'Anthropic\'s newest model; excels at deep reasoning and document analysis.',
    url: 'https://claude.ai/',
    tags: ['General AI', 'Reasoning', 'Document Analysis', 'Anthropic'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Conversational AI',
      pricing: 'Free tier + Pro subscription',
      key_features: 'Advanced reasoning, long context, document analysis, code generation',
      ai_relevance: 'Excellent for complex educational content analysis and creation',
      future_potential: 'Strong focus on safety and helpfulness for educational use'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'google-gemini-2-5-pro',
    category: 'ai_tool',
    title: 'Google Gemini 2.5 Pro',
    description: 'Google\'s top-tier model; strong code execution and native YouTube/image grounding.',
    url: 'https://gemini.google.com/',
    tags: ['General AI', 'Code Execution', 'Google', 'Multimodal'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Conversational AI',
      pricing: 'Free tier + Advanced subscription',
      key_features: 'YouTube integration, real-time information, Google Workspace integration',
      ai_relevance: 'Seamless integration with Google educational tools and services',
      future_potential: 'Deep integration with Google for Education ecosystem'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'xai-grok-3',
    category: 'ai_tool',
    title: 'xAI Grok 3',
    description: 'Real-time web-connected assistant built into X (formerly Twitter).',
    url: 'https://x.ai/',
    tags: ['General AI', 'Real-time', 'Web Connected', 'Social Media'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Conversational AI',
      pricing: 'X Premium subscription required',
      key_features: 'Real-time web access, social media integration, current events',
      ai_relevance: 'Up-to-date information for current events and trending topics in education',
      future_potential: 'Real-time educational content and trend analysis'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'llama-3-405b',
    category: 'ai_tool',
    title: 'Llama-3 (405B)',
    description: 'Meta\'s open-weights frontier LLM for local/private hosting.',
    url: 'https://ai.meta.com/llama/',
    tags: ['Open Source', 'Local Hosting', 'Meta', 'Privacy'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Open Source LLM',
      pricing: 'Free (requires hosting)',
      key_features: 'Open weights, local deployment, privacy-focused, customizable',
      ai_relevance: 'Perfect for schools requiring data privacy and local control',
      future_potential: 'Full institutional control and customization capabilities'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'deepseek-v3',
    category: 'ai_tool',
    title: 'DeepSeek-V3',
    description: 'Chinese open-source model tuned for math & code.',
    url: 'https://github.com/deepseek-ai/deepseek-llm',
    tags: ['Open Source', 'Math', 'Coding', 'Chinese'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Specialized LLM',
      pricing: 'Free (open source)',
      key_features: 'Mathematics excellence, coding optimization, research-focused',
      ai_relevance: 'Specialized for STEM education and mathematical problem solving',
      future_potential: 'Advanced mathematical reasoning for educational applications'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'qwen-max',
    category: 'ai_tool',
    title: 'Qwen-Max',
    description: 'Alibaba\'s bilingual research LLM with chat & code variants.',
    url: 'https://qwen.openkg.cn/',
    tags: ['Bilingual', 'Research', 'Alibaba', 'Chinese'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Research LLM',
      pricing: 'Various tiers available',
      key_features: 'Chinese-English bilingual, research capabilities, code generation',
      ai_relevance: 'Excellent for bilingual education and international schools',
      future_potential: 'Cross-cultural educational content and language learning'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'mistral-large',
    category: 'ai_tool',
    title: 'Mistral Large',
    description: 'European model with strong summarisation & function-calling.',
    url: 'https://mistral.ai/',
    tags: ['European', 'Summarization', 'Function Calling', 'Privacy'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'European LLM',
      pricing: 'API pricing available',
      key_features: 'GDPR compliance, function calling, advanced summarization',
      ai_relevance: 'European data sovereignty and educational compliance',
      future_potential: 'GDPR-compliant AI solutions for European educational institutions'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'bloom-176b',
    category: 'ai_tool',
    title: 'BLOOM-176B',
    description: 'First truly multilingual open LLM (46 languages).',
    url: 'https://huggingface.co/bigscience/bloom',
    tags: ['Multilingual', 'Open Source', 'Hugging Face', '46 Languages'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Multilingual LLM',
      pricing: 'Free (open source)',
      key_features: '46 language support, open research, collaborative development',
      ai_relevance: 'Revolutionary for multilingual and international education',
      future_potential: 'Breaking language barriers in global education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'falcon-180b',
    category: 'ai_tool',
    title: 'Falcon-180B',
    description: 'UAE-built model optimised for low-cost inference.',
    url: 'https://falconllm.tii.ae/',
    tags: ['UAE', 'Cost Effective', 'Open Source', 'Inference'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Optimized LLM',
      pricing: 'Free (open source)',
      key_features: 'Cost-effective inference, optimized performance, open weights',
      ai_relevance: 'Budget-friendly option for schools with limited resources',
      future_potential: 'Democratizing AI access for educational institutions globally'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'stablelm',
    category: 'ai_tool',
    title: 'StableLM',
    description: 'Text-focused sibling of Stable Diffusion for local use.',
    url: 'https://stability.ai/blog/stablelm',
    tags: ['Local Use', 'Stability AI', 'Open Source', 'Privacy'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Local LLM',
      pricing: 'Free (open source)',
      key_features: 'Local deployment, privacy-focused, lightweight, customizable',
      ai_relevance: 'Perfect for schools requiring complete data control and privacy',
      future_potential: 'Fully private AI solutions for sensitive educational environments'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'gemma-2',
    category: 'ai_tool',
    title: 'Gemma 2',
    description: 'Lightweight licence-free Google model for edge devices.',
    url: 'https://ai.google.dev/gemma',
    tags: ['Lightweight', 'Edge Devices', 'Google', 'Licence Free'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Edge AI Model',
      pricing: 'Free (licence-free)',
      key_features: 'Edge deployment, low resource requirements, licence-free',
      ai_relevance: 'Ideal for classrooms with limited computing resources',
      future_potential: 'AI capabilities on any device, anywhere'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'phi-3',
    category: 'ai_tool',
    title: 'Phi-3',
    description: 'Tiny-footprint model (4–14B) with near-GPT-3 performance.',
    url: 'https://www.microsoft.com/en-us/ai/phi',
    tags: ['Microsoft', 'Lightweight', 'Efficient', 'Small Model'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Efficient LLM',
      pricing: 'Various licensing options',
      key_features: 'Small footprint, high performance, efficient inference',
      ai_relevance: 'High-quality AI for resource-constrained educational environments',
      future_potential: 'Powerful AI capabilities without heavy infrastructure requirements'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'solar-10-7b',
    category: 'ai_tool',
    title: 'SOLAR 10.7B',
    description: 'Upstage\'s dense-retriever LLM—SOTA on many open benchmarks.',
    url: 'https://upstage.ai/solar',
    tags: ['Upstage', 'Dense Retriever', 'Benchmarks', 'Open Source'],
    cover_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Retrieval-Augmented LLM',
      pricing: 'Open source with commercial options',
      key_features: 'Dense retrieval, benchmark performance, research-grade',
      ai_relevance: 'Excellent for research-based educational projects and fact-checking',
      future_potential: 'Advanced information retrieval for educational research'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },

  // Coding copilots & dev agents
  {
    id: 'github-copilot',
    category: 'ai_tool',
    title: 'GitHub Copilot',
    description: 'Inline code completion & chat across IDEs.',
    url: 'https://github.com/features/copilot',
    tags: ['Coding', 'GitHub', 'IDE Integration', 'Code Completion'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Code Assistant',
      pricing: 'Free for students, paid for professionals',
      key_features: 'Code completion, chat interface, multi-language support',
      ai_relevance: 'Essential tool for teaching programming and computer science',
      future_potential: 'Transforming how coding is taught and learned'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'windsurf',
    category: 'ai_tool',
    title: 'Windsurf (formerly Codeium)',
    description: 'Full AI-native IDE with multi-file refactors and agents.',
    url: 'https://windsurf.com/',
    tags: ['IDE', 'AI Native', 'Multi-file', 'Refactoring'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI-Native IDE',
      pricing: 'Free tier with pro options',
      key_features: 'Multi-file refactoring, AI agents, integrated development',
      ai_relevance: 'Next-generation IDE for teaching modern software development',
      future_potential: 'Redefining the development environment for education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'cursor',
    category: 'ai_tool',
    title: 'Cursor',
    description: 'VS Code-based editor with whole-repo chat & PR review.',
    url: 'https://www.cursor.so/',
    tags: ['VS Code', 'Repository Chat', 'PR Review', 'Code Editor'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Code Editor',
      pricing: 'Free tier with pro subscription',
      key_features: 'Repository-wide understanding, PR reviews, VS Code compatibility',
      ai_relevance: 'Advanced code editor for teaching software engineering practices',
      future_potential: 'Comprehensive code understanding and collaborative development'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'replit-ai',
    category: 'ai_tool',
    title: 'Replit AI',
    description: 'Cloud IDE & Ghostwriter assistant for instant deployments.',
    url: 'https://replit.com/site/ai',
    tags: ['Cloud IDE', 'Instant Deployment', 'Ghostwriter', 'Educational'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Cloud Development Platform',
      pricing: 'Free tier for education',
      key_features: 'Instant deployment, collaborative coding, educational features',
      ai_relevance: 'Perfect for classroom coding with zero setup requirements',
      future_potential: 'Democratizing programming education with cloud-based AI assistance'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'bolt-new',
    category: 'ai_tool',
    title: 'Bolt.new',
    description: 'Chat-to-site / app generator that ships to Netlify in minutes.',
    url: 'https://bolt.new/',
    tags: ['No Code', 'Site Generator', 'Netlify', 'Rapid Deployment'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'No-Code Platform',
      pricing: 'Usage-based pricing',
      key_features: 'Natural language to website, instant deployment, no coding required',
      ai_relevance: 'Enables non-technical educators to create educational websites instantly',
      future_potential: 'Bridging the gap between educational ideas and digital implementation'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'create-xyz',
    category: 'ai_tool',
    title: 'Create.xyz',
    description: 'No-code agent that turns natural-language specs into full-stack apps.',
    url: 'https://www.create.xyz/',
    tags: ['No Code', 'Full Stack', 'Natural Language', 'App Builder'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'No-Code App Builder',
      pricing: 'Various tiers available',
      key_features: 'Natural language specifications, full-stack generation, AI agent',
      ai_relevance: 'Empowers educators to create custom educational applications',
      future_potential: 'Transforming educational ideas into functional software without coding'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'tempo-labs',
    category: 'ai_tool',
    title: 'Tempo Labs',
    description: 'Visual React editor that co-authors UI with AI.',
    url: 'https://www.tempo.new/',
    tags: ['React', 'Visual Editor', 'UI Design', 'Co-authoring'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Visual Development Tool',
      pricing: 'Beta access available',
      key_features: 'Visual React editing, AI co-authoring, real-time collaboration',
      ai_relevance: 'Teaching modern web development with AI-assisted design',
      future_potential: 'Collaborative AI for visual programming education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'v0-vercel',
    category: 'ai_tool',
    title: 'v0 by Vercel',
    description: 'Generates production-ready Next.js components from prompts.',
    url: 'https://v0.dev/',
    tags: ['Next.js', 'Components', 'Vercel', 'Production Ready'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Component Generator',
      pricing: 'Usage-based pricing',
      key_features: 'Next.js components, production-ready code, design system integration',
      ai_relevance: 'Teaching modern web development with AI-generated components',
      future_potential: 'Accelerating web development education and prototyping'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'codeium',
    category: 'ai_tool',
    title: 'Codeium',
    description: 'Free autocomplete for 70+ languages; self-host option.',
    url: 'https://www.codeium.com/',
    tags: ['Autocomplete', '70+ Languages', 'Self Host', 'Free'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Code Completion Tool',
      pricing: 'Free with enterprise options',
      key_features: '70+ programming languages, self-hosting, privacy-focused',
      ai_relevance: 'Comprehensive coding assistance for all programming languages taught',
      future_potential: 'Universal coding education support with privacy options'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'junie-ai',
    category: 'ai_tool',
    title: 'Junie AI',
    description: 'JetBrains agent that can navigate, run, and refactor entire projects.',
    url: 'https://www.jetbrains.com/junie/',
    tags: ['JetBrains', 'Project Navigation', 'Refactoring', 'IDE Agent'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'IDE AI Agent',
      pricing: 'JetBrains licensing',
      key_features: 'Project-wide understanding, automated refactoring, intelligent navigation',
      ai_relevance: 'Advanced IDE capabilities for teaching software architecture',
      future_potential: 'Comprehensive project understanding and automated code improvements'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'jules-google',
    category: 'ai_tool',
    title: 'Jules',
    description: 'Google Labs beta that asynchronously fixes bugs & writes tests.',
    url: 'https://jules.google/',
    tags: ['Google Labs', 'Bug Fixing', 'Test Writing', 'Asynchronous'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Automated Development Tool',
      pricing: 'Beta access (Google Labs)',
      key_features: 'Automated bug fixing, test generation, asynchronous operation',
      ai_relevance: 'Teaching software quality assurance and testing methodologies',
      future_potential: 'Automated software maintenance and quality improvement'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'lovable',
    category: 'ai_tool',
    title: 'Lovable',
    description: 'Community-driven AI builder for internal tools.',
    url: 'https://lovable.dev/',
    tags: ['Community Driven', 'Internal Tools', 'AI Builder', 'Collaborative'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Community AI Platform',
      pricing: 'Community-based pricing',
      key_features: 'Community-driven development, internal tool creation, collaborative AI',
      ai_relevance: 'Building educational tools through community collaboration',
      future_potential: 'Democratizing educational tool development through community AI'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'base44',
    category: 'ai_tool',
    title: 'BASE44',
    description: '"AI as your SaaS factory" – databases, auth, email baked in.',
    url: 'https://base44.com/',
    tags: ['SaaS Factory', 'Database', 'Authentication', 'All-in-One'],
    cover_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Complete SaaS Platform',
      pricing: 'Subscription-based',
      key_features: 'Integrated databases, authentication, email services, AI-powered',
      ai_relevance: 'Complete platform for building educational SaaS applications',
      future_potential: 'Full-stack educational platform development with AI assistance'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },

  // Creative media generation
  {
    id: 'dalle-3',
    category: 'ai_tool',
    title: 'DALL·E 3',
    description: 'Text-to-image (now integrated in ChatGPT).',
    url: 'https://labs.openai.com/',
    tags: ['Image Generation', 'Text-to-Image', 'OpenAI', 'Creative'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Image Generation AI',
      pricing: 'Integrated with ChatGPT Plus',
      key_features: 'High-quality image generation, text integration, educational illustrations',
      ai_relevance: 'Creating custom educational visuals, illustrations, and learning materials',
      future_potential: 'Revolutionizing visual content creation for education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'midjourney',
    category: 'ai_tool',
    title: 'Midjourney',
    description: 'Discord-based art generator famed for photographic realism.',
    url: 'https://www.midjourney.com/',
    tags: ['Art Generation', 'Photorealistic', 'Discord', 'Creative'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Art Generation Platform',
      pricing: 'Subscription-based',
      key_features: 'Photorealistic images, artistic styles, community-driven',
      ai_relevance: 'Creating stunning visual content for presentations and educational materials',
      future_potential: 'Professional-quality educational artwork and visual storytelling'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'stable-diffusion-xl',
    category: 'ai_tool',
    title: 'Stable Diffusion XL',
    description: 'Open-weights diffusion model for local or API image creation.',
    url: 'https://stability.ai/',
    tags: ['Open Source', 'Local Generation', 'API', 'Stable Diffusion'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Open Source Image AI',
      pricing: 'Free (open source) + API options',
      key_features: 'Local deployment, open weights, customizable, privacy-focused',
      ai_relevance: 'Complete control over image generation for educational institutions',
      future_potential: 'Private, customizable image generation for sensitive educational content'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'leonardo-ai',
    category: 'ai_tool',
    title: 'Leonardo AI',
    description: 'Fine-tune-ready SD pipeline with 4k graphics & asset variants.',
    url: 'https://leonardo.ai/',
    tags: ['Fine Tuning', '4K Graphics', 'Asset Variants', 'Professional'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Professional Image Platform',
      pricing: 'Freemium with pro tiers',
      key_features: 'Fine-tuning capabilities, 4K resolution, asset management',
      ai_relevance: 'Professional-grade educational content creation and asset development',
      future_potential: 'Custom educational visual styles and branded content creation'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'ideogram',
    category: 'ai_tool',
    title: 'Ideogram',
    description: 'Excels at text-within-image posters and typography.',
    url: 'https://ideogram.ai/',
    tags: ['Typography', 'Text in Images', 'Posters', 'Educational Graphics'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Typography-Focused AI',
      pricing: 'Freemium model',
      key_features: 'Text integration, poster creation, typography excellence',
      ai_relevance: 'Perfect for creating educational posters, infographics, and text-based visuals',
      future_potential: 'Advanced educational poster and infographic creation'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'adobe-firefly',
    category: 'ai_tool',
    title: 'Adobe Firefly',
    description: 'Commercially safe images + vector recolour in Adobe CC apps.',
    url: 'https://firefly.adobe.com/',
    tags: ['Adobe', 'Commercial Safe', 'Vector Graphics', 'Creative Cloud'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Enterprise Creative AI',
      pricing: 'Adobe Creative Cloud subscription',
      key_features: 'Commercial licensing, Creative Cloud integration, vector capabilities',
      ai_relevance: 'Safe commercial use for educational institutions and professional content',
      future_potential: 'Professional educational content creation with legal safety'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'canva-magic',
    category: 'ai_tool',
    title: 'Canva Magic',
    description: 'One-click presentations, image & social assets inside Canva.',
    url: 'https://www.canva.com/magic/',
    tags: ['Presentations', 'Social Media', 'Templates', 'Easy to Use'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Design Automation Platform',
      pricing: 'Freemium with Canva Pro',
      key_features: 'One-click design, presentation creation, social media assets',
      ai_relevance: 'Instant professional presentations and educational materials',
      future_potential: 'Democratizing professional design for all educators'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'unity-muse',
    category: 'ai_tool',
    title: 'Unity Muse',
    description: 'Generates textures, behaviours & scaffolded C# for game dev.',
    url: 'https://unity.com/products/unity-muse',
    tags: ['Game Development', 'Unity', 'Textures', 'C# Programming'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Game Development AI',
      pricing: 'Unity subscription tiers',
      key_features: 'Texture generation, behavior scripting, C# code scaffolding',
      ai_relevance: 'Teaching game development and interactive educational experiences',
      future_potential: 'AI-assisted educational game creation and interactive learning'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'runway-ml',
    category: 'ai_tool',
    title: 'Runway ML',
    description: 'Gen-2 text-to-video & green-screen removal for editors.',
    url: 'https://runwayml.com/',
    tags: ['Video Generation', 'Text-to-Video', 'Green Screen', 'Video Editing'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Video Generation Platform',
      pricing: 'Credits-based system',
      key_features: 'Text-to-video generation, video editing tools, green screen removal',
      ai_relevance: 'Creating educational videos and interactive visual content',
      future_potential: 'Revolutionary video content creation for online education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'synthesia',
    category: 'ai_tool',
    title: 'Synthesia',
    description: 'Studio-quality talking-head videos in 120+ languages.',
    url: 'https://www.synthesia.io/',
    tags: ['Talking Head Videos', 'Multilingual', 'Studio Quality', 'AI Presenter'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Video Platform',
      pricing: 'Subscription-based',
      key_features: '120+ languages, realistic avatars, studio-quality production',
      ai_relevance: 'Creating multilingual educational content with AI presenters',
      future_potential: 'Scalable multilingual education delivery with AI instructors'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'elevenlabs',
    category: 'ai_tool',
    title: 'ElevenLabs',
    description: 'Near-human multilingual TTS and voice-cloning.',
    url: 'https://elevenlabs.io/',
    tags: ['Text-to-Speech', 'Voice Cloning', 'Multilingual', 'Audio'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Voice AI Platform',
      pricing: 'Usage-based pricing',
      key_features: 'Realistic TTS, voice cloning, multilingual support',
      ai_relevance: 'Creating audio content, audiobooks, and accessible educational materials',
      future_potential: 'Personalized audio education and accessibility solutions'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'google-veo-3',
    category: 'ai_tool',
    title: 'Google Veo 3',
    description: 'Next-gen text-to-video; 1080p, 1-min clips with audio.',
    url: 'https://deepmind.google/technologies/video-generation/veo',
    tags: ['Google', 'Text-to-Video', '1080p', 'Audio Generation'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Advanced Video AI',
      pricing: 'Google Cloud pricing',
      key_features: 'High-definition video, audio generation, extended duration',
      ai_relevance: 'Creating high-quality educational videos with synchronized audio',
      future_potential: 'Professional educational video production with AI'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'hailuo-ai',
    category: 'ai_tool',
    title: 'Hailuo AI',
    description: '6-second looping micro-videos perfect for "lesson hooks."',
    url: 'https://hailuoai.video/',
    tags: ['Micro Videos', 'Lesson Hooks', 'Looping', 'Short Content'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Micro-Video Platform',
      pricing: 'Usage-based',
      key_features: 'Short video generation, looping content, lesson engagement',
      ai_relevance: 'Creating engaging video hooks and attention-grabbing educational content',
      future_potential: 'Micro-learning content and attention-capture tools for education'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },

  // Scholarly research & data wrangling
  {
    id: 'perplexity-ai',
    category: 'ai_tool',
    title: 'Perplexity AI',
    description: 'Conversational search that cites every source.',
    url: 'https://www.perplexity.ai/',
    tags: ['Research', 'Conversational Search', 'Citations', 'Academic'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Research AI Platform',
      pricing: 'Freemium with Pro subscription',
      key_features: 'Source citations, real-time search, academic research support',
      ai_relevance: 'Essential tool for academic research and fact-checking in education',
      future_potential: 'Transforming how research is conducted and verified in educational settings'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'consensus',
    category: 'ai_tool',
    title: 'Consensus',
    description: 'Extracts evidence sentences from 200M+ academic papers.',
    url: 'https://consensus.app/',
    tags: ['Academic Papers', 'Evidence Extraction', 'Research', 'Scientific'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Academic Research Tool',
      pricing: 'Freemium model',
      key_features: 'Evidence extraction, 200M+ papers, scientific consensus',
      ai_relevance: 'Critical for evidence-based teaching and academic research',
      future_potential: 'Revolutionizing literature reviews and evidence synthesis'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'elicit',
    category: 'ai_tool',
    title: 'Elicit',
    description: 'Systematic-review assistant that builds literature matrices.',
    url: 'https://elicit.org/',
    tags: ['Systematic Review', 'Literature Matrix', 'Research Assistant', 'Academic'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Research Assistant AI',
      pricing: 'Free for researchers',
      key_features: 'Literature matrices, systematic reviews, research workflow automation',
      ai_relevance: 'Streamlining academic research processes for educators and students',
      future_potential: 'Automated research methodology and literature analysis'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'scispace',
    category: 'ai_tool',
    title: 'SciSpace',
    description: 'Plain-language explainer and PDF AI reader.',
    url: 'https://typeset.io/scispace',
    tags: ['Plain Language', 'PDF Reader', 'Research Explainer', 'Academic'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Academic Reading Assistant',
      pricing: 'Freemium with premium features',
      key_features: 'Plain-language explanations, PDF analysis, research comprehension',
      ai_relevance: 'Making complex research accessible to students and educators',
      future_potential: 'Democratizing access to academic knowledge through AI explanation'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'notebooklm',
    category: 'ai_tool',
    title: 'NotebookLM',
    description: 'AI research notebook with source-anchored answers.',
    url: 'https://notebooklm.google/',
    tags: ['Research Notebook', 'Source Anchored', 'Google', 'Academic'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Research Notebook',
      pricing: 'Free (Google Labs)',
      key_features: 'Source attribution, research organization, AI-powered insights',
      ai_relevance: 'Organizing and synthesizing research for educational projects',
      future_potential: 'Next-generation research methodology and knowledge management'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'wolfram-alpha',
    category: 'ai_tool',
    title: 'Wolfram Alpha',
    description: 'Symbolic computing & curated data for maths, science, finance.',
    url: 'https://www.wolframalpha.com/',
    tags: ['Mathematics', 'Science', 'Symbolic Computing', 'Educational'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Computational Knowledge Engine',
      pricing: 'Free with Pro subscription',
      key_features: 'Mathematical computation, scientific data, step-by-step solutions',
      ai_relevance: 'Essential for STEM education and mathematical problem-solving',
      future_potential: 'Advanced computational education and mathematical literacy'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'ibm-watson-x',
    category: 'ai_tool',
    title: 'IBM Watson x',
    description: 'Enterprise NLP, speech & AutoAI pipelines.',
    url: 'https://www.ibm.com/watson',
    tags: ['Enterprise', 'NLP', 'Speech Processing', 'IBM'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Enterprise AI Platform',
      pricing: 'Enterprise licensing',
      key_features: 'Natural language processing, speech recognition, automated AI pipelines',
      ai_relevance: 'Enterprise-grade AI solutions for large educational institutions',
      future_potential: 'Scalable AI infrastructure for educational organizations'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'oracle-ai',
    category: 'ai_tool',
    title: 'Oracle AI',
    description: 'OCI Language & Vision APIs with data-sovereignty options.',
    url: 'https://www.oracle.com/artificial-intelligence/',
    tags: ['Oracle', 'Data Sovereignty', 'Language Processing', 'Vision AI'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Enterprise Cloud AI',
      pricing: 'Cloud-based pricing',
      key_features: 'Data sovereignty, language APIs, vision processing, enterprise security',
      ai_relevance: 'Secure AI solutions for institutions with strict data requirements',
      future_potential: 'Sovereign AI capabilities for sensitive educational environments'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'claude-scholar',
    category: 'ai_tool',
    title: 'Claude Scholar',
    description: 'Anthropic vertical tuned for academic papers.',
    url: 'https://claude.ai/',
    tags: ['Academic Papers', 'Anthropic', 'Scholarly Research', 'Specialized'],
    cover_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Academic AI Assistant',
      pricing: 'Professional subscription',
      key_features: 'Academic paper analysis, scholarly writing, research assistance',
      ai_relevance: 'Specialized AI for academic research and scholarly communication',
      future_potential: 'Advanced academic AI tailored for educational research needs'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },

  // Education-first platforms
  {
    id: 'magicschool-ai',
    category: 'ai_tool',
    title: 'MagicSchool AI',
    description: 'Built by teachers for teachers, bundles 60+ prompt workflows and student-safe data policies.',
    url: 'https://www.magicschool.ai/',
    tags: ['Education First', 'Teacher Built', 'Student Safe', 'Workflow Tools'],
    cover_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Education-Focused AI Platform',
      pricing: 'Free for educators',
      key_features: '60+ educational workflows, student data protection, teacher-designed',
      ai_relevance: 'Purpose-built for education with comprehensive teaching tools',
      future_potential: 'Setting the standard for education-first AI platforms'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'google-gemini-education',
    category: 'ai_tool',
    title: 'Google Gemini for Education',
    description: '1000 uses/mo, Meet NoteTaker, privacy-guarded.',
    url: 'https://workspace.google.com/gemini',
    tags: ['Google Education', 'Privacy Guarded', 'Meeting Notes', 'Workspace'],
    cover_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Educational AI Suite',
      pricing: 'Free tier for education',
      key_features: 'Google Workspace integration, privacy protection, meeting transcription',
      ai_relevance: 'Seamlessly integrated AI for Google for Education users',
      future_potential: 'Comprehensive AI ecosystem for educational institutions'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'google-ai-studio',
    category: 'ai_tool',
    title: 'Google AI Studio',
    description: 'Param-tuning playground demonstrated in the book for lesson planning.',
    url: 'https://aistudio.google.com/',
    tags: ['Parameter Tuning', 'Lesson Planning', 'Google', 'AI Playground'],
    cover_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Development Platform',
      pricing: 'Free with usage limits',
      key_features: 'Model customization, parameter tuning, educational experimentation',
      ai_relevance: 'Teaching AI concepts and customizing models for educational use',
      future_potential: 'Empowering educators to create custom AI solutions'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'moodle-ai',
    category: 'ai_tool',
    title: 'Moodle with Moodle AI',
    description: 'Open-source LMS now shipping gen-AI assisted grading and Q-bank auto-creation.',
    url: 'https://moodle.org/',
    tags: ['LMS', 'Open Source', 'Auto Grading', 'Question Banks'],
    cover_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI-Enhanced LMS',
      pricing: 'Open source with hosting options',
      key_features: 'Automated grading, question generation, learning analytics',
      ai_relevance: 'Comprehensive LMS with built-in AI capabilities for course management',
      future_potential: 'The future of intelligent learning management systems'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },
  {
    id: 'qgis-geoai',
    category: 'ai_tool',
    title: 'QGIS + GeoAI',
    description: 'Adds spatial ML plugins for environmental or geography projects.',
    url: 'https://www.qgis.org/',
    tags: ['GIS', 'Spatial Analysis', 'Geography', 'Environmental'],
    cover_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Geographic AI Platform',
      pricing: 'Free and open source',
      key_features: 'Spatial analysis, machine learning plugins, geographic data processing',
      ai_relevance: 'Advanced geographic and environmental education with AI-powered analysis',
      future_potential: 'Combining AI with geographic education for environmental understanding'
    },
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-06-25T10:00:00Z'
  },

  // Visual AI Tools - Text to Diagrams, Infographics & Presentations
  {
    id: 'napkin-ai',
    category: 'ai_tool',
    title: 'Napkin AI',
    description: 'Transforms text into simple visuals like diagrams and infographics for storytelling and social media.',
    url: 'https://www.napkin.ai',
    tags: ['Visual AI', 'Diagrams', 'Infographics', 'Storytelling'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Visual Content Generator',
      pricing: 'Freemium model',
      key_features: 'Text-to-visual conversion, diagrams, infographics, social media content',
      ai_relevance: 'Quick visual storytelling for educational content and presentations',
      future_potential: 'Democratizing visual communication for all educators'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'piktochart',
    category: 'ai_tool',
    title: 'Piktochart',
    description: 'Generates infographics, reports and presentations from text prompts with customizable templates.',
    url: 'https://piktochart.com',
    tags: ['Infographics', 'Reports', 'Presentations', 'Templates'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Infographic Platform',
      pricing: 'Freemium with pro features',
      key_features: 'AI-generated infographics, customizable templates, data visualization',
      ai_relevance: 'Professional infographics and reports for educational presentations',
      future_potential: 'Automated visual report generation for educators'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'lucidchart',
    category: 'ai_tool',
    title: 'Lucidchart',
    description: 'Creates professional diagrams, flowcharts and mind maps with AI for collaborative teams.',
    url: 'https://www.lucidchart.com',
    tags: ['Diagrams', 'Flowcharts', 'Mind Maps', 'Collaboration'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Diagramming Platform',
      pricing: 'Free for education with premium tiers',
      key_features: 'Professional diagrams, real-time collaboration, AI assistance',
      ai_relevance: 'Collaborative visual planning and process documentation for education',
      future_potential: 'Industry-standard diagramming with AI enhancement'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'miro',
    category: 'ai_tool',
    title: 'Miro',
    description: 'Online whiteboard with AI to generate flows, mind maps and infographics in real-time.',
    url: 'https://miro.com',
    tags: ['Whiteboard', 'Mind Maps', 'Real-time', 'Collaboration'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Collaborative Whiteboard',
      pricing: 'Free for education',
      key_features: 'Infinite canvas, real-time collaboration, AI-powered templates',
      ai_relevance: 'Interactive brainstorming and visual collaboration for classrooms',
      future_potential: 'The future of collaborative visual thinking in education'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'prezi',
    category: 'ai_tool',
    title: 'Prezi',
    description: 'Dynamic presentations with zoom and AI-generated infographics from text or data.',
    url: 'https://prezi.com',
    tags: ['Presentations', 'Dynamic', 'Zoom', 'Infographics'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Presentation Platform',
      pricing: 'Free for education',
      key_features: 'Non-linear presentations, zoom interface, AI content generation',
      ai_relevance: 'Engaging, non-traditional presentations that capture student attention',
      future_potential: 'Revolutionizing presentation design with spatial storytelling'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'notegpt-visual',
    category: 'ai_tool',
    title: 'NoteGPT Visual Generator',
    description: 'Converts documents or prompts into infographics, mind maps and flashcards.',
    url: 'https://notegpt.io/ai-visual-generator',
    tags: ['Documents', 'Mind Maps', 'Flashcards', 'Study Tools'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Study Visual Generator',
      pricing: 'Freemium model',
      key_features: 'Document conversion, mind maps, flashcards, study aids',
      ai_relevance: 'Transforming study materials into visual learning aids',
      future_potential: 'Automated study material generation for enhanced learning'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'whimsical',
    category: 'ai_tool',
    title: 'Whimsical',
    description: 'Collaboration on flowcharts, wireframes and mind maps with AI suggestions.',
    url: 'https://whimsical.com',
    tags: ['Flowcharts', 'Wireframes', 'Mind Maps', 'AI Suggestions'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Visual Collaboration Tool',
      pricing: 'Free tier with pro options',
      key_features: 'Fast diagramming, AI suggestions, clean interface',
      ai_relevance: 'Quick visual planning and ideation for educational projects',
      future_potential: 'Streamlined visual thinking with intelligent assistance'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'excalidraw',
    category: 'ai_tool',
    title: 'Excalidraw',
    description: 'Hand-drawn style diagrams with AI support for quick collaborative editing.',
    url: 'https://excalidraw.com',
    tags: ['Hand-drawn', 'Sketches', 'Collaborative', 'Open Source'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Sketch-style Diagramming',
      pricing: 'Free and open source',
      key_features: 'Hand-drawn aesthetic, real-time collaboration, privacy-focused',
      ai_relevance: 'Informal, approachable visual communication for education',
      future_potential: 'Combining casual aesthetics with professional functionality'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'heptabase',
    category: 'ai_tool',
    title: 'Heptabase',
    description: 'Visual knowledge management with AI-powered concept maps and note linking.',
    url: 'https://heptabase.com',
    tags: ['Knowledge Management', 'Concept Maps', 'Note Linking', 'Visual Thinking'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Visual Knowledge Platform',
      pricing: 'Subscription-based',
      key_features: 'Visual note-taking, concept mapping, knowledge graphs',
      ai_relevance: 'Organizing complex educational concepts visually',
      future_potential: 'Next-generation knowledge management for deep learning'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'visualgpt',
    category: 'ai_tool',
    title: 'VisualGPT',
    description: 'Generates complete diagrams, infographics and storyboards from simple text.',
    url: 'https://visualgpt.io',
    tags: ['Diagrams', 'Infographics', 'Storyboards', 'Text-to-Visual'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Visual Generator',
      pricing: 'Usage-based pricing',
      key_features: 'Complete visual generation, multiple formats, AI-powered',
      ai_relevance: 'Comprehensive visual content creation from text descriptions',
      future_potential: 'End-to-end visual storytelling automation'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'edrawmax',
    category: 'ai_tool',
    title: 'EdrawMax',
    description: 'Over 200 diagram types (Gantt, ER, flows) generated by AI with advanced editing.',
    url: 'https://www.edrawmax.wondershare.com',
    tags: ['200+ Diagrams', 'Gantt', 'ER Diagrams', 'Professional'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Professional Diagramming Suite',
      pricing: 'Subscription with free trial',
      key_features: '200+ diagram types, AI generation, professional templates',
      ai_relevance: 'Comprehensive diagramming solution for all educational needs',
      future_potential: 'Universal visual communication tool for education'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'visily',
    category: 'ai_tool',
    title: 'Visily',
    description: 'Transforms text, sketches or screenshots into editable wireframes and diagrams.',
    url: 'https://www.visily.ai',
    tags: ['Wireframes', 'Sketches', 'Screenshots', 'UI Design'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Wireframe Tool',
      pricing: 'Freemium model',
      key_features: 'Multi-input conversion, wireframe generation, UI design',
      ai_relevance: 'Rapid prototyping and UI design for educational apps',
      future_potential: 'Bridging concept and design with AI transformation'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'diagramgpt',
    category: 'ai_tool',
    title: 'DiagramGPT',
    description: 'Uses GPT-4 to create flowcharts, ER diagrams and sequences from prompts or code.',
    url: 'https://www.eraser.io/diagramgpt',
    tags: ['GPT-4', 'Flowcharts', 'ER Diagrams', 'Code-to-Diagram'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Diagram Generator',
      pricing: 'Freemium with credits',
      key_features: 'GPT-4 powered, code understanding, technical diagrams',
      ai_relevance: 'Technical diagram generation for computer science education',
      future_potential: 'Automated technical documentation and visualization'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'mymap-ai',
    category: 'ai_tool',
    title: 'MyMap.AI',
    description: 'Creates mind maps, SWOT analysis and storyboards via AI chat with PDF and link support.',
    url: 'https://www.mymap.ai',
    tags: ['Mind Maps', 'SWOT', 'Storyboards', 'Chat Interface'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'AI Mapping Platform',
      pricing: 'Freemium model',
      key_features: 'Chat-based creation, PDF support, multiple formats',
      ai_relevance: 'Conversational visual creation for strategic planning',
      future_potential: 'Natural language visual thinking and analysis'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'venngage',
    category: 'ai_tool',
    title: 'Venngage',
    description: 'Professional infographic generator with AI-powered automatic layout adaptation.',
    url: 'https://venngage.com',
    tags: ['Infographics', 'Professional', 'Auto Layout', 'Templates'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Infographic Platform',
      pricing: 'Freemium with business tiers',
      key_features: 'Professional templates, AI layout, brand customization',
      ai_relevance: 'High-quality infographics for educational marketing and communication',
      future_potential: 'Automated professional visual communication'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'visme',
    category: 'ai_tool',
    title: 'Visme',
    description: 'Interactive infographics with animations and data import for visualizations.',
    url: 'https://visme.co',
    tags: ['Interactive', 'Animations', 'Data Visualization', 'Infographics'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Interactive Visual Platform',
      pricing: 'Freemium with pro features',
      key_features: 'Interactive content, animations, data integration',
      ai_relevance: 'Engaging interactive educational content and data stories',
      future_potential: 'Dynamic, data-driven educational visualizations'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'infogram',
    category: 'ai_tool',
    title: 'Infogram',
    description: 'Data-focused tool generating interactive charts and maps from spreadsheets or text.',
    url: 'https://infogram.com',
    tags: ['Data Visualization', 'Charts', 'Maps', 'Interactive'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Data Visualization Platform',
      pricing: 'Freemium with team plans',
      key_features: 'Data import, interactive charts, map visualization',
      ai_relevance: 'Data storytelling and statistical visualization for education',
      future_potential: 'Making data accessible and understandable through visualization'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'text2infographic',
    category: 'ai_tool',
    title: 'Text2Infographic',
    description: 'Converts text, URLs or files into multilingual editable infographics.',
    url: 'https://text2infographic.com',
    tags: ['Text Conversion', 'Multilingual', 'URL Import', 'Editable'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Text-to-Infographic Converter',
      pricing: 'Usage-based',
      key_features: 'Multiple input formats, multilingual support, editable output',
      ai_relevance: 'Quick infographic creation from any text source',
      future_potential: 'Universal text-to-visual conversion for global education'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'infografix',
    category: 'ai_tool',
    title: 'Infografix',
    description: 'Free quick infographics like timelines and processes with customizable fonts and colors.',
    url: 'https://infografix.app',
    tags: ['Free', 'Timelines', 'Processes', 'Quick Creation'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Quick Infographic Tool',
      pricing: 'Free',
      key_features: 'Fast creation, timeline focus, process visualization',
      ai_relevance: 'Quick visual timelines and process diagrams for lessons',
      future_potential: 'Accessible visual communication for all educators'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'gamma-app',
    category: 'ai_tool',
    title: 'Gamma',
    description: 'Scrollable presentations with AI-generated visuals, charts and interactivity.',
    url: 'https://gamma.app',
    tags: ['Presentations', 'Scrollable', 'Interactive', 'AI Visuals'],
    cover_url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
    provider_meta: {
      type: 'Modern Presentation Platform',
      pricing: 'Freemium model',
      key_features: 'Scrollable format, AI content generation, interactive elements',
      ai_relevance: 'Next-generation presentations that work like websites',
      future_potential: 'Redefining presentation format for digital-native learners'
    },
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z'
  }
];

// Categories for organization
export const aiToolCategories = [
  {
    id: 'general-ai',
    name: 'General Large-Context Chat & Reasoning',
    description: 'Flagship AI assistants for conversations, analysis, and complex reasoning tasks.',
    icon: '🤖',
    tools: aiToolsData.filter(tool => 
      ['chatgpt-gpt4o', 'claude-3-5-sonnet', 'google-gemini-2-5-pro', 'xai-grok-3', 
       'llama-3-405b', 'deepseek-v3', 'qwen-max', 'mistral-large', 'bloom-176b', 
       'falcon-180b', 'stablelm', 'gemma-2', 'phi-3', 'solar-10-7b'].includes(tool.id)
    )
  },
  {
    id: 'coding-tools',
    name: 'Coding Copilots & Dev Agents',
    description: 'AI-powered development tools for programming, debugging, and software creation.',
    icon: '💻',
    tools: aiToolsData.filter(tool => 
      ['github-copilot', 'windsurf', 'cursor', 'replit-ai', 'bolt-new', 'create-xyz', 
       'tempo-labs', 'v0-vercel', 'codeium', 'junie-ai', 'jules-google', 'lovable', 'base44'].includes(tool.id)
    )
  },
  {
    id: 'creative-media',
    name: 'Creative Media Generation',
    description: 'AI tools for creating images, videos, audio, and multimedia educational content.',
    icon: '🎨',
    tools: aiToolsData.filter(tool => 
      ['dalle-3', 'midjourney', 'stable-diffusion-xl', 'leonardo-ai', 'ideogram', 'adobe-firefly', 
       'canva-magic', 'unity-muse', 'runway-ml', 'synthesia', 'elevenlabs', 'google-veo-3', 'hailuo-ai'].includes(tool.id)
    )
  },
  {
    id: 'research-tools',
    name: 'Scholarly Research & Data Wrangling',
    description: 'AI-powered research tools for academic work, literature reviews, and data analysis.',
    icon: '📊',
    tools: aiToolsData.filter(tool => 
      ['perplexity-ai', 'consensus', 'elicit', 'scispace', 'notebooklm', 'wolfram-alpha', 
       'ibm-watson-x', 'oracle-ai', 'claude-scholar'].includes(tool.id)
    )
  },
  {
    id: 'education-first',
    name: 'Education-First Platforms',
    description: 'AI platforms specifically designed for educational institutions and teachers.',
    icon: '🎓',
    tools: aiToolsData.filter(tool => 
      ['magicschool-ai', 'google-gemini-education', 'google-ai-studio', 'moodle-ai', 'qgis-geoai'].includes(tool.id)
    )
  },
  {
    id: 'visual-ai',
    name: 'Visual AI Tools - Diagrams & Infographics',
    description: 'Transform text into stunning visuals: diagrams, infographics, mind maps, flowcharts and presentations.',
    icon: '📊',
    tools: aiToolsData.filter(tool => 
      ['napkin-ai', 'piktochart', 'lucidchart', 'miro', 'prezi', 'notegpt-visual', 
       'whimsical', 'excalidraw', 'heptabase', 'visualgpt', 'edrawmax', 'visily',
       'diagramgpt', 'mymap-ai', 'venngage', 'visme', 'infogram', 'text2infographic',
       'infografix', 'gamma-app'].includes(tool.id)
    )
  }
];