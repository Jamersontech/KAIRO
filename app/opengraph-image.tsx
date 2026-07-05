import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0D0D0F",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            backgroundImage: "linear-gradient(90deg, #C9A24B, #E8C87A)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          KAIRO
        </div>
        <div
          style={{
            display: "flex",
            width: 560,
            height: 2,
            background: "linear-gradient(90deg, #C9A24B, rgba(15,81,50,0.6), transparent)",
            margin: "36px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
