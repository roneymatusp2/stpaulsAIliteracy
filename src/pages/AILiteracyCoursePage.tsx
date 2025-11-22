import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  fetchAILiteracyLessons,
  fetchAILiteracySkills,
  type AILiteracyLesson,
  type AILiteracySkill
} from '../lib/supabase';

const AILiteracyCoursePage: React.FC = () => {
  const [lessons, setLessons] = useState<AILiteracyLesson[]>([]);
  const [skills, setSkills] = useState<AILiteracySkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<AILiteracyLesson | null>(null);
  const lessonsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const [lessonsData, skillsData] = await Promise.all([
          fetchAILiteracyLessons(),
          fetchAILiteracySkills()
        ]);
        setLessons(lessonsData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error loading AI Literacy course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sps-ruby"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sps-ruby to-purple-600 text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Literacy Skills 101
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A Free Course for K-12 Educators
            </p>
            <p className="text-lg mb-8 text-white/90 max-w-3xl mx-auto">
              Develop your foundational AI literacy skillset with this comprehensive course,
              built around the seven core skills identified in the AI Literacy Framework
              developed by the OECD, European Commission, and Code.org.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">8 Lessons</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">7 Core Skills</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">Certificate Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About This Course
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This course is designed for K-12 educators and their students to develop foundational
                AI literacy skills. Each lesson invites teachers and students to watch, pause, reflect,
                and practise together.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Each skill is anchored to a thinking framework or graphic organiser that helps bring
                it to life in the classroom. You can download the full set of organisers and posters
                to keep using as you explore AI across subjects.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                What You'll Learn
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                <li>Practise and reflect on the seven core AI literacy skills</li>
                <li>Build a shared language around each skill and how it shows up in real classroom use</li>
                <li>Use AI thoughtfully and safely as both a teacher and a student</li>
                <li>Apply practical tools and routines you can use immediately</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Certificate of Completion
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                After finishing the course, you will have the opportunity to take a short assessment
                connected to the course materials to receive a certificate of completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Core Skills Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              The 7 Core AI Literacy Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-sps-ruby to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {skill.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lessons Section */}
      <section ref={lessonsRef} className="py-16 bg-white dark:bg-gray-800 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Course Lessons
            </h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedLesson(selectedLesson?.id === lesson.id ? null : lesson)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-sps-ruby to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {lesson.description}
                        </p>
                        {lesson.skill && (
                          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                            {lesson.skill.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg
                        className={`w-6 h-6 transform transition-transform ${
                          selectedLesson?.id === lesson.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {selectedLesson?.id === lesson.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                    >
                      <div className="prose dark:prose-invert max-w-none mb-6">
                        {lesson.content_markdown && (
                          <div
                            className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
                            style={{ maxHeight: '600px', overflowY: 'auto' }}
                          >
                            {lesson.content_markdown}
                          </div>
                        )}
                      </div>

                      {/* Exercises Section */}
                      {lesson.exercises && lesson.exercises.length > 0 && (
                        <div className="mt-6 bg-blue-50 dark:bg-gray-900 rounded-lg p-6">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span>🎯</span>
                            Practical Exercises
                          </h4>
                          <div className="space-y-4">
                            {lesson.exercises.map((exercise: any, idx: number) => (
                              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-gray-700">
                                <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                                  {idx + 1}. {exercise.title}
                                </h5>
                                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
                                  {exercise.description}
                                </p>
                                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                                  <span>⏱️ {exercise.duration_minutes} minutes</span>
                                  <span>📋 {exercise.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources Section */}
                      {lesson.resources && lesson.resources.length > 0 && (
                        <div className="mt-6 bg-green-50 dark:bg-gray-900 rounded-lg p-6">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span>📚</span>
                            Additional Resources
                          </h4>
                          <div className="space-y-3">
                            {lesson.resources.map((resource: any, idx: number) => (
                              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-gray-700">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <h5 className="font-bold text-gray-900 dark:text-white mb-1">
                                      {resource.title}
                                    </h5>
                                    {resource.description && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {resource.description}
                                      </p>
                                    )}
                                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                      {resource.type}
                                    </span>
                                  </div>
                                  {resource.url && (
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-shrink-0 text-sps-ruby hover:text-sps-indigo transition-colors"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sps-ruby to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your AI Literacy Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join educators worldwide in developing the skills needed to navigate
            the AI era with confidence.
          </p>
          <button
            onClick={() => lessonsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-sps-ruby px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
          >
            Enroll Now - It's Free!
          </button>
        </div>
      </section>
    </div>
  );
};

export default AILiteracyCoursePage;
