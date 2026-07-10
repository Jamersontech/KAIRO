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
import {
  Globe, Phone, MessageSquare, Star, Send, Zap,
  ShieldCheck, Headphones, CheckCircle2, TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const items: { label: string; icon: LucideIcon }[] = [
  { label: "AI-Built Websites", icon: Globe },
  { label: "AI Voice Agents", icon: Phone },
  { label: "SMS Automation", icon: MessageSquare },
  { label: "Google Reviews", icon: Star },
  { label: "Lead Follow-Up", icon: Send },
  { label: "3–5 Day Launch", icon: Zap },
  { label: "Reputation Management", icon: ShieldCheck },
  { label: "24/7 Call Answering", icon: Headphones },
  { label: "Done For You", icon: CheckCircle2 },
  { label: "Conversion Focused", icon: TrendingUp },
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
  const pausedRef = useRef(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], {
    clamp: false,
  });
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView || pausedRef.current) return;
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
    <div
      ref={containerRef}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      className="group relative overflow-hidden py-4"
      style={{
        background: "linear-gradient(90deg, #0B3D26 0%, #12603B 50%, #0B3D26 100%)",
      }}
    >
      {/* Gold hairline frame */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/50 to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0B3D26] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0B3D26] to-transparent z-10 pointer-events-none" />

      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {all.map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={i} className="inline-flex items-center gap-2.5 px-5">
              <Icon size={13} className="text-[#C9A24B] flex-shrink-0" strokeWidth={2.25} />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80 transition-colors duration-300 group-hover:text-white/95">
                {item.label}
              </span>
              <span className="text-[#C9A24B]/70 text-sm leading-none ml-2.5">◆</span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
