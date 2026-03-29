/**
 * @file AboutSection.tsx
 * @description
 * AboutSection — A visually rich company overview section that displays key business
 * metrics (cards), a scroll-driven parallax background, and a call-to-action banner.
 * It is rendered as a full-width `<section>` with id="about" for anchor navigation.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  HOW TO CUSTOMISE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  ▸ ADD / EDIT / REMOVE METRIC CARDS
 *    The metric cards are driven by the `metrics` array defined below (lines ~58-73).
 *    Each entry is an object with the shape:
 *      {
 *        icon   : <LucideIcon>   — Import from 'lucide-react' and place the component ref here.
 *        value  : string         — The large headline number/text shown on the card (e.g. '17+').
 *        label  : string         — The short uppercase label beneath the value (e.g. 'Years of Trust').
 *        description : string    — One-sentence explanation shown below the label.
 *        color  : string         — Hex colour used for the icon background tint, value text, and
 *                                  hover glow. Example: '#10B981'.
 *      }
 *    • To ADD a card: push a new object into the `metrics` array.
 *    • To REMOVE a card: delete or splice the object from the array.
 *    • To EDIT a card: change any of the fields above in-place.
 *    Note: The grid auto-flows into 1 → 2 → 3 columns depending on viewport width
 *    (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3). If you need 4 columns on desktop,
 *    change `lg:grid-cols-3` to `lg:grid-cols-4`.
 *
 *  ▸ CHANGE THE CTA BUTTON TEXT
 *    Find the `<motion.button>` near the bottom of the file (inside the CTA banner div).
 *      - Change "Partner With Us" to your desired label.
 *      - The button smooth-scrolls to the #contact section on click. To change the
 *        scroll target, update `document.querySelector('#contact')` to another section id.
 *
 *  ▸ CHANGE COLORS PER CARD
 *    Each metric object has a `color` field (hex string). This colour is used for:
 *      1. The faint background tint of the icon container (opacity 0.15).
 *      2. The icon stroke colour.
 *      3. The large metric value text colour.
 *      4. The hover glow shadow around the icon.
 *    Simply change the hex value to re-theme individual cards.
 *
 *  ▸ CHANGE THE SECTION BACKGROUND / GRADIENT
 *    The parallax background uses a three-stop gradient:
 *      from-[#070B0E] via-[#0A1218] to-[#070B0E]
 *    and a subtle radial glow (emerald tint). Edit these Tailwind classes / inline
 *    styles to adjust the atmosphere.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, TrendingUp, Users, Award, Leaf, Globe } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
 * METRICS DATA
 * ──────────────────────────────────────────────────────────────────────────
 * Edit this array to add, remove, or modify the metric cards displayed in the
 * about section grid. Each object maps directly to one MetricCard instance.
 *
 * Available icon imports from 'lucide-react' (add more as needed):
 *   Shield, Factory, Truck, Award, Users, Globe, Zap, Star, Target, etc.
 */
const metrics = [
  { icon: Shield, value: '17+', label: 'Years of Trust', description: 'Over 17 years building cleaning products and lasting business relationships across India.', color: '#10B981' },
  { icon: TrendingUp, value: 'Best', label: 'Wholesale Prices', description: 'Best prices with margin flexibility — designed to help your business grow profitably.', color: '#F59E0B' },
  { icon: Users, value: 'Low', label: 'Minimum Order Qty', description: 'Low minimum order quantity so you can start small and scale as your business grows.', color: '#34D399' },
  { icon: Award, value: 'Strong', label: 'Repeat Customers', description: 'Strong repeat customer rate — our quality speaks for itself through loyal partnerships.', color: '#6EE7B7' },
  { icon: Leaf, value: 'Safe', label: '& Effective', description: 'Safe and effective home cleaning products with zero side effects for every family.', color: '#059669' },
  { icon: Globe, value: '500+', label: 'Happy Partners', description: 'Trusted by wholesalers, resellers, repackers, startups, and soap centers nationwide.', color: '#10B981' },
];

/* ──────────────────────────────────────────────────────────────────────────
 * MetricCard (internal component)
 * ──────────────────────────────────────────────────────────────────────────
 * Renders a single metric tile with a glass-card appearance, icon badge,
 * large value, label, and description.
 *
 * Props:
 *   metric — one element from the `metrics` array.
 *   index  — zero-based position in the grid; used to stagger the entrance
 *            animation (index * 0.1s delay).
 *
 * Animation behaviour:
 *   • Fades in + slides up + scales from 0.95 → 1 when the card scrolls
 *     into view (useInView with once: true).
 *   • Stagger delay = index * 0.1s so cards cascade nicely.
 *
 * To customise the card appearance:
 *   • Icon container size → change `w-12 h-12`.
 *   • Value font size → change `text-3xl md:text-4xl`.
 *   • Card padding → change `p-6`.
 *   • Hover border opacity → change `hover:border-white/15`.
 *   • Hover shadow → change the `hover:shadow-[...]` value.
 */
function MetricCard({ metric, index }: { metric: (typeof metrics)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = metric.icon;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} className="card-3d group">
      {/* Glass card container — rounded corners, subtle border, hover shadow */}
      <div className="glass-card rounded-2xl p-6 h-full transition-all duration-500 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">

        {/* Icon badge — background tint + icon with hover glow */}
        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
          {/* Faint background fill derived from metric.color at 15 % opacity */}
          <div className="absolute inset-0 rounded-xl opacity-15" style={{ backgroundColor: metric.color }} />
          {/* The Lucide icon rendered in metric.color */}
          <Icon size={22} style={{ color: metric.color }} className="relative z-10" />
          {/* Hover glow ring — invisible by default, fades in on group hover */}
          <motion.div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: `0 0 30px ${metric.color}33` }} />
        </div>

        {/* Large metric value — coloured with metric.color, fades in after card entrance */}
        <motion.div className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color: metric.color }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}>
          {metric.value}
        </motion.div>

        {/* Short uppercase label */}
        <h3 className="text-white font-semibold text-sm mb-2 tracking-wide uppercase">{metric.label}</h3>

        {/* Description paragraph */}
        <p className="text-[#94A3B8] text-sm leading-relaxed">{metric.description}</p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * AboutSection (default export)
 * ──────────────────────────────────────────────────────────────────────────
 * Full-page section with:
 *   1. Scroll-driven parallax background (gradient + radial glow).
 *   2. Section divider line.
 *   3. Centred heading block (pill badge, title, subtitle).
 *   4. Responsive grid of MetricCards.
 *   5. CTA banner at the bottom.
 */
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll Parallax ──────────────────────────────────────────────────
   * useScroll tracks the vertical scroll position relative to this section.
   * scrollYProgress goes from 0 → 1 as the section scrolls through the viewport.
   * useTransform maps that progress to a Y-offset (-60px max), creating a
   * subtle parallax drift on the background layer.
   *
   * To increase / decrease the parallax distance, change the [-60] value
   * in useTransform (e.g. [-120] for more drift, [-30] for less).
   */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="about" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">

      {/* ── Parallax Background Layer ───────────────────────────────────
       * This div moves vertically as the user scrolls (controlled by bgY).
       * It contains:
       *   • A three-stop vertical gradient (dark tones).
       *   • A large elliptical radial glow (emerald tint) centred at the top.
       *
       * Edit the gradient stops or radial-gradient colours to change
       * the overall section atmosphere.
       */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0A1218] to-[#070B0E]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Decorative horizontal divider */}
      <div className="section-divider mb-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section Header ────────────────────────────────────────────
         * Pill badge → heading → subtitle paragraph, all with staggered
         * fade-in-from-below animations triggered by whileInView.
         *
         * To change the heading text, edit the <h2> children.
         * The `<span className="gradient-text-ocean">` applies an ocean-
         * coloured gradient to the highlighted phrase.
         */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">About Nexus Consumer Care</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built on Trust. <span className="gradient-text-ocean">Backed by Quality.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }} className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
            Over 17 years of manufacturing excellence. We cater to wholesalers, resellers, repackers, small business owners, startups, and soap centers — providing consistent quality at the best wholesale prices.
          </motion.p>
        </div>

        {/* ── Metrics Grid ──────────────────────────────────────────────
         * Responsive grid: 1 col on mobile, 2 on sm, 3 on lg.
         * Iterates over the `metrics` array and renders a MetricCard for each.
         *
         * To change the number of columns:
         *   • `lg:grid-cols-3` → `lg:grid-cols-2` or `lg:grid-cols-4`, etc.
         * To change the gap between cards:
         *   • Adjust `gap-5 md:gap-6`.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
        </div>

        {/* ── CTA Banner ────────────────────────────────────────────────
         * A full-width glass card at the bottom of the section containing:
         *   • Headline text ("Ready to Scale Your Brand?")
         *   • Supporting paragraph
         *   • A gradient "Partner With Us" button that smooth-scrolls to #contact
         *
         * CUSTOMISATION GUIDE:
         *   • Headline → edit the <h3> text.
         *   • Description → edit the <p> text.
         *   • Button label → change "Partner With Us".
         *   • Button colour → change the gradient classes
         *     `from-[#F59E0B] to-[#FBBF24]` (amber) to your preferred palette.
         *   • Button target → change '#contact' inside the onClick handler.
         *   • Button hover glow → adjust the `hover:shadow-[...]` value.
         */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 md:mt-20 glass-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Ready to Partner With Us?</h3>
            <p className="text-[#94A3B8]">Whether you're growing your retail network or launching your own brand — we're here to support you.</p>
          </div>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full whitespace-nowrap hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-shadow"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
