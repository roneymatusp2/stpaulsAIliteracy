// File: src/pages/LearnPage.tsx

// --- DATA DEFINITIONS ---

// TypeScript Interfaces
interface Course {
  id: string;
  title: string;
  provider: string;
  platform: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tags: string[];
  url: string;
  featured: boolean;
  description: string;
}

interface AiTool {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: 'planning' | 'research' | 'assessment' | 'stem' | 'development';
}

// Course Data Array
export const coursesData: Course[] = [
  // --- Featured & Premium Programmes ---
  {
    id: 'oxford-ai-programme',
    title: 'Oxford Artificial Intelligence Programme',
    provider: 'University of Oxford',
    platform: 'Saïd Business School',
    duration: '6 Weeks',
    level: 'Advanced',
    tags: ['Business', 'Strategy', 'Leadership', 'Ethics'],
    url: 'https://www.sbs.ox.ac.uk/programmes/executive-education/online-learning/oxford-artificial-intelligence-programme',
    featured: true,
    description: 'A programme for business leaders focusing on AI strategy, implementation, and ethical considerations, delivered by Oxford\'s Saïd Business School.'
  },
  {
    id: 'stanford-ai-prof-prog',
    title: 'Artificial Intelligence Professional Programme',
    provider: 'Stanford University',
    platform: 'Stanford Online',
    duration: 'Self-Paced (3 courses)',
    level: 'Advanced',
    tags: ['Machine Learning', 'NLP', 'Deep Learning', 'Python'],
    url: 'https://online.stanford.edu/programs/artificial-intelligence-professional-program',
    featured: true,
    description: 'An advanced programme offering deep technical mastery in AI principles, adapted directly from Stanford’s on-campus graduate curriculum.'
  },
  {
    id: 'mit-sloan-ai-strategy',
    title: 'AI: Implications for Business Strategy',
    provider: 'MIT',
    platform: 'Sloan School of Management',
    duration: '6 Weeks',
    level: 'Advanced',
    tags: ['Strategy', 'Business', 'Innovation', 'Management'],
    url: 'https://executive.mit.edu/course/artificial-intelligence/a056g00000URaa3AAD.html',
    featured: true,
    description: 'A high-level programme from MIT\'s business school and CSAIL, designed for executives to develop a strategic plan for AI implementation.'
  },
  {
    id: 'ai-for-everyone',
    title: 'AI for Everyone',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    duration: '~6 hours',
    level: 'Beginner',
    tags: ['Foundations', 'Business', 'Strategy', 'Non-Technical'],
    url: 'https://www.coursera.org/learn/ai-for-everyone',
    featured: true,
    description: 'Taught by Andrew Ng, this is the cornerstone non-technical course for understanding AI\'s strategic value in any organisation.'
  },
  {
    id: 'ai-in-education-kcl',
    title: 'AI in Education',
    provider: 'King\'s College London',
    platform: 'FutureLearn',
    duration: '3 Weeks',
    level: 'All Levels',
    tags: ['For Educators', 'Ethics', 'Pedagogy', 'Assessment'],
    url: 'https://www.futurelearn.com/courses/ai-in-education',
    featured: true,
    description: 'Encourages educators to critically examine pedagogical practices in light of AI, covering ethics, assessment, and the future of skills.'
  },

  // --- Foundational & General Audience Courses ---
  {
    id: 'elements-of-ai',
    title: 'Elements of AI',
    provider: 'University of Helsinki',
    platform: 'Independent',
    duration: 'Self-Paced',
    level: 'Beginner',
    tags: ['Foundations', 'Free', 'Public Understanding', 'Multilingual'],
    url: 'https://www.elementsofai.com/',
    featured: false,
    description: 'A free, globally accessible course designed to demystify AI for a wide audience, with no programming or complex mathematics required.'
  },
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    provider: 'Google',
    platform: 'Grow with Google',
    duration: '~5 hours',
    level: 'Beginner',
    tags: ['Productivity', 'Generative AI', 'Tools', 'Practical'],
    url: 'https://grow.google/ai-essentials/',
    featured: false,
    description: 'A practical course focused on using generative AI tools like Gemini to enhance daily productivity and decision-making.'
  },
  {
    id: 'gen-ai-for-everyone-coursera',
    title: 'Generative AI for Everyone',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    duration: '~6 Hours',
    level: 'Beginner',
    tags: ['Generative AI', 'Foundations', 'Non-Technical', 'Productivity'],
    url: 'https://www.coursera.org/learn/generative-ai-for-everyone',
    featured: false,
    description: 'A foundational, non-technical course by Andrew Ng explaining what generative AI is and how to use it in your daily life and work.'
  },
  {
    id: 'linkedin-msft-gen-ai-career',
    title: 'Career Essentials in Generative AI',
    provider: 'Microsoft & LinkedIn',
    platform: 'LinkedIn Learning',
    duration: '~4 Hours',
    level: 'Beginner',
    tags: ['Generative AI', 'Career', 'Foundations', 'Professional'],
    url: 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin',
    featured: false,
    description: 'A professional pathway to understand the core concepts of AI and generative AI, and how to apply them in a professional context.'
  },
  {
    id: 'msft-gen-ai-beginners',
    title: 'Generative AI for Beginners',
    provider: 'Microsoft',
    platform: 'Microsoft Learn',
    duration: 'Self-Paced (12 Lessons)',
    level: 'Beginner',
    tags: ['Generative AI', 'Technical', 'Foundations', 'Open Source'],
    url: 'https://microsoft.github.io/AI-For-Beginners/',
    featured: false,
    description: 'A comprehensive 12-lesson curriculum from Microsoft covering the fundamentals of building with Generative AI.'
  },

  // --- Educator-Specific Courses ---
  {
    id: 'khan-academy-ai-edu',
    title: 'AI for Education',
    provider: 'Khan Academy',
    platform: 'Independent',
    duration: 'Self-Paced',
    level: 'Beginner',
    tags: ['For Educators', 'Free', 'Literacy', 'Khanmigo'],
    url: 'https://www.khanacademy.org/college-careers-more/ai-for-education',
    featured: false,
    description: 'A trusted, free starting point for teachers to understand generative AI, with practical lesson plans and ethical best practices.'
  },
  {
    id: 'gen-ai-for-educators-google',
    title: 'Generative AI for Educators',
    provider: 'Google & MIT RAISE',
    platform: 'Grow with Google',
    duration: '2 hours',
    level: 'Beginner',
    tags: ['For Educators', 'Free', 'Productivity', 'Lesson Planning'],
    url: 'https://grow.google/ai-for-educators/',
    featured: false,
    description: 'A practical, free course on how teachers can use generative AI to save time, personalise instruction, and create engaging lessons.'
  },
  {
    id: 'uni-ni-ai-microcredential',
    title: 'AI in Education Microcredential',
    provider: 'University of Northern Iowa',
    platform: 'UNI Online',
    duration: 'Self-Paced',
    level: 'All Levels',
    tags: ['For Educators', 'Microcredential', 'Pedagogy', 'University'],
    url: 'https://online.uni.edu/microcredentials/artificial-intelligence-education',
    featured: false,
    description: 'A university-backed microcredential for educators to formally demonstrate their competence in applying AI in educational settings.'
  },
  {
    id: 'msft-ai-for-educators',
    title: 'Artificial Intelligence for Educators',
    provider: 'Microsoft',
    platform: 'Microsoft Learn',
    duration: 'Self-Paced',
    level: 'All Levels',
    tags: ['For Educators', 'Microsoft Tools', 'Productivity', 'Free'],
    url: 'https://learn.microsoft.com/en-us/training/paths/ai-education/',
    featured: false,
    description: 'A learning path designed to empower educators with the knowledge to use AI tools effectively for teaching and learning.'
  },

  // --- Developer & Technical Courses ---
  {
    id: 'cs50-intro-ai-python',
    title: 'CS50\'s Introduction to AI with Python',
    provider: 'Harvard University',
    platform: 'edX',
    duration: '7 Weeks',
    level: 'Intermediate',
    tags: ['Python', 'Algorithms', 'Machine Learning', 'CS50'],
    url: 'https://www.edx.org/learn/artificial-intelligence/harvard-university-cs50-s-introduction-to-artificial-intelligence-with-python',
    featured: false,
    description: 'Part of Harvard’s renowned CS50 series, this course provides a hands-on exploration of the concepts and algorithms at the foundation of modern AI.'
  },
  {
    id: 'deep-learning-specialization',
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    duration: '~4 Months',
    level: 'Intermediate',
    tags: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'Andrew Ng'],
    url: 'https://www.coursera.org/specializations/deep-learning',
    featured: false,
    description: 'A staple for aspiring practitioners, this specialisation provides a rigorous theoretical grounding in how neural networks work.'
  },
  {
    id: 'fast-ai-coders',
    title: 'Practical Deep Learning for Coders',
    provider: 'fast.ai',
    platform: 'Independent',
    duration: 'Self-Paced',
    level: 'Intermediate',
    tags: ['Deep Learning', 'Practical', 'PyTorch', 'Free'],
    url: 'https://course.fast.ai/',
    featured: false,
    description: 'Renowned for its "top-down" teaching philosophy, this free course shows how to achieve state-of-the-art results on real-world problems.'
  },
  {
    id: 'hugging-face-llm-course',
    title: 'The Hugging Face LLM Course',
    provider: 'Hugging Face',
    platform: 'Independent',
    duration: 'Self-Paced',
    level: 'Intermediate',
    tags: ['LLMs', 'Transformers', 'NLP', 'Open Source'],
    url: 'https://huggingface.co/learn/llm-course/chapter1/1',
    featured: false,
    description: 'An essential, free programme for developers working with open-source models, covering the entire Hugging Face ecosystem.'
  },
  {
    id: 'gen-ai-with-llms-aws',
    title: 'Generative AI with Large Language Models',
    provider: 'DeepLearning.AI & AWS',
    platform: 'Coursera',
    duration: '~16 hours',
    level: 'Intermediate',
    tags: ['LLMs', 'AWS', 'Technical', 'Deep Learning'],
    url: 'https://www.coursera.org/learn/generative-ai-with-llms',
    featured: false,
    description: 'A technical deep-dive into how LLMs work, covering model architectures, training, fine-tuning, and deployment on AWS.'
  },
  {
    id: 'ibm-ai-engineering-cert',
    title: 'IBM AI Engineering Professional Certificate',
    provider: 'IBM',
    platform: 'Coursera',
    duration: '~11 Months',
    level: 'Intermediate',
    tags: ['Machine Learning', 'Python', 'PyTorch', 'Professional Certificate'],
    url: 'https://www.coursera.org/professional-certificates/ibm-ai-engineering',
    featured: false,
    description: 'A professional certificate from IBM covering the complete lifecycle of an AI project, from data science to deployment and monitoring.'
  },
  {
    id: 'nvidia-dli',
    title: 'NVIDIA Deep Learning Institute',
    provider: 'NVIDIA',
    platform: 'Independent',
    duration: 'Self-Paced',
    level: 'Advanced',
    tags: ['Deep Learning', 'CUDA', 'High Performance', 'Technical'],
    url: 'https://www.nvidia.com/en-gb/training/',
    featured: false,
    description: 'Offers hands-on training and certification in AI, accelerated computing, and data science, from fundamentals to advanced topics.'
  },
];

// AI Tools Data Array
export const aiToolsData: AiTool[] = [
  {
    id: 'magicschool-ai',
    title: 'MagicSchool AI',
    description: 'A purpose-built AI platform for educators, offering over 80 specialised tools for lesson planning, assessment, differentiation, and administrative tasks.',
    url: 'https://www.magicschool.ai',
    tags: ['Lesson Planning', 'Assessment', 'Productivity'],
    category: 'planning'
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    description: 'OpenAI\'s versatile large language model, capable of a wide range of tasks from content creation and brainstorming to code generation and analysis.',
    url: 'https://chat.openai.com',
    tags: ['General Purpose', 'Writing', 'Brainstorming'],
    category: 'planning'
  },
  {
    id: 'google-notebook-lm',
    title: 'NotebookLM',
    description: 'An AI-powered research and writing assistant from Google that uses your own source materials to answer questions, generate ideas, and create summaries.',
    url: 'https://notebooklm.google.com',
    tags: ['Research', 'Note-Taking', 'Summarisation'],
    category: 'research'
  },
  {
    id: 'perplexity-ai',
    title: 'Perplexity AI',
    description: 'A conversational search engine that answers questions using large language models and provides citations, making it excellent for academic research.',
    url: 'https://www.perplexity.ai',
    tags: ['Research', 'Search', 'Citations'],
    category: 'research'
  },
  {
    id: 'claude-ai',
    title: 'Claude',
    description: 'Anthropic\'s AI assistant known for its large context window, strong reasoning capabilities, and a constitutional approach to safety.',
    url: 'https://claude.ai',
    tags: ['Writing', 'Analysis', 'Long Documents'],
    category: 'research'
  },
  {
    id: 'no-more-marking',
    title: 'No More Marking',
    description: 'An assessment tool that uses comparative judgement rather than traditional rubrics to provide more reliable and valid scoring for written work.',
    url: 'https://www.nomoremarking.com/',
    tags: ['Assessment', 'Writing', 'Feedback', 'Comparative Judgement'],
    category: 'assessment'
  },
  {
    id: 'phet-simulations',
    title: 'PhET Interactive Simulations',
    description: 'A library of free, research-based interactive simulations for science and mathematics, enhancing conceptual understanding through exploration.',
    url: 'https://phet.colorado.edu/',
    tags: ['Science', 'Maths', 'Simulations', 'Free'],
    category: 'stem'
  },
  {
    id: 'github-education',
    title: 'GitHub Education',
    description: 'Provides verified teachers with free access to professional developer tools, including GitHub Pro and Copilot, for teaching coding and managing classroom projects.',
    url: 'https://education.github.com/teachers',
    tags: ['Coding', 'STEM', 'Collaboration', 'Free'],
    category: 'stem'
  },
  {
    id: 'code-org',
    title: 'Code.org',
    description: 'A non-profit dedicated to expanding access to computer science in schools, offering a leading curriculum for K-12 students and professional learning for teachers.',
    url: 'https://code.org/educate',
    tags: ['Coding', 'Curriculum', 'K-12', 'Free'],
    category: 'stem'
  },
  {
    id: 'aws-educate',
    title: 'AWS Educate',
    description: 'Amazon\'s global initiative to provide students and educators with resources for building skills in cloud technology, with a focus on real-world, hands-on experience.',
    url: 'https://aws.amazon.com/education/awseducate/',
    tags: ['Cloud', 'Technical', 'Skills', 'AWS'],
    category: 'development'
  },
  {
    id: 'datacamp-for-classrooms',
    title: 'DataCamp for Classrooms',
    description: 'Offers free access for educators and their students to DataCamp\'s full suite of courses on data science, programming, and AI literacy.',
    url: 'https://www.datacamp.com/universities',
    tags: ['Data Science', 'Python', 'R', 'Free'],
    category: 'development'
  }
];

// AI Tools Categories
export const aiToolCategories = [
  {
    id: 'planning-productivity',
    name: 'Planning & Productivity',
    tools: aiToolsData.filter(tool => tool.category === 'planning'),
  },
  {
    id: 'research-analysis',
    name: 'Research & Analysis',
    tools: aiToolsData.filter(tool => tool.category === 'research'),
  },
  {
    id: 'assessment-feedback',
    name: 'Assessment & Feedback',
    tools: aiToolsData.filter(tool => tool.category === 'assessment'),
  },
  {
    id: 'stem-coding',
    name: 'STEM & Coding',
    tools: aiToolsData.filter(tool => tool.category === 'stem'),
  },
  {
    id: 'professional-development-hubs',
    name: 'Professional Development Hubs',
    tools: aiToolsData.filter(tool => tool.category === 'development'),
  },
];

// --- REACT COMPONENT IMPLEMENTATION ---

import React from 'react';

// --- Placeholder Component Imports ---
// These components are assumed to be defined elsewhere in the project.
// e.g., in 'src/components/'
const PageHeader = ({ title, subtitle }: { title: string; subtitle: string; }) => (
    <header className="mb-12 text-center">
      <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
      <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
    </header>
);

const CourseCard = ({ course }: { course: Course }) => (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{course.provider} on {course.platform}</p>
      <p className="mt-4 text-gray-700 flex-grow">{course.description}</p>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>{course.duration}</span>
        <span>{course.level}</span>
      </div>
      <a href={course.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center">
        Start Learning
      </a>
    </div>
);

const ToolCard = ({ tool }: { tool: AiTool }) => (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow bg-gray-50 flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
      <p className="mt-2 text-gray-700 flex-grow">{tool.description}</p>
      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-sps-ruby text-white font-semibold py-2 px-4 rounded-md hover:bg-sps-ruby/90 transition-colors text-center">
        Try Tool
      </a>
    </div>
);

const PageFooter = () => (
    <footer className="mt-20 text-center text-gray-500">
      <p>&copy; 2025 St. Paul’s School, São Paulo. All rights reserved.</p>
    </footer>
);

// --- MAIN PAGE COMPONENT ---

const LearnPage: React.FC = () => {
  const featuredCourses = coursesData.filter(course => course.featured);
  const regularCourses = coursesData.filter(course => !course.featured);

  return (
      <div className="bg-gray-100 min-h-screen">
        <main className="container mx-auto px-6 py-16">
          <PageHeader
              title="Learn AI for Education"
              subtitle="A curated catalogue of high-quality AI courses and tools for modern educators."
          />

          {/* Featured Programmes Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-8">
              Featured Programmes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          {/* Essential AI Tools Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-sps-ruby pb-2 mb-8">
              Essential AI Tools for Teachers
            </h2>
            <div className="space-y-12">
              {aiToolCategories.map(category => (
                  <div key={category.id}>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.tools.map(tool => (
                          <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* Comprehensive Course Catalogue Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-8">
              Comprehensive Course Catalogue
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

        </main>
        <PageFooter />
      </div>
  );
};

export default LearnPage;
