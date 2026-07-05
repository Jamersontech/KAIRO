import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0F",
          borderRadius: 6,
        }}
      >
        <svg width="18" height="24" viewBox="0 0 100 130" fill="none">
          <circle cx="50" cy="7" r="6" fill="#C9A24B" />
          <line x1="50" y1="14" x2="50" y2="128" stroke="#C9A24B" strokeWidth="7" strokeLinecap="round" />
          <line x1="18" y1="32" x2="82" y2="84" stroke="#C9A24B" strokeWidth="7" strokeLinecap="round" />
          <line x1="82" y1="32" x2="18" y2="84" stroke="#C9A24B" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
