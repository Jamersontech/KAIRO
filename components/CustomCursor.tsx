"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Track the pointer 1:1 — no spring, so there's zero lag.
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(true);
      }
    };
    const onLeave = () => setHovering(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOut = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onOut);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x,
        y,
        // Center the X-crossing of the mark on the mouse point
        // X-cross is at y≈58 of 130 viewBox height (44.6%)
        translateX: "-50%",
        translateY: "-45%",
      }}
      animate={{
        opacity: visible ? (hovering ? 1 : 0.72) : 0,
        scale: clicking ? 0.65 : hovering ? 1.5 : 1,
        rotate: hovering ? 20 : 0,
      }}
      transition={{
        opacity: { duration: 0.15 },
        scale: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <svg
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="34"
        style={{
          filter: `drop-shadow(0 0 ${hovering ? 6 : 3}px rgba(201,162,75,0.7))`,
        }}
      >
        <circle cx="50" cy="7" r="4.5" fill="#C9A24B" />
        <line x1="50" y1="14" x2="50" y2="128" stroke="#C9A24B" strokeWidth="4" strokeLinecap="round" />
        <line x1="18" y1="32" x2="82" y2="84" stroke="#C9A24B" strokeWidth="4" strokeLinecap="round" />
        <line x1="82" y1="32" x2="18" y2="84" stroke="#C9A24B" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
