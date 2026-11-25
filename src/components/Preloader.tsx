import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChLogo } from './ChLogo';

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
    }, 850);

    return () => window.clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F6F4EF] pointer-events-none"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.div
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.6 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChLogo monogramOnly size="xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
