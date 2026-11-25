import type { Transition } from 'framer-motion';

/**
 * Apple WWDC "Designing Fluid Interfaces" exponential-decay momentum projection.
 * Computes the projected displacement (px) from release velocity (px/s).
 */
export function project(
  initialVelocityPxPerSec: number,
  decelerationRate = 0.998,
): number {
  return (
    ((initialVelocityPxPerSec / 1000) * decelerationRate) /
    (1 - decelerationRate)
  );
}

/**
 * Apple progressive rubber-band boundary resistance.
 * Displacement grows asymptotically slower the further past a boundary the pointer travels.
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
): number {
  const denominator = dimension + constant * Math.abs(overshoot);
  if (denominator <= 0) return 0;
  return (overshoot * dimension * constant) / denominator;
}

/** Critically-damped default spring (damping ratio 1.0, zero overshoot). */
export const FLUID_SPRING_DEFAULT: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.38,
};

/** Snappier critically-damped spring for compact controls, sheets & overlays. */
export const FLUID_SPRING_SNAPPY: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.34,
};

/**
 * Momentum handoff spring config (slight underdamped settle ~0.18 for flick reversals).
 * Combine with `withReleaseVelocity` so springs inherit the pointer's release velocity.
 */
export const FLUID_SPRING_MOMENTUM: Transition = {
  type: 'spring',
  bounce: 0.18,
  duration: 0.36,
};

/** Attaches the pointer's release velocity (px/s) cleanly to a spring transition. */
export function withReleaseVelocity(
  velocity: number,
  base: Transition = FLUID_SPRING_MOMENTUM,
): Transition {
  return {
    ...base,
    velocity,
  };
}
