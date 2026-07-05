import Link from "next/link";
import { siteConfig } from "@/config/site";
import { KairoMark } from "@/components/KairoMark";
import { FooterWordmark } from "@/components/FooterWordmark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socials = [
  { href: "instagram", label: "Instagram" },
  { href: "facebook", label: "Facebook" },
  { href: "linkedin", label: "LinkedIn" },
] as const;

export function Footer() {
  return (
    <footer className="relative bg-[#0D0D0F] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <KairoMark className="w-6 h-8 text-white transition-transform duration-500 group-hover:rotate-[20deg]" />
              <span className="text-white font-bold text-lg tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-8">
              We help local businesses win more clients through AI-built websites,
              automated follow-up, and reputation systems that run without lifting a finger.
            </p>
            <div className="flex items-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={siteConfig.social[s.href]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[10px] font-semibold text-[#C9A24B] uppercase tracking-[0.25em] mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-semibold text-[#C9A24B] uppercase tracking-[0.25em] mb-2">
                Email
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[#C9A24B] uppercase tracking-[0.25em] mb-2">
                Phone
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="link-underline text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[#C9A24B] uppercase tracking-[0.25em] mb-2">
                Based In
              </div>
              <span className="text-sm text-white/50">{siteConfig.location}</span>
            </div>
          </div>
        </div>

        {/* Signature wordmark finale */}
        <FooterWordmark />

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            © {new Date().getFullYear()} {siteConfig.name} — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-[10px] uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
