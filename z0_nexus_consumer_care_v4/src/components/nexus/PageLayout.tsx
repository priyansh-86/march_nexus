/**
 * @component PageLayout
 * @description
 * Shared wrapper layout component used by ALL sub-pages of the Nexus site.
 * It provides a consistent structure by wrapping page content with:
 *   - `Navbar` — top navigation bar (sticky)
 *   - `Footer` — site-wide footer with links and branding
 *   - `FloatingContact` — floating action button for WhatsApp/Call/Email
 *   - `CustomCursor` — custom cursor effect (desktop only, loaded via dynamic import)
 *
 * ─── HOW TO ADD GLOBAL PAGE-LEVEL FEATURES ───
 * Edit this component to inject features that should appear on every page:
 *   - To add a cookie consent banner: add a new component import and render it
 *     just above `</div>` (before the closing wrapper).
 *   - To add a back-to-top button: import/create a ScrollToTop component and
 *     render it alongside `<FloatingContact />`.
 *   - To add a global announcement bar: render it between `<Navbar />` and
 *     `<main>`.
 *   - To add page transition animations: wrap `{children}` in a Framer Motion
 *     `<AnimatePresence>` with route-based keys.
 *   - To change the page background color: edit the `bg-[#070B0E]` class on
 *     the outermost `<div>`.
 *
 * ─── SCROLL-TO-TOP BEHAVIOR ───
 * On mount (i.e., every page navigation), this component scrolls the window
 * to the top instantly. This ensures users always start at the top of a new page.
 * If you want smooth scrolling instead, change `behavior: 'instant'` to
 * `behavior: 'smooth'`.
 */
'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/nexus/Navbar';
import Footer from '@/components/nexus/Footer';
import FloatingContact from '@/components/nexus/FloatingContact';

/**
 * CustomCursor is dynamically imported with SSR disabled because it relies on
 * browser-only APIs (mousemove events, etc.). Dynamic import also reduces the
 * initial JavaScript bundle size.
 *
 * HOW TO DISABLE THE CUSTOM CURSOR:
 * Simply comment out or remove the `<CustomCursor />` line in the JSX below
 * and delete this dynamic import.
 */
const CustomCursor = dynamic(() => import('@/components/nexus/CustomCursor'), { ssr: false });

/**
 * @param children - The page-specific content rendered inside <main>.
 *                  Next.js passes the page component as children automatically.
 */
export default function PageLayout({ children }: { children: React.ReactNode }) {
  /**
   * Scroll to top on every page mount.
   * This fires on initial load and on every client-side route change,
   * ensuring users always land at the top of the page.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#070B0E]">
      {/* Custom cursor overlay — rendered on top of everything */}
      <CustomCursor />
      {/* Top navigation bar — typically fixed/sticky */}
      <Navbar />
      {/* Main content area — flex-1 ensures footer stays at the bottom */}
      <main className="flex-1">{children}</main>
      {/* Site-wide footer with links, branding, and contact info */}
      <Footer />
      {/* Floating action button (FAB) for quick WhatsApp/Call/Email access */}
      <FloatingContact />
    </div>
  );
}
