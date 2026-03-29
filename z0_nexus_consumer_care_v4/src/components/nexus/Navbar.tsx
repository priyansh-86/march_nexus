/**
 * @file Navbar.tsx
 * @component Navbar
 * @description
 * Fixed top navigation bar that appears on every page. It features:
 *   - A branded logo (left side)
 *   - Smooth-scroll navigation links (center, desktop only)
 *   - A CTA "Get a Quote" button (right side, desktop only)
 *   - A hamburger menu that opens a full-screen mobile overlay
 *   - Glassmorphism styling that activates when the user scrolls past 50px
 *   - An entrance animation (slides down from top) powered by Framer Motion
 *
 * ──────────────────────────────────────────────
 * HOW TO EDIT THIS COMPONENT
 * ──────────────────────────────────────────────
 *
 * 📌 ADD / REMOVE NAVIGATION LINKS
 *    Edit the `navLinks` array below (around line 42). Each entry is:
 *      { label: 'Display Text', href: '#section-id' }
 *    The `href` must match the `id` attribute of the target <section>.
 *
 * 📌 CHANGE THE CTA BUTTON TEXT
 *    Search for "Get a Quote" — it appears twice: once in the desktop
 *    CTA button and once in the mobile overlay. Update both to keep
 *    them in sync. The CTA scrolls to `#contact` by default; change
 *    the `scrollTo('#contact')` call to point elsewhere if needed.
 *
 * 📌 CHANGE LOGO / BRANDING
 *    - Icon: The green gradient box renders the letter "N". Change the
 *      <span> text and gradient colours (`from-[#10B981] to-[#059669]`)
 *      to match your brand.
 *    - Brand name: Edit "NEXUS" and the tagline "Consumer Care" inside
 *      the logo <motion.a> block.
 *
 * 📌 TOGGLE SCROLL GLASS EFFECT
 *    The threshold is `window.scrollY > 50` (line ~53). Change `50`
 *    to a different pixel value to trigger the glass effect earlier or later.
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Navigation link configuration.
 *
 * ✏️ HOW TO EDIT:
 *   - Add a new link: push another `{ label, href }` object.
 *   - Remove a link: delete the corresponding object.
 *   - Reorder: move objects up or down in the array.
 *   - The `href` should be a hash-link (e.g. `#about`) that matches
 *     the `id` of the target section elsewhere on the page.
 */
const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  // ── State ──────────────────────────────────────────────────────────
  // `scrolled`  – controls whether the glassmorphism background and
  //               condensed padding are applied (true when scrollY > 50).
  // `mobileOpen`– toggles the full-screen mobile menu overlay.
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Scroll listener — sets `scrolled` to true once the user scrolls
   * past 50 px. This drives the conditional glass-strong class on the
   * <nav> element.
   *
   * ✏️ HOW TO EDIT:
   *   Change the `50` threshold to trigger the glass effect at a
   *   different scroll position.
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Smooth-scroll helper. Closes the mobile menu (if open) then
   * scrolls the target element into view.
   *
   * ✏️ HOW TO EDIT:
   *   To change the scroll offset, add a `scroll-margin-top` CSS rule
   *   on the target section, or modify the `scrollIntoView` options.
   */
  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/*
        ═══════════════════════════════════════════════════════════════
        MAIN NAVBAR (always visible)
        ═══════════════════════════════════════════════════════════════
        • `fixed top-0 left-0 right-0 z-[100]` keeps it pinned to the
          top of the viewport, above all other content.
        • `initial={{ y: -100 }}` starts the nav off-screen above;
          `animate={{ y: 0 }}` slides it in on mount.
        • When `scrolled` is true, `glass-strong py-3` applies a
          frosted-glass background and tighter vertical padding.
          Otherwise, the bar is fully transparent with `py-5`.
      */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">

          {/*
            ── LOGO / BRAND ─────────────────────────────────────────
            ✏️ HOW TO EDIT BRANDING:
              • Letter icon: Change the <span>"N"</span> text.
              • Icon colours: Adjust the gradient classes
                `from-[#10B981] to-[#059669]` (Tailwind arbitrary values).
              • Brand name: Edit "NEXUS" and "Consumer Care".
          */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center overflow-hidden">
              <span className="font-display font-bold text-white text-lg relative z-10">N</span>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-wide text-white leading-tight">NEXUS</span>
              <span className="text-[10px] tracking-[0.25em] text-[#94A3B8] uppercase font-medium">Consumer Care</span>
            </div>
          </motion.a>

          {/*
            ── DESKTOP NAVIGATION LINKS ────────────────────────────
            Hidden on mobile (`hidden md:flex`).
            Each link renders a hover underline that expands from center.

            ✏️ HOW TO EDIT:
              Links are driven by the `navLinks` array defined above.
              To add/remove/reorder links, edit that array.
          */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 group"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#10B981] transition-all duration-300 group-hover:w-6 rounded-full" />
              </motion.button>
            ))}
          </div>

          {/*
            ── CTA BUTTON (desktop only) ───────────────────────────
            Hidden on mobile (`hidden md:block`).

            ✏️ HOW TO EDIT:
              • Text: Change "Get a Quote" inside <span>.
              • Colours: Adjust the gradient `from-[#F59E0B] to-[#FBBF24]`.
              • Target: Change `scrollTo('#contact')` to navigate elsewhere.
              • Hover glow: Modify `hover:shadow-[0_0_30px_rgba(…)]` values.
          */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="magnetic-btn relative px-6 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get a Quote</span>
            </motion.button>
          </div>

          {/*
            ── MOBILE HAMBURGER BUTTON ─────────────────────────────
            Only visible on small screens (`md:hidden`).
            Toggles `mobileOpen` state which controls the overlay.
          */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/*
        ═══════════════════════════════════════════════════════════════
        MOBILE MENU OVERLAY
        ═══════════════════════════════════════════════════════════════
        Full-screen dark overlay shown only when `mobileOpen` is true.
        Uses AnimatePresence + motion for enter/exit animations.
        Each link staggers in with a 0.1 s delay between items.

        ✏️ HOW TO EDIT:
          The links and CTA button here mirror the desktop versions.
          If you add/remove a nav link, the mobile list updates
          automatically because it also maps over `navLinks`.
          Remember to also update the mobile CTA text if you change
          the desktop CTA — they are separate elements.
      */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] pt-20 bg-[#070B0E]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-12">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-display font-semibold text-white hover:text-[#10B981] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollTo('#contact')}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full"
              >
                Get a Quote
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
