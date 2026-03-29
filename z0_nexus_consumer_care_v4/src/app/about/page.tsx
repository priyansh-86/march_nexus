'use client';

import PageLayout from '@/components/nexus/PageLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Eye, Heart, Award, Users, Globe, TrendingUp, Shield, Leaf, Zap } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Quality First', description: 'Every product undergoes 14-point quality testing before leaving our facility. No compromises, ever.', color: '#10B981' },
  { icon: TrendingUp, title: 'Continuous Innovation', description: 'Our R&D lab invests 8% of revenue into developing next-gen cleaning formulations.', color: '#F59E0B' },
  { icon: Heart, title: 'Customer Partnership', description: 'We don\'t just supply products — we grow brands together with dedicated account management.', color: '#34D399' },
  { icon: Leaf, title: 'Eco Responsibility', description: 'Biodegradable formulas, recyclable packaging, and zero-waste manufacturing targets by 2026.', color: '#6EE7B7' },
  { icon: Zap, title: 'Agile Manufacturing', description: 'From pilot runs of 500 units to bulk orders of 100 MT — we scale on your timeline.', color: '#059669' },
  { icon: Globe, title: 'Pan-India Reach', description: 'Distribution network spanning 28 states with cold-chain logistics for temperature-sensitive products.', color: '#F59E0B' },
];

const milestones = [
  { year: '2007', title: 'Founded', desc: 'Started as a small detergent powder unit in Chandigarh with 5 employees.' },
  { year: '2012', title: 'First Private Label', desc: 'Launched contract manufacturing for a leading retail brand. 50 MT capacity.' },
  { year: '2016', title: 'ISO Certification', desc: 'Achieved ISO 9001:2015 and GMP certification for quality management.' },
  { year: '2019', title: 'New Facility', desc: 'Expanded to 25,000 sq. ft. state-of-the-art manufacturing plant.' },
  { year: '2022', title: '100 MT Capacity', desc: 'Crossed 100 MT monthly production with automated filling lines.' },
  { year: '2025', title: '500+ Brands', desc: 'Serving 500+ brands with a product portfolio of 200+ SKUs across India.' },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0A1215] to-[#070B0E]" />
        <motion.div className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 30% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">About Us</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our Story of <span className="gradient-text-ocean">Clean Excellence</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From a small Chandigarh unit to India&apos;s trusted name in contract manufacturing —
            17+ years of quality, innovation, and unwavering commitment to our partners.
          </motion.p>
        </div>
      </section>

      {/* Facility Image */}
      <section className="relative -mt-8 z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden glass-card">
          <div className="aspect-[16/7] relative">
            <Image src="/images/nexus/about/facility-wide.png" alt="Nexus Manufacturing Facility"
              fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/80 via-transparent to-[#070B0E]/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/80 text-sm">Our 25,000 sq. ft. state-of-the-art manufacturing facility in Chandigarh</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="glass-card rounded-3xl p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 flex items-center justify-center mb-6 border border-[#10B981]/20">
                <Target size={28} className="text-[#10B981]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-[#94A3B8] leading-relaxed">
                To empower brands across India with world-class cleaning products through cutting-edge
                formulation science, agile manufacturing, and an unwavering commitment to quality.
                We believe every home deserves premium cleaning solutions — and every brand deserves
                a manufacturing partner they can trust completely.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-card rounded-3xl p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/10 flex items-center justify-center mb-6 border border-[#F59E0B]/20">
                <Eye size={28} className="text-[#F59E0B]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-[#94A3B8] leading-relaxed">
                To be India&apos;s most trusted and innovative contract manufacturing partner — known
                for quality that sets industry benchmarks, sustainability that leads by example,
                and partnerships that create lasting value. By 2028, we aim to serve 1,000+ brands
                with a 200 MT monthly capacity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              What We <span className="gradient-text-fire">Stand For</span>
            </motion.h2>
            <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">Six core values that guide every decision, every formulation, and every partnership.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${v.color}15`, border: `1px solid ${v.color}20` }}>
                  <v.icon size={22} style={{ color: v.color }} />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 overflow-hidden">
        <div className="section-divider mb-24" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text-ocean">Journey</span>
            </motion.h2>
            <p className="text-[#94A3B8] text-lg">From humble beginnings to industry leadership.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <div className="w-full h-full bg-gradient-to-b from-[#10B981]/40 via-[#F59E0B]/40 to-[#10B981]/40" />
            </div>
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left pl-16 md:pl-0`}>
                    <span className="gradient-text-fire font-display text-2xl font-bold">{m.year}</span>
                    <h3 className="text-white font-semibold text-lg mt-1">{m.title}</h3>
                    <p className="text-[#94A3B8] text-sm mt-1">{m.desc}</p>
                  </div>
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] border-4 border-[#070B0E] z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Partner With Us?</h2>
            <p className="text-[#94A3B8] text-lg mb-8 max-w-lg mx-auto">Join 500+ brands that trust Nexus Consumer Care for quality, scale, and reliability.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="magnetic-btn px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-shadow">
                Get in Touch
              </a>
              <a href="/products" className="magnetic-btn px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                View Products
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
