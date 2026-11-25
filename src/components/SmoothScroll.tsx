import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  paused?: boolean;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ paused = false }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (paused) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [paused]);

  return null;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -96 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
