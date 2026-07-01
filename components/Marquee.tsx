"use client";

const items = [
  "AI-Built Websites",
  "SMS Automation",
  "Google Reviews",
  "Lead Follow-Up",
  "48-Hour Launch",
  "Reputation Management",
  "Done For You",
  "Conversion Focused",
];

// Duplicated for seamless infinite loop
const all = [...items, ...items];

export function Marquee() {
  return (
    <div className="bg-[#0F5132] overflow-hidden py-4 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0F5132] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0F5132] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex whitespace-nowrap">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-5">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80">
              {item}
            </span>
            <span className="text-[#C9A24B] text-base leading-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
