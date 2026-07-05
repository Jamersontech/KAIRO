"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MAX_PULL = 6;

/**
 * Magnetic hover wrapper — the element drifts toward the cursor (capped at
 * ±6px) through a spring, and the inner content leads slightly for a
 * two-plane parallax. Inert on touch devices and under reduced motion.
 */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(my, { stiffness: 180, damping: 14, mass: 0.2 });
  const innerX = useTransform(x, (v) => v * 0.4);
  const innerY = useTransform(y, (v) => v * 0.4);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * strength)));
    my.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * strength)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  if (reduced || !enabled) {
    return <div className={`inline-block ${className ?? ""}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className ?? ""}`}
    >
      <motion.div style={{ x: innerX, y: innerY }} className="inline-block">
        {children}
      </motion.div>
    </motion.div>
  );
}
