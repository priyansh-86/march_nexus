/**
 * @component FloatingContact
 * @description
 * A floating action button (FAB) fixed at the bottom-right corner of the screen.
 * When clicked, it expands to reveal contact action buttons (WhatsApp, Call, Email)
 * and a small info card with business details.
 *
 * ─── HOW TO CHANGE PHONE NUMBER ───
 * Edit the `contactActions` array:
 *   1. WhatsApp link: change the phone number in `href: 'https://wa.me/919227806789...'`
 *      Format: `wa.me/{country_code}{number}` (no spaces, no + sign)
 *   2. Call link: change `href: 'tel:+919227806789'`
 *   3. Display number in info card: change `+91 92278 06789` in the JSX
 *
 * ─── HOW TO CHANGE WHATSAPP URL / PRE-FILLED MESSAGE ───
 * Edit the `href` of the WhatsApp object in `contactActions`:
 *   `https://wa.me/{phone}?text={URL-encoded message}`
 * Use `encodeURIComponent('Your message here')` to safely encode the text.
 *
 * ─── HOW TO CHANGE EMAIL ADDRESS ───
 * Edit the `href: 'mailto:priyanshrajbhar499@gmail.com'` in the Email action
 * inside `contactActions`. Also update the display email in the info card JSX
 * (the `<span>` inside the Mail icon row).
 *
 * ─── HOW TO CHANGE BUSINESS TIMING ───
 * Find the `<Clock>` icon row inside the info card and edit:
 *   `<span>Sun – Fri: 10 AM – 7 PM</span>`
 * Change the days and hours to match your actual business schedule.
 *
 * ─── HOW TO ADD/REMOVE CONTACT ACTIONS ───
 * Add or remove objects from the `contactActions` array. Each action needs:
 *   - `icon`: A Lucide icon component (e.g., Phone, MessageCircle, Send)
 *   - `label`: Display name shown on hover tooltip
 *   - `href`: The link URL (tel:, mailto:, https://, etc.)
 *   - `color`, `bgFrom`, `bgTo`, `glow`: Tailwind-compatible colors for the button
 *
 * ─── HOW TO CHANGE FAB POSITION ───
 * Edit the outer container classes: `fixed bottom-6 right-6` → change
 * `bottom-6`/`right-6` to adjust position (e.g., `bottom-4 left-4`).
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, Mail, Clock, Send } from 'lucide-react';

export default function FloatingContact() {
  // Controls whether the contact panel is expanded (true) or collapsed (false)
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Contact action buttons displayed when the FAB is expanded.
   * Each action renders as a circular icon button with a hover tooltip.
   *
   * To add a new action, append an object with the shape:
   *   { icon: YourIcon, label: 'Label', href: 'url', color: '#hex', bgFrom: 'from-[#hex]', bgTo: 'to-[#hex]', glow: 'rgba(r,g,b,a)' }
   *
   * To remove an action, delete its object from this array.
   */
  const contactActions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/919227806789?text=Hi%20Nexus%20Consumer%20Care%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.',
      color: '#25D366',
      bgFrom: 'from-[#25D366]',
      bgTo: 'to-[#128C7E]',
      glow: 'rgba(37, 211, 102, 0.3)',
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+919227806789',
      color: '#10B981',
      bgFrom: 'from-[#10B981]',
      bgTo: 'to-[#059669]',
      glow: 'rgba(16, 185, 129, 0.3)',
    },
    {
      icon: Send,
      label: 'Email Us',
      href: 'mailto:priyanshrajbhar499@gmail.com',
      color: '#F59E0B',
      bgFrom: 'from-[#F59E0B]',
      bgTo: 'to-[#D97706]',
      glow: 'rgba(245, 158, 11, 0.3)',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* ── Expanded Contact Panel ── */}
      {/* Only rendered when isOpen is true; animates in/out with spring physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, type: 'spring', damping: 20 }}
            className="flex flex-col gap-3"
          >
            {/*
              ── Contact Info Card ──
              Small glassmorphism card showing phone, email, and business hours.
              Edit the text content here to update displayed contact information.
            */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-card rounded-2xl p-4 w-64 mb-1"
            >
              <p className="text-white font-semibold text-sm mb-3 font-display">Quick Connect</p>
              <div className="space-y-2">
                {/* Phone number display — edit the number text to update */}
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Phone size={12} className="text-[#10B981]" />
                  <span>+91 92278 06789</span>
                </div>
                {/* Email display — edit the email text to update */}
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Mail size={12} className="text-[#F59E0B]" />
                  <span>priyanshrajbhar499@gmail.com</span>
                </div>
                {/* Business hours — edit the timing text to update */}
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Clock size={12} className="text-[#34D399]" />
                  <span>Sun – Fri: 10 AM – 7 PM</span>
                </div>
              </div>
            </motion.div>

            {/*
              ── Contact Action Buttons ──
              Each action renders as a circular button with gradient background,
              pulsing glow animation, and a hover tooltip label.
              WhatsApp opens in a new tab; Call and Email use native handlers.
            */}
            {contactActions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.label === 'WhatsApp' ? '_blank' : undefined}
                rel={action.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.8 }}
                transition={{ delay: 0.08 + i * 0.06, type: 'spring', damping: 18 }}
                className="group flex items-center gap-3"
              >
                {/* Hover tooltip — appears to the left of the button on hover */}
                <span className="glass text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-[68px]">
                  {action.label}
                </span>
                {/* Circular action button with gradient background and pulsing glow */}
                <motion.div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${action.bgFrom.replace('from-', '')}, ${action.bgTo.replace('to-', '')})`,
                  }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <action.icon size={24} className="text-white" />
                  {/* Pulsing glow ring animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ boxShadow: [`0 0 0px ${action.glow}`, `0 0 20px ${action.glow}`, `0 0 0px ${action.glow}`] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        ── Main FAB Toggle Button ──
        The always-visible floating button that toggles the contact panel.
        - When closed: green gradient with chat icon and notification badge
        - When open: dark gradient with close (X) icon
        - Has a pulsing glow animation when closed to draw attention
      */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-10"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #374151, #1F2937)'
            : 'linear-gradient(135deg, #10B981, #059669)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{
          boxShadow: isOpen
            ? ['0 4px 20px rgba(0,0,0,0.3)', '0 4px 20px rgba(0,0,0,0.3)']
            : ['0 4px 20px rgba(16,185,129,0.3)', '0 8px 30px rgba(16,185,129,0.5)', '0 4px 20px rgba(16,185,129,0.3)'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Icon swap animation — rotates between chat icon and close icon */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={26} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification badge — only shown when panel is closed; draws user attention */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }}
          >
            <span className="text-[9px] font-bold text-white">1</span>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
