"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";

const LETTERS = ["K", "A", "I", "R", "O"];

/**
 * The closing signature — a viewport-wide KAIRO wordmark that rises letter by
 * letter (the hero entrance, bookended), idles as a ghost, and lights gold
 * under the cursor. The whole mark is a link to /contact.
 */
export function FooterWordmark() {
  return (
    <Link
      href="/contact"
      className="group relative block mt-20"
      aria-label="Kairo — start a project"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-7 right-0 text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Start a project ↗
      </span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="flex justify-between leading-[0.85] select-none"
      >
        {LETTERS.map((letter, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
              className="block font-black tracking-[-0.04em] text-white/[0.07] transition-colors duration-300 group-hover:text-white/[0.14] hover:!text-[#C9A24B]"
              style={{ fontSize: "clamp(4rem, 15vw, 16rem)" }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Link>
  );
}
