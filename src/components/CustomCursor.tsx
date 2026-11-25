import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hoverInteractive, setHoverInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);

  // Tight inner dot + smooth lerp-like outer ring
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 50, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 50, mass: 0.2 });
  const ringX = useSpring(mouseX, { stiffness: 185, damping: 24, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 185, damping: 24, mass: 0.45 });

  useEffect(() => {
    if (prefersReduced) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      setEligible(mq.matches);
      if (!mq.matches) {
        setVisible(false);
        document.body.classList.remove('custom-cursor-active');
      }
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (!eligible) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!visible) {
        setVisible(true);
      }
      if (!document.body.classList.contains('custom-cursor-active')) {
        document.body.classList.add('custom-cursor-active');
      }

      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>('[data-cursor]');
      const nextLabel = cursorEl?.getAttribute('data-cursor') || null;
      setLabel(nextLabel);

      const interactiveEl = target?.closest('button, a, input, [role="button"]');
      setHoverInteractive(Boolean(interactiveEl) && !nextLabel);
    };

    const handleLeave = () => {
      setVisible(false);
      setLabel(null);
      setHoverInteractive(false);
      document.body.classList.remove('custom-cursor-active');
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
      document.body.classList.remove('custom-cursor-active');
    };
  }, [eligible, mouseX, mouseY, visible]);

  if (!eligible || !visible) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[99999] pointer-events-none">
      {/* Outer 36px lerp ring (fades out when morphing into labeled pill) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-[1.5px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
        }}
        animate={{
          scale: label ? 0.55 : isPressed ? 0.84 : hoverInteractive ? 1.45 : 1,
          opacity: label ? 0 : 1,
          borderColor: hoverInteractive ? '#D90429' : 'rgba(18, 18, 18, 0.55)',
          backgroundColor: hoverInteractive ? 'rgba(217, 4, 41, 0.08)' : 'rgba(217, 4, 41, 0)',
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.24 }}
      />

      {/* Center 8px solid dot morphing into contextual solid pill */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full shadow-sm"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPressed ? 0.88 : !label && hoverInteractive ? 0.85 : 1,
          width: label ? 'auto' : 8,
          height: label ? 32 : 8,
          paddingLeft: label ? 14 : 0,
          paddingRight: label ? 14 : 0,
          backgroundColor: label ? '#121212' : '#D90429',
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.22 }}
      >
        {label ? (
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#F6F4EF] whitespace-nowrap leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D90429]" />
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
