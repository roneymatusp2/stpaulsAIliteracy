import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/st-paul-s-school-sao-paulo/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/stpaulsschoolsp/', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@stpaulsschoolsp', icon: 'youtube' }
];

const iconMap = {
  linkedin: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.413v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063C6.477 3.305 7.4 4.23 7.4 5.368c0 1.139-.925 2.065-2.063 2.065zm-1.78 13.019h3.564V9H3.557v11.452z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A4.5 4.5 0 1016.5 12 4.505 4.505 0 0012 7.5zm0 2A2.5 2.5 0 1114.5 12 2.5 2.5 0 0112 9.5zm5.25-4.25a1 1 0 101 1 1 1 0 00-1-1z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.003 3.003 0 00-2.117-2.126C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.381.56A3.003 3.003 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.003 3.003 0 002.117 2.126C4.495 20.5 12 20.5 12 20.5s7.505 0 9.381-.56a3.003 3.003 0 002.117-2.126C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.5v-7L15.5 12l-5.75 3.5z" />
    </svg>
  )
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sps-indigo text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://nyc.cloud.appwrite.io/v1/storage/buckets/68a52c57000dac1b04b3/files/68a52c6800384645c80c/view?project=680e68b10024125b5c0b&mode=admin"
              alt="St. Paul’s School logo"
              className="h-12 w-auto"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">St. Paul’s School</p>
              <p className="text-xl font-heading">AI Learning Platform</p>
            </div>
          </Link>
          <p className="mt-4 text-white/80 text-sm">
            Rua Juquiá, 166 · Jardim Paulistano · São Paulo · 01440-903
          </p>
          <p className="text-white/80 text-sm">edtech@stpauls.br</p>
          <div className="flex space-x-4 mt-6">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label={social.label}>
                {iconMap[social.icon as keyof typeof iconMap]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><Link to="/" className="hover:text-white">🤖 AI Tools</Link></li>
            <li><Link to="/tools" className="hover:text-white">🚀 Explore AI Tools</Link></li>
            <li><Link to="/learn" className="hover:text-white">📚 Learn AI Tools</Link></li>
            <li><Link to="/library" className="hover:text-white">📖 Library</Link></li>
            <li><Link to="/videos" className="hover:text-white">🎥 Videos</Link></li>
            <li><Link to="/about" className="hover:text-white">ℹ️ About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Governance templates</li>
            <li>Lesson-ready prompts</li>
            <li>Safeguarding briefings</li>
            <li>Professional learning pathways</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">School</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="https://www.stpauls.br" className="hover:text-white">School website</a></li>
            <li><a href="https://www.stpauls.br/contato" className="hover:text-white">Contact portal</a></li>
            <li><a href="https://www.stpauls.br/en/policies" className="hover:text-white">Policies & reports</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-white/70 text-sm">
        <p>© {currentYear} St. Paul’s School, São Paulo, Brazil · Educational Technology Department</p>
      </div>
    </footer>
  );
};

export default Footer;
