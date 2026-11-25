import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { GlassIconReveal } from '@/components/ui/liquid-glass-logo-reveal';

/**
 * Pure-vector high-contrast Didone monogram (`CH.`) with zero `<text>` nodes
 * so SVG-to-image SDF extraction never depends on external webfonts.
 */
const MARK_CH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 200" fill="currentColor">
  <path d="M 138 28 L 138 66 L 132 66 C 127 44, 112 33, 90 33 C 62 33, 49 60, 49 100 C 49 140, 62 167, 92 167 C 115 167, 130 155, 137 136 L 143 139 C 134 163, 116 176, 88 176 C 46 176, 20 144, 20 100 C 20 56, 46 24, 88 24 C 109 24, 125 26, 138 28 Z" />
  <path d="M 166 26 H 222 V 33 H 208 V 95 H 268 V 33 H 254 V 26 H 310 V 33 H 296 V 167 H 310 V 174 H 254 V 167 H 268 V 103 H 208 V 167 H 222 V 174 H 166 V 167 H 180 V 33 H 166 Z" />
  <circle cx="336" cy="160" r="14" />
</svg>`;

export function Preloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 2650);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F6F4EF] cursor-pointer select-none"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            pointerEvents: 'none',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <GlassIconReveal
            logo={MARK_CH}
            label="CH. Chiara Bags"
            look="light"
            background="#F6F4EF"
            logoColor="#121212"
            loop={false}
            tileSize={260}
            logoScale={0.72}
            finalScale={0.85}
            speed={1.35}
            tuning={{
              glide: 1.5,
              present: 1.7,
              startZoom: 2.25,
              sheen: 1,
            }}
            className="h-full w-full"
          />

          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 text-[11px] font-light tracking-[0.34em] uppercase text-[#5A5550]"
          >
            Chiara Bags
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
