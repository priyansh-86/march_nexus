'use client';

/**
 * ============================================================
 * FounderSection Component
 * ============================================================
 * Displays the founder's profile, vision, and key achievements.
 * Placed just above the Footer on the homepage.
 *
 * HOW TO EDIT:
 * - Change founder name, bio, image in the `founder` object below
 * - Update social links (LinkedIn, Twitter, etc.) in the `socialLinks` array
 * - Modify stats in the `founderStats` array
 * - Adjust colors by changing hex values in the `founder` object
 * - The quote text can be updated in the `founder.quote` field
 * ============================================================
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Twitter, Mail, Phone, Award, Target, Lightbulb, Users } from 'lucide-react';

/* --------------------------------------------------------
   Founder Data — EDIT THIS to update founder details
   -------------------------------------------------------- */
const founder = {
  name: 'have to doooo',
  title: 'Founder & CEO',
  image: '/images/nexus/founder.png',
  bio: [
    'have to dooooo founded Nexus Consumer Care with a singular vision — to deliver world-class detergent and cleaning products to every Indian household. Starting from a modest manufacturing unit in Vapi\'s GIDC industrial estate, he has built Nexus into one of Gujarat\'s most trusted cleaning product manufacturers.',
    'With deep expertise in formulation chemistry and a relentless focus on quality, Priyansh oversees every aspect of production — from raw material sourcing to final packaging. His hands-on approach and commitment to innovation have earned the trust of distributors and brands across India.',
  ],
  quote: '"Quality is not an act, it is a habit. At Nexus, we don\'t just manufacture products — we craft cleaning solutions that families trust every single day."',
  email: 'priyanshrajbhar499@gmail.com',
  phone: '+91 92278 06789',
  color: '#10B981', // Accent color for the founder card (Emerald Green)
};

/* --------------------------------------------------------
   Founder's Key Stats — EDIT THIS to change achievement numbers
   -------------------------------------------------------- */
const founderStats = [
  { icon: Award, label: 'Years Experience', value: '17+', color: '#F59E0B' },
  { icon: Target, label: 'Monthly Capacity', value: '100 MT', color: '#10B981' },
  { icon: Lightbulb, label: 'Product SKUs', value: '200+', color: '#34D399' },
  { icon: Users, label: 'Brand Partners', value: '500+', color: '#059669' },
];

/* --------------------------------------------------------
   Social Links — EDIT THIS to update social media URLs
   -------------------------------------------------------- */
const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/priyanshrajbhar', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Twitter, href: 'https://twitter.com/priyanshrajbhar', label: 'Twitter', color: '#FFFFFF' },
  { icon: Mail, href: `mailto:${founder.email}`, label: 'Email', color: '#F59E0B' },
];

/* --------------------------------------------------------
   Animation Variants — Controls scroll-triggered animations
   -------------------------------------------------------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function FounderSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="founder">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0A1215] to-[#070B0E]" />
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)' }}
      />

      {/* Section divider line */}
      <div className="section-divider mb-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">
              Meet Our Founder
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            The Visionary Behind <span className="gradient-text-fire">Nexus</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A passionate leader dedicated to transforming India&apos;s cleaning products industry through innovation and unwavering quality standards.
          </motion.p>
        </div>

        {/* Founder card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* Left: Founder Photo & Quick Info (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden">
              {/* Decorative gradient orb */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${founder.color}, transparent)` }}
              />

              {/* Photo */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={founder.image}
                  alt={`${founder.name} — ${founder.title} of Nexus Consumer Care`}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E] via-transparent to-transparent" />

                {/* Name overlay at bottom of photo */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {founder.name}
                  </h3>
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: founder.color }}
                  >
                    {founder.title}
                  </p>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="space-y-3">
                <a
                  href={`mailto:${founder.email}`}
                  className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#F59E0B] transition-colors group"
                >
                  <Mail size={16} className="text-[#F59E0B]" />
                  <span>{founder.email}</span>
                </a>
                <a
                  href={`tel:${founder.phone}`}
                  className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors group"
                >
                  <Phone size={16} className="text-[#10B981]" />
                  <span>{founder.phone}</span>
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="relative w-10 h-10 rounded-xl glass flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors duration-300 group"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={18} />
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${social.color}20, ${social.color}05)`,
                        border: `1px solid ${social.color}30`,
                      }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Bio, Quote & Stats (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Bio paragraphs */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {founder.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeInUp}
                  className="text-[#94A3B8] leading-relaxed text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 md:p-8 relative"
            >
              {/* Quote mark decoration */}
              <div className="absolute -top-4 left-6 font-display text-6xl font-bold text-[#10B981]/20 select-none">
                &ldquo;
              </div>
              <blockquote className="relative z-10">
                <p className="text-white/90 text-lg italic leading-relaxed font-light">
                  {founder.quote}
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-px bg-[#F59E0B]" />
                  <cite className="text-[#F59E0B] text-sm font-semibold not-italic">
                    {founder.name}
                  </cite>
                </footer>
              </blockquote>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {founderStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="glass-card rounded-2xl p-4 text-center hover:border-white/15 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      border: `1px solid ${stat.color}20`,
                    }}
                  >
                    <stat.icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div className="font-display text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-[#94A3B8] text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
