import React, { useState } from 'react';
import FloatingCardGrid from '../components/FloatingCardGrid';
import { aiToolsData, aiToolCategories } from '../data/aiToolsData';

const ToolsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const getFilteredTools = () => {
    if (selectedCategory === 'all') {
      return aiToolsData;
    }
    const category = aiToolCategories.find(cat => cat.id === selectedCategory);
    return category ? category.tools : [];
  };

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-sps-ruby to-sps-indigo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI Tools for Teachers
          </h1>
          <p className="text-xl text-white/85 max-w-3xl mx-auto mb-8">
            Discover artificial intelligence tools validated by St. Paul’s Educational Technology Department.
            Every listing includes implementation notes so lessons remain purposeful and safe.
          </p>
          <div className="text-white/85">
            <p className="text-lg mb-2">
              <strong>{aiToolsData.length}</strong> AI tools across <strong>{aiToolCategories.length}</strong> categories
            </p>
            <p className="text-sm opacity-90">
              Reviewed for curriculum fit, privacy expectations, and device availability at St. Paul’s School.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-sps-ruby to-sps-indigo text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
              }`}
            >
              All Tools ({aiToolsData.length})
            </button>
            {aiToolCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-sps-ruby to-sps-indigo text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {category.name} ({category.tools.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      {selectedCategory !== 'all' && (
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {(() => {
              const category = aiToolCategories.find(cat => cat.id === selectedCategory);
              return category ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {category.description}
                  </p>
                </div>
              ) : null;
            })()}
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingCardGrid 
            resources={getFilteredTools()}
            allowedCategories={['ai_tool']}
            showFilters={false}
          />
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
