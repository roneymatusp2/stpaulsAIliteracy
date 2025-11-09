import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FloatingCardGrid from '../components/FloatingCardGrid';
import AINewsSection from '../components/AINewsSection';
import { mockResources } from '../lib/supabase';

const HomePage: React.FC = () => {
  const featuredResources = mockResources.slice(0, 6);

  const focusAreas = [
    {
      icon: '🛡️',
      title: 'Safe & Responsible AI',
      description: 'Guidance aligned with St. Paul’s safeguarding, privacy, and academic integrity expectations.'
    },
    {
      icon: '📋',
      title: 'Curriculum-Ready Playbooks',
      description: 'Step-by-step exemplars for IB, IGCSE, and bilingual pathways that save planning time.'
    },
    {
      icon: '🤝',
      title: 'Staff Capability Building',
      description: 'Professional learning sequences that help every educator feel confident using AI.'
    },
    {
      icon: '🎓',
      title: 'Pupil Innovation',
      description: 'Studio-style challenges and co-curricular ideas for pupils to apply AI creatively and ethically.'
    }
  ];

  const assurancePillars = [
    {
      label: 'Governance',
      copy: 'Clear escalation routes, auditing notes, and documentation templates for EdTech approvals.'
    },
    {
      label: 'Pedagogy First',
      copy: 'Every tool recommendation is framed around learning intent, not hype.'
    },
    {
      label: 'Accessibility',
      copy: 'Support for varied devices, bandwidth, and learner needs across the school.'
    }
  ];

  const engagementOptions = [
    {
      title: 'Educators',
      description: 'Request bespoke coaching sessions or book a faculty briefing.',
      action: { label: 'Email edtech@stpauls.br', href: 'mailto:edtech@stpauls.br' }
    },
    {
      title: 'Leadership',
      description: 'Access implementation roadmaps, audit templates, and governance packs.',
      action: { label: 'View About page', href: '/about' }
    },
    {
      title: 'Students',
      description: 'Explore curated AI literacy tasks through the Library and Videos collections.',
      action: { label: 'Browse Library', href: '/library' }
    }
  ];

  return (
    <>
      <Hero />
      <AINewsSection />

      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingCardGrid
            resources={featuredResources}
            title="Curated for St. Paul’s Classrooms"
            subtitle="Authentic AI tools validated by our Educational Technology Department"
            showFilters={false}
            className="featured-grid"
          />

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/tools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sps-ruby to-sps-indigo text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Explore full directory
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-sps-indigo/5 dark:bg-sps-green/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-sps-indigo/80">St. Paul’s Priorities</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sps-indigo dark:text-white mt-4">
              Intelligent adoption, guided by our values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
              Every recommendation on this platform is designed to uphold MANIBUS POTENTIA STUDIUM ANIMIS – skill in the hands, curiosity in the mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading text-sps-indigo dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sps-ruby to-sps-indigo relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ duration: 4 + i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-sm uppercase tracking-[0.5em] mb-4">Whole-school readiness</p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6">
            Implementation support from classroom pilots to strategic governance
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Use the platform to scope ideas, then partner with the Educational Technology Department for bespoke coaching, parent communication, and policy alignment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/learn"
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-white/15 border border-white/30 text-white font-semibold backdrop-blur-sm"
              >
                📚 View professional learning guides
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="mailto:edtech@stpauls.br"
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-white text-sps-indigo font-semibold"
              >
                ✉️ Contact Educational Technology
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading text-sps-indigo dark:text-white mb-4">
              Confidence through clarity
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Practical guardrails accompany every recommendation so teams can adopt AI responsibly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {assurancePillars.map((pillar) => (
              <div key={pillar.label} className="glass-card p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-sps-indigo/70 mb-3">{pillar.label}</p>
                <p className="text-gray-700 dark:text-gray-300">{pillar.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-sps-indigo/5 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementOptions.map((option) => {
              const isInternal = option.action.href.startsWith('/');
              return (
                <div key={option.title} className="glass-card p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading text-sps-indigo dark:text-white mb-3">{option.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{option.description}</p>
                </div>
                <motion.div whileHover={{ x: 4 }}>
                  {isInternal ? (
                    <Link to={option.action.href} className="inline-flex items-center text-sps-ruby font-semibold">
                      {option.action.label}
                    </Link>
                  ) : (
                    <a href={option.action.href} className="inline-flex items-center text-sps-ruby font-semibold">
                      {option.action.label}
                    </a>
                  )}
                </motion.div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 glass-card p-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-sps-indigo/70">Campus contact</p>
            <h3 className="text-3xl font-heading text-sps-indigo dark:text-white mt-4">
              Rua Juquiá, 166 · Jardim Paulistano · São Paulo · 01440-903
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Educational Technology Department · edtech@stpauls.br
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
