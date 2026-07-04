"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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

// Pages whose hero is dark (need white nav text when transparent)
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

  const transparentDark = isDarkHero && !scrolled;

  return (
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
          <Link href="/" className="flex items-center gap-3 group">
            <KairoMark
              className={cn(
                "w-6 h-8 transition-colors duration-300",
                transparentDark ? "text-white" : "text-[#1C1C1E]"
              )}
            />
            <span
              className={cn(
                "font-bold text-xl tracking-tight transition-colors duration-300",
                transparentDark ? "text-white" : "text-[#1C1C1E]"
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
                    ? transparentDark
                      ? "text-[#C9A24B]"
                      : "text-[#0F5132]"
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              transparentDark
                ? "text-white hover:bg-white/10"
                : "text-[#1C1C1E] hover:bg-[#1C1C1E]/5"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-[#FAF9F6] border-t border-[#1C1C1E]/8 px-4 pb-6 pt-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "bg-[#0F5132]/10 text-[#0F5132]"
                    : "text-[#1C1C1E]/70 hover:bg-[#1C1C1E]/5 hover:text-[#1C1C1E]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[#1C1C1E]/8">
              <Link
                href="/contact"
                className="block text-center px-5 py-3 rounded-lg bg-[#0F5132] text-white text-sm font-semibold hover:bg-[#16733f] transition-colors"
              >
                Free Website Audit
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
