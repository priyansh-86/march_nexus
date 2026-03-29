/**
 * @file HeroSection.tsx
 * @component HeroSection
 * @description
 * Full-viewport cinematic hero section with multiple layered visual effects:
 *   - **Parallax scrolling** — text, background splash, and content scale
 *     independently as the user scrolls down.
 *   - **Floating gradient orbs** — three large, softly pulsing radial-gradient
 *     circles that drift gently, creating atmospheric depth.
 *   - **Water-ripple rings** — three concentric expanding circles emanating
 *     from the center, simulating a ripple effect.
 *   - **Particle canvas** — a dedicated `<ParticleCanvas />` component renders
 *     animated floating particles for a premium, high-tech feel.
 *   - **Background splash image** — a hero image (`hero-splash.png`) with a
 *     parallax offset and dark overlay gradient.
 *   - **Animated headline** — each word of the title animates in with a
 *     staggered 3D flip effect; highlighted words use a gradient text style.
 *   - **Dual CTA buttons** — primary (gold gradient) and secondary (glass)
 *     action buttons.
 *   - **Scroll-down indicator** — a bouncing arrow at the bottom.
 *   - **Bottom fade gradient** — smooth transition into the next section.
 *
 * ──────────────────────────────────────────────
 * HOW TO EDIT THIS COMPONENT
 * ──────────────────────────────────────────────
 *
 * 📌 CHANGE THE HEADLINE TEXT
 *    Edit the `titleWords` array (around line 54). Each element is one
 *    word that animates independently. You can add or remove words freely.
 *    Note: `highlightIndices` specifies which word indices get the
 *    `gradient-text-ocean` class instead of plain white.
 *
 * 📌 CHANGE CTA BUTTONS
 *    There are two buttons (primary + secondary):
 *      • Primary — gold gradient "Start Your Project", scrolls to `#contact`.
 *      • Secondary — glass outline "Explore Products", scrolls to `#products`.
 *    Edit the button text, gradient classes, or `scrollIntoView` target
 *    to customize.
 *
 * 📌 CHANGE THE BACKGROUND IMAGE
 *    Look for `hero-splash.png` in the splash image block (around line 105).
 *    Replace the path inside `backgroundImage: 'url(...)'` with your own
 *    image. The file should live in `/public/images/nexus/`.
 *    Adjust the overlay gradient opacity if the new image has different
 *    brightness requirements.
 *
 * 📌 ADJUST PARALLAX INTENSITY
 *    The scroll-linked transforms are defined near the top of the component:
 *      • `textY`     — vertical text offset on scroll (default [0, -150])
 *      • `opacity`   — text fade-out range (default [0, 0.6] → [1, 0])
 *      • `scale`     — content shrink on scroll (default [1, 0.9])
 *      • `splashY`   — background image parallax (default [0, 100])
 *      • `splashScale` — background zoom (default [1, 1.15])
 *    Modify the second value in each array to increase or decrease the effect.
 *
 * 📌 ADJUST FLOATING ORBS
 *    Three motion.div orbs are rendered inside the orb container. Each has
 *    unique size, colour, position, animation keyframes, and duration.
 *    To tweak:
 *      • Size: change the `w-[600px] h-[600px]` classes.
 *      • Colour: edit the `rgba(r,g,b,a)` values in the radial gradient.
 *      • Speed: change `duration` in the transition config.
 *      • Motion path: edit the keyframe arrays in `animate={{ ... }}`.
 *
 * 📌 ADJUST WATER RIPPLES
 *    The ripple section renders 3 expanding rings via `[...Array(3)].map(...)`.
 *    Change the `Array(3)` count for more/fewer rings. Each ring's max
 *    size is `800 + i * 200` and duration is `6` seconds with `delay: i * 2`.
 *    The `border-[#10B981]/10` class controls the ring colour/opacity.
 */
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

export default function HeroSection() {
  // ── Ref for scroll tracking ────────────────────────────────────────
  // `containerRef` is attached to the outer <section> so that
  // `useScroll` tracks how far the hero is scrolled through the viewport.
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Parallax scroll transforms ─────────────────────────────────────
  // `scrollYProgress` goes from 0 (hero fully in view) to 1 (hero fully
  // scrolled past). Each `useTransform` maps that progress to a specific
  // CSS property on the corresponding element.
  //
  // ✏️ HOW TO EDIT PARALLAX:
  //   Adjust the second number in each range array to control intensity.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  /** Vertical text offset: moves text upward as user scrolls. */
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  /** Text opacity: fades out between 0 % and 60 % scroll progress. */
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /** Content scale: gently shrinks to 90 % by the time hero is gone. */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  /** Background splash image: drifts downward (parallax lag effect). */
  const splashY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  /** Background splash image: zooms in slightly for a cinematic feel. */
  const splashScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  /**
   * Headline words — each word animates in separately.
   *
   * ✏️ HOW TO EDIT:
   *   Add, remove, or reorder words in this array.
   *   Adjust `highlightIndices` to choose which words get the
   *   gradient highlight style (ocean gradient).
   */
  const titleWords = ['Quality', 'You', 'Trust.', 'Scale', 'You', 'Need.'];

  /**
   * Indices of words that receive the `gradient-text-ocean` class.
   * Indices are 0-based, matching positions in `titleWords`.
   */
  const highlightIndices = [0, 3];

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/*
        ── BASE BACKGROUND GRADIENT ────────────────────────────────
        A dark vertical gradient that serves as the bottom-most layer.
        ✏️ HOW TO EDIT: Change the hex colours in `from-[#070B0E]` etc.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0A1215] to-[#070B0E]" />

      {/*
        ── FLOATING GRADIENT ORBS ──────────────────────────────────
        Three large, soft radial-gradient circles that float gently
        using Framer Motion infinite keyframe animations. They add
        atmospheric depth and subtle colour to the dark background.
        Each orb has a unique size, colour tint, position, and
        animation timing to avoid looking repetitive.
        ✏️ HOW TO EDIT: See the top-of-file guide for orb customization.
      */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1 — large green, top-left area */}
        <motion.div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Orb 2 — medium amber, bottom-right area */}
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)' }}
          animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Orb 3 — very large subtle emerald, center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/*
        ── WATER RIPPLE RINGS ──────────────────────────────────────
        Three concentric expanding circles that emanate from the center
        of the hero, simulating a water-ripple / sonar-pulse effect.
        Each ring starts small and expands while fading to transparent,
        staggered by 2 seconds.
        ✏️ HOW TO EDIT:
          • Ring count: change `Array(3)` to `Array(N)`.
          • Max size: edit `800 + i * 200`.
          • Duration / delay: change `duration: 6` and `delay: i * 2`.
          • Ring colour: change `border-[#10B981]/10`.
          • Initial opacity: change `opacity: 0.3` / `opacity: [0.15, 0]`.
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#10B981]/10"
            initial={{ width: 100, height: 100, opacity: 0.3 }}
            animate={{ width: [100, 800 + i * 200], height: [100, 800 + i * 200], opacity: [0.15, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/*
        ── PARTICLE CANVAS ─────────────────────────────────────────
        Renders the animated floating particle system on a dedicated
        canvas element. See `ParticleCanvas.tsx` for particle-specific
        configuration (count, size, colour, speed).
      */}
      <ParticleCanvas />

      {/*
        ── BACKGROUND SPLASH IMAGE (parallax) ──────────────────────
        A hero background image that moves slower than the scroll
        (parallax lag) and gently zooms in, creating depth.
        A dark gradient overlay sits on top to ensure text readability.
        Opacity is set to 0.2 so it remains subtle.

        ✏️ HOW TO EDIT:
          • Image path: change `url(/images/nexus/hero-splash.png)`.
          • Opacity: change `opacity-20` on the parent motion.div.
          • Overlay darkness: adjust the `/60` and `/80` alpha values in
            the gradient overlay.
      */}
      <motion.div className="absolute inset-0 z-[1] opacity-20" style={{ y: splashY, scale: splashScale }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/nexus/hero-splash.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E]/60 via-[#070B0E]/80 to-[#070B0E]" />
      </motion.div>

      {/*
        ── MAIN CONTENT (headline, subtitle, CTAs) ─────────────────
        All text content is wrapped in a motion.div that receives the
        parallax `textY`, `opacity`, and `scale` transforms, so
        everything moves and fades together as one unit.
      */}
      <motion.div className="relative z-10 text-center max-w-5xl mx-auto px-6" style={{ y: textY, opacity, scale }}>

        {/*
          ── TOP BADGE ─────────────────────────────────────────────
          A pill-shaped badge above the headline with sparkle icons.
          ✏️ HOW TO EDIT: Change the text inside <span> or swap
          the Sparkles icon for a different lucide-react icon.
        */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles size={14} className="text-[#F59E0B]" />
          <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">Manufacturers &amp; Wholesalers of Cleaning Products</span>
          <Sparkles size={14} className="text-[#F59E0B]" />
        </motion.div>

        {/*
          ── ANIMATED HEADLINE ─────────────────────────────────────
          Each word in `titleWords` animates in with a staggered 3D
          flip effect (opacity + translateY + rotateX). Words at
          indices listed in `highlightIndices` get the ocean-gradient
          text style.

          ✏️ HOW TO EDIT:
            • Words: edit `titleWords` array (defined above).
            • Highlighted words: edit `highlightIndices`.
            • Stagger delay: change `delay: 0.5 + i * 0.12`.
            • Flip angle: change `rotateX: -40`.
            • Text size: adjust the responsive classes
              `text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl`.
        */}
        <h1 className="font-display leading-[0.95] mb-8">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold ${
                  highlightIndices.includes(i) ? 'gradient-text-ocean' : 'text-white'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/*
          ── SUBTITLE / TAGLINE ────────────────────────────────────
          Descriptive paragraph below the headline.
          ✏️ HOW TO EDIT: Replace the text inside the <motion.p>.
        */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          From premium liquid detergents to floor cleaners — we manufacture quality cleaning products at the best wholesale prices for businesses across India.
        </motion.p>

        {/*
          ── CTA BUTTONS ───────────────────────────────────────────
          Two side-by-side buttons (stacked on mobile, inline on sm+).

          ✏️ HOW TO EDIT:
            • Primary button text: change "Start Your Project".
            • Primary button colours: adjust gradient
              `from-[#F59E0B] to-[#FBBF24]`.
            • Primary button target: change `#contact` in scrollIntoView.
            • Secondary button text: change "Explore Products".
            • Secondary button target: change `#products` in scrollIntoView.
            • Icon: replace the inline <svg> arrow with a lucide-react icon
              or remove it entirely.
        */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn relative px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full text-base overflow-hidden hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] transition-shadow duration-300"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn relative px-8 py-4 glass text-white font-semibold rounded-full text-base hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            Explore Products
          </motion.button>
        </motion.div>
      </motion.div>

      {/*
        ── SCROLL-DOWN INDICATOR ───────────────────────────────────
        A small bouncing arrow at the bottom of the hero. Clicking it
        smooth-scrolls to the `#about` section.

        ✏️ HOW TO EDIT:
          • Label text: change "Scroll".
          • Target section: change `#about` in scrollIntoView.
          • Bounce range: change `y: [0, 8, 0]` values.
          • Icon: swap `<ArrowDown>` for another lucide-react icon.
      */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#94A3B8]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={16} className="text-[#10B981]" />
        </motion.div>
      </motion.div>

      {/*
        ── BOTTOM FADE GRADIENT ────────────────────────────────────
        A gradient overlay at the very bottom of the hero section that
        fades from transparent to the page background colour, ensuring
        a seamless visual transition into the next section below.

        ✏️ HOW TO EDIT:
          • Height: change `h-32`.
          • Colour: change `from-[#070B0E]` to match the next section's
            background colour.
      */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070B0E] to-transparent z-[2]" />
    </section>
  );
}
