/**
 * @file ProductShowcase.tsx
 * @description
 * ProductShowcase — A product catalogue section that renders interactive product cards
 * with a 3D mouse-tracking tilt effect and animated SVG progress rings showing
 * per-product performance statistics. The section includes a header block and a
 * responsive grid of ProductCard components.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 *  HOW TO CUSTOMISE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  ▸ ADD / REMOVE / EDIT PRODUCTS
 *    Products are defined in the `products` array (see below, ~lines 60-100).
 *    Each entry follows the `Product` interface:
 *      {
 *        id          : string   — Unique identifier used as the React key.
 *        title       : string   — Main product name (e.g. 'Liquid Detergent').
 *        subtitle    : string   — Short tagline shown in the image badge.
 *        description : string   — Longer paragraph below the title.
 *        image       : string   — Path to the product image (relative to /public).
 *        icon        : LucideIcon — Import from 'lucide-react' and assign here.
 *        color       : string   — Hex colour for accents, rings, and glow effects.
 *        stats       : { label: string; value: number }[] — Array of 3 stat objects
 *                                  shown as ProgressRing components. `value` is 0-100.
 *      }
 *    • To ADD a product: push a new Product-shaped object into the array.
 *    • To REMOVE a product: delete or splice the object from the array.
 *    • To EDIT a product: change any field in-place.
 *    Note: The grid is 1 col (mobile) → 2 cols (md) → 3 cols (lg). If you add
 *    more than 3 products the grid will wrap into additional rows automatically.
 *    For 4+ columns change `lg:grid-cols-3` to the desired count.
 *
 *  ▸ CHANGE PRODUCT IMAGES
 *    Update the `image` field for each product object. Images are served from
 *    the `/public` directory, so a value of '/images/nexus/liquid-detergent.png'
 *    corresponds to `public/images/nexus/liquid-detergent.png`.
 *    Supported formats: PNG, JPG, WebP, AVIF (browser-dependent).
 *    The image is rendered with `object-cover` inside a 224px / 256px tall
 *    container (h-56 md:h-64) and zooms to 110 % on card hover.
 *
 *  ▸ MODIFY THE PROGRESS RING STATS
 *    Each product has a `stats` array of objects: `{ label: string; value: number }`.
 *      • `label` — short stat name shown below the ring (e.g. 'Cleaning Power').
 *      • `value` — integer 0-100, represents the percentage the ring fills to.
 *    You may add more than 3 stats, but the card width may need adjustment for
 *    legibility. The ring size (w-20 h-20) and stroke width (4) can be changed
 *    inside the ProgressRing component below.
 *
 *  ▸ ADJUST THE 3D TILT SENSITIVITY
 *    The tilt effect is calculated inside `handleMouseMove` in ProductCard.
 *    The current multipliers are **15** degrees max rotation on each axis:
 *      x: ((mouseY ratio) - 0.5) * -15   → up to ±15° around X
 *      y: ((mouseX ratio) - 0.5) *  15   → up to ±15° around Y
 *    To make the tilt MORE aggressive, increase 15 → 20 or 25.
 *    To make it SUBTLER, decrease 15 → 8 or 10.
 *    The spring physics are controlled by:
 *      damping: 20   — lower = bouncier, higher = stiffer
 *      stiffness: 200 — higher = snappier return, lower = more lag
 *
 *  ▸ CHANGE THE SECTION BACKGROUND
 *    The section uses a three-stop gradient:
 *      from-[#070B0E] via-[#080F13] to-[#070B0E]
 *    plus a subtle radial glow. Edit these classes / styles to re-theme.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Droplets, Package, SprayCan, Download } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
 * Product Interface
 * ──────────────────────────────────────────────────────────────────────────
 * TypeScript interface defining the shape of each product entry in the
 * `products` array. Every field is required.
 *
 * To extend the data model (e.g. add price, link, badge), add new optional
 * or required properties here and then update the products array accordingly.
 */
interface Product {
  id: string; title: string; subtitle: string; description: string; image: string;
  icon: typeof Droplets; color: string; stats: { label: string; value: number }[];
}

/* ──────────────────────────────────────────────────────────────────────────
 * PRODUCTS DATA
 * ──────────────────────────────────────────────────────────────────────────
 * Static array of product objects. Edit this array to add, remove, or modify
 * the products displayed in the showcase grid.
 *
 * Icon imports currently used: Droplets, Package, SprayCan (from lucide-react).
 * Add more icons by importing them at the top of the file.
 *
 * Stats `value` must be between 0 and 100 (displayed as a percentage ring).
 */
const products: Product[] = [
  {
    id: 'detergent-liquid',
    title: 'Total Care Plus',
    subtitle: 'Detergent Liquid',
    description: 'Premium enzymatic detergent liquid available in 250ml, 200ml, 150ml, and 100ml sizes. Comes in both loose and packaged options — perfect for wholesalers, resellers, and retail distribution.',
    image: '/images/nexus/liquid-detergent.png',
    icon: Droplets,
    color: '#10B981',
    stats: [{ label: 'Stain Removal', value: 95 }, { label: 'Fabric Safety', value: 98 }, { label: 'Value for Money', value: 97 }],
  },
  {
    id: 'floor-cleaner',
    title: 'Total Care',
    subtitle: 'Floor / Multi Surface Cleaner',
    description: 'Hospital-grade floor and multi-surface cleaner available in multiple fragrance options. Packaged and loose formats for every business need. Effective against 99.9% germs.',
    image: '/images/nexus/floor-cleaner.png',
    icon: SprayCan,
    color: '#F59E0B',
    stats: [{ label: 'Germ Kill', value: 99 }, { label: 'Surface Safety', value: 97 }, { label: 'Fragrance', value: 94 }],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 * ProgressRing (internal component)
 * ──────────────────────────────────────────────────────────────────────────
 * An animated SVG circular progress indicator that fills to `value` % when it
 * scrolls into view.
 *
 * Props:
 *   value : number (0-100) — The percentage the ring should fill.
 *   label : string         — Short label displayed below the ring.
 *   color : string         — Hex colour for the progress stroke and glow.
 *   delay : number         — Seconds to wait before the fill animation starts
 *                            (used for staggered entrance across multiple rings).
 *
 * SVG construction:
 *   • viewBox    = "0 0 80 80"  (80×80 coordinate system).
 *   • radius     = 32           → diameter 64, leaving 8px padding all around.
 *   • circumference = 2 × π × 32 ≈ 201.06.
 *   • The background track circle is drawn first (low-opacity white).
 *   • The foreground progress circle uses strokeDasharray = circumference and
 *     animates strokeDashoffset from circumference (empty) → offset (filled).
 *
 * CUSTOMISATION:
 *   • Ring size   → change radius (and adjust circumference calc accordingly).
 *   • Stroke width → change strokeWidth="4" on both circles.
 *   • Animation speed → change `duration: 1.5` in the motion.circle transition.
 *   • Glow colour  → the drop-shadow filter uses `${color}66` (40 % alpha).
 */
function ProgressRing({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Outer container sized to match the SVG viewBox */}
      <div className="relative w-20 h-20">
        {/* SVG rotated -90° so the stroke starts from the top (12 o'clock) */}
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          {/* Background track — faint circle showing the full ring outline */}
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          {/* Foreground progress arc — animates from empty to filled on scroll-in */}
          <motion.circle cx="40" cy="40" r={radius} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }} viewport={{ once: true }}
            transition={{ duration: 1.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}66)` }} />
        </svg>
        {/* Centre percentage label — fades in after the ring starts animating */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="text-sm font-bold text-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: delay + 0.5 }}>{value}%</motion.span>
        </div>
      </div>
      {/* Stat label beneath the ring */}
      <span className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wider text-center leading-tight">{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * ProductCard (internal component)
 * ──────────────────────────────────────────────────────────────────────────
 * Renders a single product tile with:
 *   1. Scroll-triggered entrance animation (fade + slide up).
 *   2. 3D tilt on mouse hover (perspective-based rotateX/rotateY).
 *   3. Product image with hover zoom.
 *   4. Icon badge overlay on the image.
 *   5. Title, description, and a row of ProgressRing stat indicators.
 *
 * Props:
 *   product — one element from the `products` array.
 *   index  — zero-based position; used to stagger the entrance animation
 *            (index * 0.15s delay).
 *
 * 3D TILT MECHANISM:
 *   • The outer div sets `perspective: '1000px'` to enable 3D transforms.
 *   • `handleMouseMove` computes the cursor position as a ratio (0-1) within
 *     the card bounds, then maps it to ±15° rotation.
 *   • On mouse-leave, tilt resets to { x: 0, y: 0 }.
 *   • A spring transition (damping: 20, stiffness: 200) gives a natural feel.
 *
 * To customise:
 *   • Image container height → change `h-56 md:h-64`.
 *   • Image hover zoom level → change `group-hover:scale-110`.
 *   • Card padding → change `p-6 md:p-8`.
 *   • 3D tilt max angle → change the 15 multiplier in handleMouseMove.
 *   • Spring stiffness/damping → change in the animate transition object.
 */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = product.icon;

  /* ── 3D Tilt: Mouse Tracking ─────────────────────────────────────────
   * Calculates the cursor's normalised position within the card (0 → 1)
   * and maps it to rotation angles:
   *   x-axis: (vertical position) → rotateX (positive = tilt away at top)
   *   y-axis: (horizontal position) → rotateY (positive = tilt right at right)
   *
   * The `* -15` and `* 15` multipliers control maximum tilt in degrees.
   * Increase for a more dramatic effect; decrease for subtlety.
   */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -15, y: ((e.clientX - rect.left) / rect.width - 0.5) * 15 });
  }, []);

  return (
    /* Outer wrapper — entrance animation + mouse event listeners + perspective context */
    <motion.div ref={cardRef} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }} className="group"
      onMouseEnter={() => setIsHovered(true)} onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }} style={{ perspective: '1000px' }}>

      {/* Inner card — applies rotateX/Y tilt and dynamic shadow via spring animation */}
      <motion.div className="glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/15"
        animate={{
          rotateX: tilt.x, rotateY: tilt.y,
          boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${product.color}15` : '0 8px 32px rgba(0,0,0,0.3)',
        }} transition={{ type: 'spring', damping: 20, stiffness: 200 }} style={{ transformStyle: 'preserve-3d' }}>

        {/* ── Product Image Area ─────────────────────────────────────── */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          {/* Bottom gradient overlay for text readability over image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070B0E]/80 z-10" />
          {/* Product image — zooms to 110 % on group hover */}
          <motion.img src={product.image} alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          {/* Icon badge — positioned top-left over the image */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <Icon size={14} style={{ color: product.color }} />
            <span className="text-xs font-medium text-white">{product.subtitle}</span>
          </div>
        </div>

        {/* ── Product Info Area ──────────────────────────────────────── */}
        <div className="p-6 md:p-8">
          {/* Product title — pushed forward in 3D space (translateZ) */}
          <motion.h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3" style={{ transform: 'translateZ(30px)' }}>{product.title}</motion.h3>
          {/* Product description */}
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{product.description}</p>

          {/* ── Download Price List Button ─────────────────────────────
           * Opens the price list PDF in a new tab for download.
           * To change the PDF file: replace /price-list.pdf with your own file path.
           * To change button text: edit the label text below.
           */}
          <motion.a
            href="/price-list.pdf"
            download="Nexus-Price-List.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 mb-4 hover:shadow-lg"
            style={{
              backgroundColor: `${product.color}18`,
              color: product.color,
              border: `1px solid ${product.color}30`,
            }}
            whileHover={{ scale: 1.04, backgroundColor: `${product.color}28` }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={14} />
            Download Price List
          </motion.a>

          {/* ── Stats Row with Progress Rings ───────────────────────────
           * Displays one ProgressRing per stat in the product's stats array.
           * The row fades in more prominently on hover (opacity 0.7 → 1).
           * Rings are spaced evenly with `justify-around`.
           *
           * To change the delay between rings, adjust `i * 0.15`.
           */}
          <motion.div className="flex items-center justify-around pt-4 border-t border-white/5"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: isHovered ? 1 : 0.7, height: 'auto' }} transition={{ duration: 0.4 }}>
            {product.stats.map((stat, i) => <ProgressRing key={stat.label} value={stat.value} label={stat.label} color={product.color} delay={i * 0.15} />)}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * ProductShowcase (default export)
 * ──────────────────────────────────────────────────────────────────────────
 * Full-width section (<section id="products">) that renders:
 *   1. Static gradient background with a subtle radial glow.
 *   2. Decorative section divider.
 *   3. Centred header block (pill badge, title, subtitle).
 *   4. Responsive grid of ProductCard components.
 */
export default function ProductShowcase() {
  return (
    <section id="products" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient + radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#080F13] to-[#070B0E]" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)' }} />
      {/* Decorative divider */}
      <div className="section-divider mb-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section Header ────────────────────────────────────────────
         * Pill badge → heading → subtitle, all with staggered whileInView
         * fade-in-from-below animations.
         *
         * To change the heading text, edit the <h2> children.
         * The `<span className="gradient-text-fire">` applies a fire-themed
         * gradient to the highlighted phrase.
         */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">Our Product Range</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Formulated for <span className="gradient-text-fire">Excellence</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }} className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
            Every product is engineered with precision, tested rigorously, and crafted to deliver outstanding cleaning performance.
          </motion.p>
        </div>

        {/* ── Products Grid ─────────────────────────────────────────────
         * Responsive grid: 1 col (mobile) → 2 cols (md) → 3 cols (lg).
         * Iterates over the `products` array and renders a ProductCard for each.
         *
         * To change columns: adjust `md:grid-cols-2 lg:grid-cols-3`.
         * To change gap: adjust `gap-6 md:gap-8`.
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </div>
    </section>
  );
}
