'use client';

/**
 * ============================================================
 * Footer Component — Nexus Consumer Care
 * ============================================================
 * Multi-column footer with:
 *   - Brand logo & description
 *   - Social media links
 *   - Real contact info (phone, WhatsApp, email, address, timing)
 *   - Quick navigation columns (Products, Services, Company)
 *   - Bottom bar with copyright, policies, and back-to-top button
 *
 * HOW TO EDIT:
 * - Update `footerLinks` object to change navigation links
 * - Update `socialLinks` array to change social media URLs
 * - Update contact info (phone, email, address, timing) in the JSX below
 * - Colors are hardcoded hex values — change them to match your theme
 * - Copyright year auto-updates via `new Date().getFullYear()`
 * ============================================================
 */

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUp, Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

/* --------------------------------------------------------
   Footer Navigation Links — EDIT THIS to change menu items
   -------------------------------------------------------- */
const footerLinks = {
  /* Product categories shown in footer */
  Products: ['Total Care Plus Detergent Liquid', 'Total Care Floor Cleaner', 'Detergent Liquid (Loose)', 'Detergent Liquid (Packaged)', 'Floor Cleaner (Loose & Packaged)'],
  /* Services offered by the company */
  Services: ['Wholesale Supply', 'Loose & Packaged', 'Custom Packaging', 'Bulk Orders'],
  /* Company-related pages */
  Company: ['About Us', 'Our Team', 'Products'],
};

/* --------------------------------------------------------
   Social Media Links — EDIT THIS to change social URLs
   -------------------------------------------------------- */
const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/nexusconsumercare', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Instagram, href: 'https://instagram.com/nexusconsumercare', label: 'Instagram', color: '#E4405F' },
  { icon: Facebook, href: 'https://facebook.com/nexusconsumercare', label: 'Facebook', color: '#1877F2' },
  { icon: Twitter, href: 'https://twitter.com/nexusconsumercare', label: 'X (Twitter)', color: '#FFFFFF' },
  { icon: Youtube, href: 'https://youtube.com/@nexusconsumercare', label: 'YouTube', color: '#FF0000' },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function Footer() {
  /** Scroll to top when the arrow button is clicked */
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Decorative section divider */}
      <div className="section-divider" />

      <div className="relative bg-gradient-to-b from-[#070B0E] to-[#040709]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">

            {/* ============================================================
                LEFT COLUMN: Brand Info, Social Links, Contact Details
                EDIT the contact info below to update phone/email/address/timing
                ============================================================ */}
            <div className="lg:col-span-2">
              {/* Brand Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                  <span className="font-display font-bold text-white text-lg">N</span>
                </div>
                <div>
                  <span className="font-display text-lg font-bold text-white tracking-wide">NEXUS</span>
                  <span className="block text-[10px] tracking-[0.25em] text-[#94A3B8] uppercase font-medium">Consumer Care</span>
                </div>
              </div>

              {/* Brand Description */}
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 max-w-sm">
                Manufacturers &amp; Wholesalers of premium cleaning products. Trusted by wholesalers, resellers, repackers, and businesses across India for over 17 years.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 mb-8">
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
                      style={{ background: `linear-gradient(135deg, ${social.color}20, ${social.color}05)`, border: `1px solid ${social.color}30` }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* ============================================================
                  CONTACT INFORMATION
                  EDIT the values below to update contact details:
                  - Phone number
                  - WhatsApp number
                  - Email address
                  - Physical address
                  - Business timing
                  ============================================================ */}
              <div className="space-y-3">
                {/* Phone */}
                <a href="tel:+919227806789"
                  className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors group">
                  <Phone size={14} className="text-[#10B981]" />
                  <span>+91 92278 06789</span>
                </a>
                {/* WhatsApp */}
                <a href="https://wa.me/919227806789" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#25D366] transition-colors group">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp: +91 92278 06789</span>
                </a>
                {/* Email */}
                <a href="mailto:priyanshrajbhar499@gmail.com"
                  className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#F59E0B] transition-colors group">
                  <Mail size={14} className="text-[#F59E0B]" />
                  <span>priyanshrajbhar499@gmail.com</span>
                </a>
                {/* Address */}
                <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <MapPin size={14} className="text-[#34D399]" />
                  <span>3rd Phase, GIDC Vapi, Gujarat</span>
                </div>
                {/* Business Timing */}
                <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <Clock size={14} className="text-[#6EE7B7]" />
                  <span>Sunday – Friday: 10:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* ============================================================
                RIGHT COLUMNS: Quick Navigation Links
                EDIT the `footerLinks` object above to change these items
                ============================================================ */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                  <div className="w-6 h-px bg-[#10B981]" />
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#"
                        className="text-sm text-[#94A3B8] hover:text-[#10B981] transition-colors duration-300 hover:pl-1 inline-block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            BOTTOM BAR: Copyright, Policies, Back-to-top
            ============================================================ */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#94A3B8]/60">
              &copy; {new Date().getFullYear()} Nexus Consumer Care. All rights reserved. Crafted with precision.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-[#94A3B8]/60 hover:text-[#10B981] transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-[#94A3B8]/60 hover:text-[#10B981] transition-colors">Terms of Service</a>
              {/* Back-to-top button */}
              <motion.button onClick={scrollToTop}
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                <ArrowUp size={14} className="text-[#10B981]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
