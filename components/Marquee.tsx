"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const items = [
  "AI-Built Websites",
  "AI Voice Agents",
  "SMS Automation",
  "Google Reviews",
  "Lead Follow-Up",
  "48-Hour Launch",
  "Reputation Management",
  "24/7 Call Answering",
  "Done For You",
  "Conversion Focused",
];

// 4× duplication so ultrawide screens never see a gap
const all = [...items, ...items, ...items, ...items];

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// One item set is 25% of the 4× track; 25% per 32s matches the old CSS loop speed
const BASE_SPEED = 25 / 32;

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const reduced = usePrefersReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], {
    clamp: false,
  });
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;
    const vf = velocityFactor.get();
    // Scrolling down drives the ticker left (its resting direction); up reverses it
    if (vf < 0) direction.current = 1;
    else if (vf > 0) direction.current = -1;
    let moveBy = direction.current * BASE_SPEED * (delta / 1000);
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div ref={containerRef} className="bg-[#0F5132] overflow-hidden py-4 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0F5132] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0F5132] to-transparent z-10 pointer-events-none" />

      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-5">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80">
              {item}
            </span>
            <span className="text-[#C9A24B] text-base leading-none">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
