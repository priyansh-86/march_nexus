'use client';

/**
 * ============================================================
 * WeCaterToSection Component
 * ============================================================
 * Displays the types of businesses/customers that Nexus Consumer Care serves.
 * Data extracted from the company's official WhatsApp promotional images.
 *
 * HOW TO EDIT:
 * - Add/remove client types in the `clientTypes` array below
 * - Change icons, titles, or descriptions as needed
 * - Adjust section heading/subheading text
 * ============================================================
 */

import { motion } from 'framer-motion';
import { Package, Store, RefreshCw, Briefcase, Rocket, ShoppingBag } from 'lucide-react';

/* --------------------------------------------------------
   Client Types Data — EDIT THIS to change who you serve
   Each entry needs: icon (lucide-react), title, description, color (hex)
   -------------------------------------------------------- */
const clientTypes = [
  {
    icon: Package,
    title: 'Wholesalers',
    description: 'Bulk supply at competitive wholesale rates with consistent quality across every batch.',
    color: '#10B981',
  },
  {
    icon: Store,
    title: 'Resellers',
    description: 'Flexible ordering and margin-friendly pricing to help resellers maximize their profits.',
    color: '#F59E0B',
  },
  {
    icon: RefreshCw,
    title: 'Repackers',
    description: 'Loose and packaged formats available — ideal for repackaging under your own brand.',
    color: '#34D399',
  },
  {
    icon: Briefcase,
    title: 'Small Business Owners',
    description: 'Low minimum order quantities designed for small businesses to start without heavy investment.',
    color: '#059669',
  },
  {
    icon: Rocket,
    title: 'Startups',
    description: 'Launching your own cleaning product brand? We guide and support you every step of the way.',
    color: '#6EE7B7',
  },
  {
    icon: ShoppingBag,
    title: 'Soap Centers',
    description: 'Dedicated supply for soap centers and retail outlets with reliable delivery timelines.',
    color: '#F59E0B',
  },
];

export default function WeCaterToSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="we-cater-to">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0B1216] to-[#070B0E]" />
      <div
        className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.03) 0%, transparent 70%)' }}
      />

      {/* Section divider */}
      <div className="section-divider mb-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">
              Who We Serve
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            We <span className="gradient-text-fire">Cater To</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From large wholesalers to ambitious startups — we provide quality cleaning products
            and reliable support for every type of business partner.
          </motion.p>
        </div>

        {/* Client Type Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientTypes.map((client, i) => (
            <motion.div
              key={client.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group cursor-default"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${client.color}15`,
                  border: `1px solid ${client.color}20`,
                }}
              >
                <client.icon size={22} style={{ color: client.color }} />
              </div>
              {/* Title */}
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {client.title}
              </h3>
              {/* Description */}
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {client.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
