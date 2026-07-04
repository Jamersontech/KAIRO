export function KairoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dot */}
      <circle cx="50" cy="7" r="4.5" fill="currentColor" />
      {/* Vertical spine */}
      <line
        x1="50" y1="14"
        x2="50" y2="128"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Upper-left → lower-right diagonal */}
      <line
        x1="18" y1="32"
        x2="82" y2="84"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Upper-right → lower-left diagonal */}
      <line
        x1="82" y1="32"
        x2="18" y2="84"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
