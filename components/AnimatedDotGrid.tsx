"use client";
import { useEffect, useRef } from "react";

export function AnimatedDotGrid({
  className,
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = isDark ? "255,255,255" : "28,28,30";
    const spacing = 30;
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;
    const t0 = performance.now();
    const dpr = window.devicePixelRatio || 1;

    type Dot = { bx: number; by: number; phase: number; spd: number };
    let dots: Dot[] = [];

    const buildDots = (w: number, h: number) => {
      dots = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            bx: c * spacing,
            by: r * spacing,
            phase: (r * 13 + c * 7) % (Math.PI * 2),
            spd: 0.35 + ((r + c) % 5) * 0.12,
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      buildDots(w, h);
    };

    const draw = () => {
      const elapsed = performance.now() - t0;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        const pulse = (Math.sin(elapsed * d.spd * 0.0007 + d.phase) + 1) * 0.5;
        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.hypot(dx, dy);
        const hover = Math.max(0, 1 - dist / 100);

        const r = 0.8 + pulse * 0.9 + hover * 3.2;
        const baseA = isDark ? 0.06 : 0.065;
        const alpha = baseA + pulse * 0.05 + hover * 0.44;

        ctx.beginPath();
        ctx.arc(d.bx, d.by, Math.max(r, 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };

    const parent = canvas.parentElement!;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ""}`}
    />
  );
}
