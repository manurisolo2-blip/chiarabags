import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 560, damping: 40, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 560, damping: 40, mass: 0.35 });

  useEffect(() => {
    if (prefersReduced) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      const ok = mq.matches;
      setEnabled(ok);
      document.body.classList.toggle('custom-cursor-active', ok);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>('[data-cursor]');
      const nextLabel = cursorEl?.getAttribute('data-cursor') || null;
      setLabel(nextLabel);
    };

    const handleLeave = () => {
      setVisible(false);
      setLabel(null);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        layout
        animate={{
          scale: isPressed ? 0.9 : 1,
          paddingLeft: label ? 14 : 0,
          paddingRight: label ? 14 : 0,
          height: label ? 30 : 9,
          minWidth: label ? 72 : 9,
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.22 }}
        className="flex items-center justify-center rounded-full bg-[#121212] text-[#F6F4EF] shadow-sm"
      >
        {label ? (
          <span className="text-[10px] font-medium tracking-[0.14em] uppercase whitespace-nowrap leading-none">
            {label}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
