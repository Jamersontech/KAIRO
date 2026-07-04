"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export function CalendlyButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (document.getElementById("calendly-css")) return;

    const link = document.createElement("link");
    link.id = "calendly-css";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.id = "calendly-js";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: siteConfig.calendarUrl });
    } else {
      window.open(siteConfig.calendarUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
