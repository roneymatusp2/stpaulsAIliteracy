import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FloatingCardGrid from '../components/FloatingCardGrid';
import AINewsSection from '../components/AINewsSection';
import { mockResources, fetchAILiteracySkills, type AILiteracySkill } from '../lib/supabase';

const HomePage: React.FC = () => {
  const featuredResources = mockResources.slice(0, 6);
  const [aiLiteracySkills, setAiLiteracySkills] = useState<AILiteracySkill[]>([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const skills = await fetchAILiteracySkills();
        setAiLiteracySkills(skills);
      } catch (error) {
        console.error('Error loading AI Literacy skills:', error);
      }
    };
    loadSkills();
  }, []);

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
      {/* St. Paul's AI Literacy Course Section - TOP PRIORITY */}
      <section className="py-24 bg-gradient-to-br from-sps-indigo via-sps-ruby to-sps-green relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-yellow-400 text-2xl">🏆</span>
              <span className="text-white text-sm uppercase tracking-[0.3em] font-bold">
                Earn Your Certification
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              St. Paul's AI Literacy
            </h2>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
              A comprehensive professional learning programme designed for K-12 educators
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/20 backdrop-blur-md px-4 py-4 rounded-2xl border border-white/30 shadow-lg"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-3xl">📚</span>
                  <span className="text-white font-bold text-sm">8 Expert-Led</span>
                  <span className="text-white/80 text-xs">Lessons</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/20 backdrop-blur-md px-4 py-4 rounded-2xl border border-white/30 shadow-lg"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-3xl">🎯</span>
                  <span className="text-white font-bold text-sm">7 Core</span>
                  <span className="text-white/80 text-xs">AI Skills</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/20 backdrop-blur-md px-4 py-4 rounded-2xl border border-white/30 shadow-lg"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-3xl">🏅</span>
                  <span className="text-white font-bold text-sm">Digital</span>
                  <span className="text-white/80 text-xs">Badges</span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/20 backdrop-blur-md px-4 py-4 rounded-2xl border border-white/30 shadow-lg"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-3xl">📜</span>
                  <span className="text-white font-bold text-sm">Official</span>
                  <span className="text-white/80 text-xs">Certificate</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* The 7 Core Skills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-heading font-bold text-white mb-3">
                Master the 7 Core AI Literacy Skills
              </h3>
              <p className="text-white/80 text-lg">
                Based on the OECD, European Commission, and Code.org framework
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiLiteracySkills.slice(0, 7).map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#820021] to-[#002718] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {skill.name}
                      </h4>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certification & Badges Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="text-6xl mb-4">🎓</div>
                <h4 className="text-2xl font-bold text-white mb-3">Professional Certificate</h4>
                <p className="text-white/80 leading-relaxed">
                  Earn an official St. Paul's certificate upon successful completion of the assessment
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="text-6xl mb-4">🏅</div>
                <h4 className="text-2xl font-bold text-white mb-3">Digital Badges</h4>
                <p className="text-white/80 leading-relaxed">
                  Collect skill badges as you progress through each of the 7 core competencies
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <div className="text-6xl mb-4">📊</div>
                <h4 className="text-2xl font-bold text-white mb-3">Progress Tracking</h4>
                <p className="text-white/80 leading-relaxed">
                  Monitor your learning journey with personalised dashboards and analytics
                </p>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/ai-literacy-course"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-gray-50 text-[#820021] text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white/50"
                >
                  <span>🚀</span>
                  Start Your AI Literacy Journey
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <p className="text-white/90 mt-4 text-sm font-semibold">
                Free for all St. Paul's staff • Self-paced learning • Expert support available
              </p>
            </div>
          </motion.div>
        </div>
      </section>

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
