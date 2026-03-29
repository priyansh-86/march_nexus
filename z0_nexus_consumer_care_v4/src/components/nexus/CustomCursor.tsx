'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

function useIsMobile() {
  const subscribe = (callback: () => void) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };
  const getSnapshot = () => window.innerWidth <= 768;
  const getServerSnapshot = () => true;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const isMobile = useIsMobile();

  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const trailConfig = { damping: 35, stiffness: 150, mass: 0.8 };

  const cursorStyleX = useSpring(cursorX, springConfig);
  const cursorStyleY = useSpring(cursorY, springConfig);
  const trailStyleX = useSpring(trailX, trailConfig);
  const trailStyleY = useSpring(trailY, trailConfig);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setTimeout(() => {
        trailX.set(e.clientX);
        trailY.set(e.clientY);
      }, 80);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll(
        'a, button, [data-cursor-hover], input, textarea, select, .card-3d'
      );
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const hoverables = document.querySelectorAll(
      'a, button, [data-cursor-hover], input, textarea, select, .card-3d'
    );
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, trailX, trailY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: trailStyleX,
          y: trailStyleY,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          border: '1px solid rgba(16, 185, 129, 0.4)',
        }}
        animate={{
          scale: isHovering ? 2.2 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ x: cursorStyleX, y: cursorStyleY }}
        animate={{
          width: isHovering ? 16 : isClicking ? 6 : 8,
          height: isHovering ? 16 : isClicking ? 6 : 8,
          marginLeft: isHovering ? -8 : isClicking ? -3 : -4,
          marginTop: isHovering ? -8 : isClicking ? -3 : -4,
          backgroundColor: isHovering ? '#F59E0B' : '#10B981',
          boxShadow: isHovering
            ? '0 0 20px rgba(245, 158, 11, 0.5)'
            : '0 0 10px rgba(16, 185, 129, 0.5)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />
    </>
  );
}
