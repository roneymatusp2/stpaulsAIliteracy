import React from 'react';

const AboutPage: React.FC = () => {
  const principles = [
    {
      title: 'Pedagogy before platforms',
      description: 'AI is adopted only when it protects time for excellent teaching and purposeful relationships.'
    },
    {
      title: 'Whole-community readiness',
      description: 'Parents, pupils, and staff receive transparent guidance so innovation feels safe and inclusive.'
    },
    {
      title: 'Data ethics at the core',
      description: 'All recommendations respect privacy law, inspection frameworks, and St. Paul’s safeguarding commitments.'
    }
  ];

  const values = [
    { icon: '⚖️', title: 'Integrity', copy: 'Clear guardrails, audit trails, and accountability for every workflow.' },
    { icon: '🎨', title: 'Creativity', copy: 'Inviting pupils to co-design solutions that celebrate bilingual and bicultural identities.' },
    { icon: '🧭', title: 'Stewardship', copy: 'Sequenced adoption roadmaps ensure sustainability rather than one-off experiments.' },
    { icon: '🤲', title: 'Community', copy: 'Sharing practice with other British International schools across Brazil and beyond.' }
  ];

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-r from-sps-indigo to-sps-ruby text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-white/80">St. Paul’s School · Educational Technology Department</p>
          <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-6">
            About the AI Learning Platform
          </h1>
          <p className="mt-6 text-xl text-white/80">
            We help teachers and pupils in São Paulo harness artificial intelligence responsibly, creatively, and in harmony with our British international heritage.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-heading text-sps-indigo dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To make St. Paul’s School the safest and most inspiring place to explore artificial intelligence in Latin America by uniting pedagogy, governance, and community voice.
            </p>
            <p className="text-sm uppercase tracking-[0.4em] text-sps-indigo/70 mt-8">MANIBUS POTENTIA STUDIUM ANIMIS</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-sps-indigo/5 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle) => (
              <div key={principle.title} className="glass-card p-8">
                <h3 className="text-xl font-heading text-sps-indigo dark:text-white mb-3">{principle.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading text-sps-indigo dark:text-white">Values in Action</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">How the platform supports daily life at St. Paul’s.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-6 text-center">
                <div className="text-3xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-heading text-sps-indigo dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-sps-indigo/5 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading text-sps-indigo dark:text-white mb-6">Contact</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Educational Technology Department · Rua Juquiá, 166 – Jardim Paulistano – São Paulo – 01440-903
          </p>
          <a href="mailto:edtech@stpauls.br" className="mt-4 inline-flex items-center text-sps-ruby font-semibold">
            edtech@stpauls.br
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
