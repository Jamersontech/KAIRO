import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <svg width="90" height="117" viewBox="0 0 100 130" fill="none">
          <circle cx="50" cy="7" r="5" fill="#C9A24B" />
          <line x1="50" y1="14" x2="50" y2="128" stroke="#C9A24B" strokeWidth="5" strokeLinecap="round" />
          <line x1="18" y1="32" x2="82" y2="84" stroke="#C9A24B" strokeWidth="5" strokeLinecap="round" />
          <line x1="82" y1="32" x2="18" y2="84" stroke="#C9A24B" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
