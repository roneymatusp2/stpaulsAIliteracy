import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MorphingButton from './MorphingButton';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const highlights = [
    { label: 'Staff pathways', value: '12', detail: 'tailored professional learning journeys' },
    { label: 'Curated tools', value: '80+', detail: 'reviewed for St. Paul’s classrooms' },
    { label: 'Safeguarding checks', value: '7', detail: 'criteria applied to every recommendation' }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sps-indigo via-black to-sps-ruby opacity-80" />
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`hero-star-${i}`}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <p className="text-sm uppercase tracking-[0.5em] text-white/80">St. Paul’s School · São Paulo</p>
          <h1 className="mt-6 text-4xl md:text-6xl font-heading font-semibold leading-tight">
            AI Learning Platform
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Empowering educators and pupils to use artificial intelligence with discernment, creativity, and care.
            Every resource here is aligned with MANIBUS POTENTIA STUDIUM ANIMIS – skill in our hands, curiosity in our minds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <MorphingButton
              variant="primary"
              className="text-lg"
              onClick={() => navigate('/tools')}
            >
              🤖 Explore AI Tools
            </MorphingButton>
            <MorphingButton
              variant="secondary"
              className="text-lg"
              onClick={() => navigate('/learn')}
            >
              📚 Staff Learning Guides
            </MorphingButton>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            <a
              href="mailto:edtech@stpauls.br"
              className="text-white/80 hover:text-white transition-colors underline decoration-dotted"
            >
              edtech@stpauls.br
            </a>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors underline decoration-dotted">
              About the Educational Technology Department →
            </Link>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-10 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Safeguarded implementation</p>
              <h3 className="text-2xl font-heading mt-2">St. Paul’s AI Assurance</h3>
            </div>
            <img
              src="https://nyc.cloud.appwrite.io/v1/storage/buckets/68a52c57000dac1b04b3/files/68a52c6800384645c80c/view?project=680e68b10024125b5c0b&mode=admin"
              alt="St. Paul’s School crest"
              className="h-14 w-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.label}>
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">{item.label}</p>
                <p className="text-3xl font-heading mt-2">{item.value}</p>
                <p className="text-sm text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white/10 border border-white/10">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Campus focus</p>
            <p className="text-lg mt-2">
              Lesson-ready prompts, governance templates, and communication scripts to help departments adopt AI confidently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
