'use client';

import PageLayout from '@/components/nexus/PageLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Droplets, Package, SprayCan, CheckCircle2, Shield, Leaf, Zap } from 'lucide-react';

const categories = [
  {
    id: 'total-care-plus',
    title: 'Total Care Plus',
    subtitle: 'Detergent Liquid',
    icon: Droplets,
    image: '/images/nexus/liquid-detergent.png',
    color: '#10B981',
    description: 'Our flagship detergent liquid — available in 250ml, 200ml, 150ml, and 100ml sizes. Comes in both loose and packaged formats, perfect for wholesalers, resellers, and retail distribution across India.',
    features: ['Enzymatic stain-fighting formula', 'Available in 4 pack sizes (100ml–250ml)', 'Loose & Packaged options', 'Consistent quality across every batch'],
    stats: { cleaning: 95, fabric: 98, value: 97 },
    variants: ['250ml Packaged', '200ml Packaged', '150ml Packaged', '100ml Packaged', 'Loose (Bulk)'],
  },
  {
    id: 'floor-cleaner',
    title: 'Total Care',
    subtitle: 'Floor / Multi Surface Cleaner',
    icon: SprayCan,
    image: '/images/nexus/floor-cleaner.png',
    color: '#F59E0B',
    description: 'Hospital-grade floor and multi-surface cleaner effective against 99.9% germs. Available in multiple fragrance options in both packaged and loose formats for every business need.',
    features: ['99.9% germ kill rate', 'Safe on all floor types', 'Multiple fragrance options', 'Loose & Packaged formats'],
    stats: { germKill: 99, surface: 97, fragrance: 94 },
    variants: ['Jasmine', 'Rose', 'Lavender', 'Citrus', 'Anti-Bacterial'],
  },
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#94A3B8] text-xs w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
          initial={{ width: 0 }} whileInView={{ width: `${value}%` }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }} />
      </div>
      <span className="text-xs font-bold text-white w-10 text-right">{value}%</span>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0A1215] to-[#070B0E]" />
        <motion.div className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">Product Catalogue</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our Product <span className="gradient-text-fire">Range</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Premium cleaning solutions engineered for performance and value.
            Available in both loose and packaged formats for businesses of all sizes.
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="relative py-24">
        <div className="section-divider mb-24" />
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {categories.map((product, idx) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              style={{ direction: 'ltr' }}>
              {/* Image */}
              <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="glass-card rounded-3xl overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={product.image} alt={product.title} fill className="object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
                        <product.icon size={14} style={{ color: product.color }} />
                        <span className="text-xs font-medium text-white">{product.subtitle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-4"
                  style={{ backgroundColor: `${product.color}15`, color: product.color, border: `1px solid ${product.color}25` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color }} />
                  {product.id.replace('-', ' ')}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{product.title}</h2>
                <p className="text-[#94A3B8] leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <CheckCircle2 size={14} style={{ color: product.color }} className="shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-6">
                  {Object.entries(product.stats).map(([key, val]) => (
                    <StatBar key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={val as number} color={product.color} />
                  ))}
                </div>

                {/* Variants */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#94A3B8] mb-2 font-medium">Available Variants</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <span key={v} className="text-xs px-3 py-1.5 rounded-full glass text-[#94A3B8]">{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 md:p-14 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Need a Custom Formulation?</h2>
            <p className="text-[#94A3B8] text-lg mb-8 max-w-lg mx-auto">
              Our R&D team can develop bespoke products tailored to your exact requirements —
              from fragrance to concentration to packaging.
            </p>
            <a href="/contact" className="magnetic-btn inline-flex px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-shadow">
              Discuss Custom Products
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
