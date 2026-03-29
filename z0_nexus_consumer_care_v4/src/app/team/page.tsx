'use client';

import PageLayout from '@/components/nexus/PageLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

const leadership = [
  {
    name: 'Rajesh Sharma', role: 'Founder & CEO', image: '/images/nexus/team/ceo.png',
    bio: 'With 25+ years in the FMCG manufacturing industry, Rajesh founded Nexus Consumer Care with a vision to make world-class cleaning solutions accessible to every Indian brand. An IIT-Delhi alumnus and serial entrepreneur.',
    linkedin: '#', email: 'rajesh@nexusconsumercare.com', color: '#10B981',
  },
  {
    name: 'Dr. Priya Mehta', role: 'Head of R&D', image: '/images/nexus/team/rd-head.png',
    bio: 'A PhD in Surfactant Chemistry from IISc Bangalore, Dr. Mehta leads our 12-person R&D team. She holds 8 patents in enzyme-based cleaning formulations and has developed 100+ custom formulas for private label clients.',
    linkedin: '#', email: 'priya@nexusconsumercare.com', color: '#F59E0B',
  },
  {
    name: 'Amit Verma', role: 'VP Operations', image: '/images/nexus/team/ops-head.png',
    bio: 'A supply chain expert with 18 years at Hindustan Unilever and P&G before joining Nexus. Amit oversees our 100 MT monthly production, quality assurance, and pan-India logistics network.',
    linkedin: '#', email: 'amit@nexusconsumercare.com', color: '#34D399',
  },
];

const departments = [
  { name: 'Research & Development', head: 'Dr. Priya Mehta', size: '12 Scientists', icon: '🧪', color: '#10B981' },
  { name: 'Quality Assurance', head: 'Vikram Singh', size: '8 Engineers', icon: '✅', color: '#F59E0B' },
  { name: 'Production', head: 'Amit Verma', size: '45 Operators', icon: '🏭', color: '#34D399' },
  { name: 'Supply Chain', head: 'Neha Kapoor', size: '15 Members', icon: '🚛', color: '#6EE7B7' },
  { name: 'Sales & Marketing', head: 'Rohit Gupta', size: '20 Members', icon: '📊', color: '#059669' },
  { name: 'Finance & Admin', head: 'Sunita Devi', size: '8 Members', icon: '💼', color: '#F59E0B' },
];

const culturePoints = [
  'Innovation-first mindset — every team member is encouraged to experiment and propose improvements.',
  'Meritocratic growth — promotions are based on impact, not tenure. We celebrate results.',
  'Continuous learning — sponsored certifications, industry conferences, and skill workshops.',
  'Collaborative culture — open-door policy from CEO to interns. Ideas flow freely.',
  'Health & wellness — comprehensive insurance, gym memberships, and mental health support.',
];

export default function TeamPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0A1215] to-[#070B0E]" />
        <motion.div className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 70% 50%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">Our Team</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            The People Behind <span className="gradient-text-fire">Nexus</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A team of 100+ passionate professionals — scientists, engineers, and industry veterans
            dedicated to manufacturing excellence.
          </motion.p>
        </div>
      </section>

      {/* Team Photo */}
      <section className="relative -mt-4 z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass-card">
          <div className="aspect-[16/6] relative">
            <Image src="/images/nexus/about/team-collab.png" alt="Nexus Team" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Leadership */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Leadership <span className="gradient-text-ocean">Team</span>
            </motion.h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">Visionaries driving Nexus Consumer Care&apos;s mission of manufacturing excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((person, i) => (
              <motion.div key={person.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}
                className="glass-card rounded-3xl overflow-hidden group hover:border-white/15 transition-all duration-500">
                <div className="relative h-72 overflow-hidden">
                  <Image src={person.image} alt={person.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E] via-[#070B0E]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${person.color}20`, color: person.color, border: `1px solid ${person.color}30` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: person.color }} />
                      {person.role}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{person.name}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{person.bio}</p>
                  <div className="flex items-center gap-3">
                    <a href={person.linkedin} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#94A3B8] hover:text-[#10B981] transition-colors">
                      <Linkedin size={16} />
                    </a>
                    <a href={`mailto:${person.email}`} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#94A3B8] hover:text-[#F59E0B] transition-colors">
                      <Mail size={16} />
                    </a>
                    <span className="text-xs text-[#94A3B8] ml-auto">{person.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text-fire">Departments</span>
            </motion.h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">Specialized teams working in sync to deliver excellence at every stage.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <motion.div key={dept.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:border-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: `${dept.color}15`, border: `1px solid ${dept.color}20` }}>
                  {dept.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{dept.name}</h3>
                  <p className="text-[#94A3B8] text-sm mt-1">Led by {dept.head}</p>
                  <p className="text-xs mt-1" style={{ color: dept.color }}>{dept.size}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Life at <span className="gradient-text-ocean">Nexus</span>
            </motion.h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">More than a workplace — a community of innovators and problem-solvers.</p>
          </div>
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <ul className="space-y-6">
              {culturePoints.map((point, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-[#94A3B8] leading-relaxed">{point}</p>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mt-10">
              <a href="#contact" className="magnetic-btn inline-flex px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-shadow">
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '100+', label: 'Team Members' }, { value: '25+', label: 'Years Avg. Experience' },
              { value: '6', label: 'Departments' }, { value: '12', label: 'R&D Scientists' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text-ocean mb-1">{stat.value}</div>
                <p className="text-[#94A3B8] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
