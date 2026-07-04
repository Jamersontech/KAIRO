"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        className="h-full"
        style={{
          width: `${width}%`,
          background: "linear-gradient(90deg, #0F5132, #C9A24B, #0F5132)",
          transition: "width 60ms linear",
        }}
      />
    </div>
  );
}
