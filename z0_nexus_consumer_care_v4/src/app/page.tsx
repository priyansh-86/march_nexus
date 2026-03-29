'use client';

/**
 * ============================================================
 * Homepage — Nexus Consumer Care
 * ============================================================
 * This is the main landing page that assembles all sections.
 * Sections appear in this order:
 *   1. Navbar (fixed top navigation)
 *   2. HeroSection (cinematic intro with particles)
 *   3. AboutSection (company metrics & trust factors)
 *   4. ProductShowcase (Total Care product cards with 3D tilt)
 *   5. WeCaterToSection (who we serve — wholesalers, resellers, startups, etc.)
 *   6. ContactForm (inquiry form with floating labels)
 *   7. FounderSection (founder profile & vision)
 *   8. Footer (links, contact info, socials)
 *   9. FloatingContact (WhatsApp/Call/Email FAB)
 *  10. CustomCursor (magnetic dual-ring cursor — desktop only)
 *
 * HOW TO EDIT:
 * - To add/remove sections, import/unimport components below
 * - To reorder sections, move the component tags in the JSX
 * - The CustomCursor is loaded dynamically (no SSR) for performance
 * ============================================================
 */

import dynamic from 'next/dynamic';
import Navbar from '@/components/nexus/Navbar';
import HeroSection from '@/components/nexus/HeroSection';
import AboutSection from '@/components/nexus/AboutSection';
import ProductShowcase from '@/components/nexus/ProductShowcase';
import WeCaterToSection from '@/components/nexus/WeCaterToSection';
import ContactForm from '@/components/nexus/ContactForm';
import FounderSection from '@/components/nexus/FounderSection';
import FloatingContact from '@/components/nexus/FloatingContact';
import Footer from '@/components/nexus/Footer';

// Custom cursor loads client-side only (uses mouse events)
const CustomCursor = dynamic(() => import('@/components/nexus/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#070B0E]">
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProductShowcase />
        <WeCaterToSection />
        <ContactForm />
        <FounderSection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
