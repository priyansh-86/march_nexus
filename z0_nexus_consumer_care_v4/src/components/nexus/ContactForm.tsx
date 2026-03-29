/**
 * @component ContactForm
 * @description
 * A beautifully animated inquiry/contact form with floating labels, glassmorphism styling,
 * and a spring-based success animation. Used on the contact page to collect user inquiries
 * about products and services.
 *
 * ─── HOW TO EDIT FORM FIELDS ───
 * 1. Edit the `FormData` interface below to add/remove fields (e.g., add `website: string`).
 * 2. Update the initial state in the `ContactForm` component's `useState<FormData>(...)` to include
 *    the new field with a default empty string.
 * 3. Add a new `<AnimatedInput>` (or `<AnimatedInput isTextarea />` for multi-line) inside the
 *    form's grid or add a new row. Pass the matching `name`, `icon`, `label`, `value`, and `onChange`.
 * 4. The `handleChange` function already handles dynamic field names via `[e.target.name]`, so
 *    no changes are needed there.
 *
 * ─── HOW TO CHANGE PRODUCT TYPE DROPDOWN OPTIONS ───
 * Edit the `productOptions` array inside the `ContactForm` component. Each entry needs:
 *   - `value`: the internal string value submitted with the form
 *   - `label`: the display text shown in the dropdown
 * Example: { value: 'fabric-softener', label: 'Fabric Softener' }
 *
 * ─── HOW TO CONNECT TO A REAL BACKEND ───
 * Inside the `handleSubmit` function, replace the `setTimeout` mock with a real API call:
 *   await fetch('/api/contact', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(formData),
 *   });
 * Make sure to wrap in try/catch and handle errors (e.g., show an error state instead of success).
 *
 * ─── HOW TO CHANGE THE SUBMIT BUTTON ───
 * - TEXT: Edit "Send Inquiry" and "Sending..." inside the `<motion.button>` section.
 * - COLOR: Change the gradient classes `from-[#F59E0B] to-[#FBBF24]` on the button element
 *   to any Tailwind color range (e.g., `from-[#3B82F6] to-[#60A5FA]` for blue).
 * - HOVER GLOW: Edit the `hover:shadow-[...]` Tailwind class to change the hover glow color.
 * - SIZE: Adjust `px-12 py-4` for padding, or `text-lg` for font size.
 */
'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Building2, Mail, Phone, MessageSquare } from 'lucide-react';

/**
 * @interface FormData
 * @description Shape of the contact form data. Add or remove fields here to change
 * what information the form collects. Each key must match the `name` prop of an
 * AnimatedInput in the JSX.
 */
interface FormData { name: string; company: string; email: string; phone: string; productType: string; message: string; }

/**
 * @component AnimatedInput
 * @description
 * A reusable input component with a floating label animation. When the input is focused
 * or has a value, the label floats up and shrinks. The icon also changes color on focus.
 *
 * Props:
 * - `icon`: A Lucide icon component (e.g., User, Mail, Phone)
 * - `label`: The placeholder text that becomes the floating label
 * - `name`: The form field name (must match a key in FormData)
 * - `type`: HTML input type (default: 'text'). Use 'email', 'tel', etc.
 * - `value`: The current value from parent state
 * - `onChange`: Handler to update parent state
 * - `isTextarea`: Set to `true` for multi-line text areas
 * - `options`: Array of {value, label} for select dropdowns
 *
 * HOW TO CUSTOMIZE FLOATING LABEL STYLING:
 * - Label color on focus: change `'#10B981'` in the label `animate` prop
 * - Label color idle: change `'#94A3B8'` in the label `animate` prop
 * - Border focus color: change `'rgba(16,185,129,0.4)'` in the outer div `animate` prop
 * - Input background: change `'rgba(255,255,255,0.03)'` in the input/textarea/select className
 */
function AnimatedInput({ icon: Icon, label, name, type = 'text', value, onChange, isTextarea = false, options }: {
  icon: typeof User; label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  isTextarea?: boolean; options?: { value: string; label: string }[];
}) {
  // Tracks whether the input is currently focused — drives the floating label animation
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative group">
      {/* Icon on the left side of the input — color animates between gray (idle) and emerald (focused) */}
      <motion.div className="absolute left-4 top-4 z-10 transition-colors duration-300"
        animate={{ color: isFocused ? '#10B981' : '#94A3B8' }}><Icon size={18} /></motion.div>
      {/* Floating label — moves up and shrinks when focused or has a value */}
      <motion.label className="absolute left-12 transition-all duration-300 pointer-events-none z-10 bg-transparent"
        animate={{ top: isFocused || value ? 8 : 16, fontSize: isFocused || value ? '10px' : '14px',
          color: isFocused ? '#10B981' : '#94A3B8', fontWeight: isFocused || value ? 600 : 400,
          letterSpacing: isFocused || value ? '0.1em' : '0' }}>
        {label.toUpperCase()}
      </motion.label>
      {/* Input container — border color and box-shadow animate on focus */}
      <motion.div className="relative rounded-xl overflow-hidden"
        animate={{ borderColor: isFocused ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)',
          boxShadow: isFocused ? '0 0 0 3px rgba(16,185,129,0.1), 0 0 20px rgba(16,185,129,0.05)' : 'none' }}
        style={{ border: '1px solid' }}>
        {/* Conditionally renders a <textarea>, <select> dropdown, or regular <input> */}
        {isTextarea ? (
          <textarea name={name} value={value} onChange={onChange} rows={4}
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            className="w-full bg-[rgba(255,255,255,0.03)] text-white pt-8 pb-3 px-12 text-sm rounded-xl resize-none focus:outline-none placeholder-transparent" />
        ) : options ? (
          <select name={name} value={value} onChange={onChange}
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            className="w-full bg-[rgba(255,255,255,0.03)] text-white pt-8 pb-3 px-12 text-sm rounded-xl focus:outline-none appearance-none cursor-pointer">
            <option value="" className="bg-[#0C151C]">Select product type</option>
            {options.map((opt) => <option key={opt.value} value={opt.value} className="bg-[#0C151C]">{opt.label}</option>)}
          </select>
        ) : (
          <input type={type} name={name} value={value} onChange={onChange}
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            className="w-full bg-[rgba(255,255,255,0.03)] text-white pt-8 pb-3 px-12 text-sm rounded-xl focus:outline-none placeholder-transparent" />
        )}
      </motion.div>
    </div>
  );
}

/**
 * @component SuccessAnimation
 * @description
 * Displayed after the form is successfully submitted. Shows an animated checkmark
 * with a pulsing glow and orbiting particles, plus a confirmation message.
 *
 * HOW TO CUSTOMIZE:
 * - Success heading text: edit "Message Sent!" in the <h3> tag
 * - Success description: edit the paragraph text below the heading
 * - Checkmark color: change `'#10B981'` references throughout
 * - Particle count: change `[...Array(6)]` to any number
 * - Particle radius: change `* 60` in the Math.cos/sin expressions
 */
function SuccessAnimation() {
  return (
    <motion.div className="flex flex-col items-center justify-center py-12" initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }}>
      {/* Checkmark container with 3D flip-in animation */}
      <motion.div className="relative mb-8" initial={{ rotateY: -90 }} animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }} style={{ perspective: '600px' }}>
        {/* Pulsing glow circle behind the checkmark */}
        <motion.div className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))', border: '2px solid rgba(16,185,129,0.3)' }}
          animate={{ boxShadow: ['0 0 20px rgba(16,185,129,0.1)', '0 0 40px rgba(16,185,129,0.2)', '0 0 20px rgba(16,185,129,0.1)'] }}
          transition={{ duration: 2, repeat: Infinity }}>
          {/* Checkmark icon with spring scale-in */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}>
            <CheckCircle2 size={48} className="text-[#10B981]" />
          </motion.div>
        </motion.div>
        {/* Orbiting particle dots — 6 particles radiating outward in a circle */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-[#10B981]"
            style={{ top: '50%', left: '50%', marginTop: -4, marginLeft: -4 }}
            animate={{ x: Math.cos((i * Math.PI * 2) / 6) * 60, y: Math.sin((i * Math.PI * 2) / 6) * 60, opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </motion.div>
      {/* Success heading — fades in with delay */}
      <motion.h3 className="font-display text-3xl font-bold text-white mb-3" initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>Message Sent!</motion.h3>
      {/* Success description — fades in after heading */}
      <motion.p className="text-[#94A3B8] text-center max-w-sm" initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        Our team will reach out to you within 24 hours with a custom proposal tailored to your needs.
      </motion.p>
    </motion.div>
  );
}

/**
 * @component ContactForm (default export)
 * @description
 * The main contact/inquiry form section. Renders a hero heading, an animated form
 * with floating-label inputs, and a submit button that triggers a success animation.
 *
 * STRUCTURE:
 * 1. Section heading with badge, title, and subtitle
 * 2. Glass card containing the form (or success animation after submission)
 * 3. 2-column grid for name/company and email/phone
 * 4. Full-width product type dropdown
 * 5. Full-width message textarea
 * 6. Centered submit button with loading spinner
 */
export default function ContactForm() {
  // Form field state — mirrors the FormData interface
  const [formData, setFormData] = useState<FormData>({ name: '', company: '', email: '', phone: '', productType: '', message: '' });
  // Loading state while the form is being "submitted"
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Success state — when true, shows SuccessAnimation instead of the form
  const [isSuccess, setIsSuccess] = useState(false);
  // Ref for scroll-triggered animation on the form card
  const containerRef = useRef<HTMLDivElement>(null);
  // Only triggers the entrance animation once when the form scrolls into view
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  /**
   * Generic change handler — works with any input/textarea/select by reading the
   * `name` attribute. No need to modify when adding new fields.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Form submission handler.
   * Currently uses a mock setTimeout (2 seconds) to simulate an API call.
   * REPLACE the setTimeout with a real fetch/axios call to your backend.
   * After success, shows the SuccessAnimation for 5 seconds, then resets the form.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Replace this mock delay with a real API call (e.g., fetch('/api/inquiries', { method: 'POST', body: JSON.stringify(formData) }))
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    // After 5 seconds, hide the success message and reset all form fields
    setTimeout(() => { setIsSuccess(false); setFormData({ name: '', company: '', email: '', phone: '', productType: '', message: '' }); }, 5000);
  };

  /**
   * Product type dropdown options.
   * Edit this array to add/remove products shown in the "Product Type" dropdown.
   * Each entry: { value: 'url-safe-value', label: 'Human Readable Label' }
   */
  const productOptions = [
    { value: 'liquid-detergent', label: 'Liquid Detergent' }, { value: 'detergent-powder', label: 'Detergent Powder' },
    { value: 'floor-cleaner', label: 'Floor Cleaner' }, { value: 'dishwash', label: 'Dishwash Liquid' },
    { value: 'glass-cleaner', label: 'Glass Cleaner' }, { value: 'other', label: 'Other / Custom' },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Full-section background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B0E] via-[#0B1216] to-[#070B0E]" />
      {/* Subtle radial glow at the bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.03) 0%, transparent 70%)' }} />
      {/* Decorative section divider line */}
      <div className="section-divider mb-24" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div ref={containerRef}>
          {/* ── Section Heading ── */}
          <div className="text-center mb-16">
            {/* Animated badge pill */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">Get In Touch</span>
            </motion.div>
            {/* Main heading with gradient accent text */}
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let&apos;s Build <span className="gradient-text-fire">Something Great</span>
            </motion.h2>
            {/* Subtitle description */}
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }} className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you need private label manufacturing, custom formulations, or bulk orders — we&apos;re here to make it happen.
            </motion.p>
          </div>

          {/* ── Form Card (glass morphism container) ── */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative gradient orbs in corners */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }} />

            {/* AnimatePresence switches between the form and the success animation */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                /* ── The Actual Form ── */
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="relative z-10">
                  {/* Row 1: Name & Company — 2 columns on medium+ screens */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <AnimatedInput icon={User} label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                    <AnimatedInput icon={Building2} label="Company Name" name="company" value={formData.company} onChange={handleChange} />
                    <AnimatedInput icon={Mail} label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <AnimatedInput icon={Phone} label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  </div>
                  {/* Product Type dropdown — full width */}
                  <div className="mb-6">
                    <AnimatedInput icon={Send} label="Product Type" name="productType" value={formData.productType} onChange={handleChange} options={productOptions} />
                  </div>
                  {/* Message textarea — full width */}
                  <div className="mb-8">
                    <AnimatedInput icon={MessageSquare} label="Tell us about your requirements" name="message" value={formData.message} onChange={handleChange} isTextarea />
                  </div>
                  {/* Submit button — centered with loading spinner animation */}
                  <div className="flex justify-center">
                    <motion.button type="submit" disabled={isSubmitting}
                      className="magnetic-btn relative px-12 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white font-semibold rounded-full text-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] transition-shadow duration-300 min-w-[220px]"
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }} whileTap={{ scale: isSubmitting ? 1 : 0.95 }}>
                      {/* Switches between "Sending..." spinner and "Send Inquiry" text */}
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="relative z-10 flex items-center gap-3">
                            {/* CSS-only spinning loader */}
                            <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />Sending...
                          </motion.span>
                        ) : (
                          <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="relative z-10 flex items-center gap-3">Send Inquiry<Send size={18} /></motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                /* ── Success State — replaces the form ── */
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <SuccessAnimation />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
