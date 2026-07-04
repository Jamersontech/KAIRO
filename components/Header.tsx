"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { KairoMark } from "@/components/KairoMark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const darkHeroRoutes = ["/"];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isDarkHero = darkHeroRoutes.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const transparentDark = isDarkHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#FAF9F6]/96 backdrop-blur-md shadow-sm border-b border-[#1C1C1E]/8"
            : isDarkHero
            ? "bg-transparent"
            : "bg-[#FAF9F6]/90 backdrop-blur-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-[60]">
              <KairoMark
                className={cn(
                  "w-6 h-8 transition-all duration-500 group-hover:rotate-[20deg] group-hover:scale-110",
                  transparentDark || isOpen ? "text-white" : "text-[#1C1C1E]"
                )}
              />
              <span
                className={cn(
                  "font-bold text-xl tracking-tight transition-colors duration-300",
                  transparentDark || isOpen ? "text-white" : "text-[#1C1C1E]"
                )}
              >
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? transparentDark ? "text-[#C9A24B]" : "text-[#0F5132]"
                      : transparentDark
                      ? "text-white/60 hover:text-white"
                      : "text-[#1C1C1E]/60 hover:text-[#1C1C1E]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                  transparentDark
                    ? "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                    : "bg-[#0F5132] text-white hover:bg-[#16733f] shadow-sm"
                )}
              >
                Free Website Audit
              </Link>
            </div>

            {/* Hamburger — stays above overlay */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden relative z-[60] p-2 rounded-lg transition-colors",
                isOpen
                  ? "text-white hover:bg-white/10"
                  : transparentDark
                  ? "text-white hover:bg-white/10"
                  : "text-[#1C1C1E] hover:bg-[#1C1C1E]/5"
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ──────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#0D0D0F] lg:hidden flex flex-col overflow-hidden"
          >
            {/* Ambient blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F5132]/15 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-[#C9A24B]/8 rounded-full blur-[110px] pointer-events-none" />

            {/* SVG noise */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" aria-hidden="true">
              <filter id="menu-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#menu-noise)" />
            </svg>

            {/* Faded watermark */}
            <div className="absolute inset-0 flex items-end justify-end overflow-hidden pointer-events-none pb-8 pr-2">
              <span
                className="font-black text-white leading-none tracking-[-0.04em] select-none"
                style={{ fontSize: "clamp(7rem, 50vw, 22rem)", opacity: 0.025 }}
              >
                KAIRO
              </span>
            </div>

            {/* Header-height spacer so content clears the fixed header */}
            <div className="h-16 flex-shrink-0" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + i * 0.065,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex items-center justify-between py-[0.9rem] border-b border-white/[0.07] transition-all duration-200",
                      pathname === link.href
                        ? "text-[#C9A24B]"
                        : "text-white/40 hover:text-white"
                    )}
                  >
                    <span className="text-[2rem] sm:text-[2.4rem] font-black tracking-tight leading-none">
                      {link.label}
                    </span>
                    {pathname === link.href && (
                      <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse flex-shrink-0" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pb-12 pt-6 space-y-3"
            >
              <Link
                href="/contact"
                className="block text-center px-6 py-4 rounded-2xl bg-[#0F5132] text-white font-bold text-base animate-glow"
              >
                Get a Free Website Audit
              </Link>
              <p className="text-center text-xs text-white/20 tracking-wide">
                Free · No commitment · Just clarity.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
