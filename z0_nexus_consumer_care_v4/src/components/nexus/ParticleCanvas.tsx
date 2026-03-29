'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'bubble' | 'drop' | 'particle';
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const colors = ['#10B981', '#34D399', '#6EE7B7', '#059669', '#10B981'];

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const types: Particle['type'][] = ['bubble', 'drop', 'particle'];
    const type = types[Math.floor(Math.random() * types.length)];
    const baseSize = type === 'bubble' ? Math.random() * 4 + 2 : type === 'drop' ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5;
    return {
      x: Math.random() * canvas.width,
      y: type === 'bubble' ? canvas.height + 10 : Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: type === 'bubble' ? -(Math.random() * 1.5 + 0.5) : (Math.random() - 0.5) * 0.3,
      size: baseSize,
      opacity: Math.random() * 0.4 + 0.1,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      color: colors[Math.floor(Math.random() * colors.length)],
      type,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < 60; i++) {
      const p = createParticle(canvas);
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particlesRef.current.length < 80 && Math.random() > 0.92) {
        particlesRef.current.push(createParticle(canvas));
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.3;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.type === 'bubble') p.vy += -(0.02 - p.vy) * 0.01;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);

        if (p.type === 'bubble') {
          const gradient = ctx.createRadialGradient(p.x - p.size * 0.3, p.y - p.size * 0.3, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, 'rgba(110, 231, 183, 0.3)');
          gradient.addColorStop(0.7, p.color);
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.25, p.y - p.size * 0.25, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        } else if (p.type === 'drop') {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
        return p.life < p.maxLife && p.x > -50 && p.x < canvas.width + 50 && p.y > -50 && p.y < canvas.height + 50;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [createParticle]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ mixBlendMode: 'screen' }} />
  );
}
