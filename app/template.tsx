"use client";

import { motion, MotionConfig } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
